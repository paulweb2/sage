from collections import defaultdict, deque
from math import hypot
from pathlib import Path

from PIL import Image, ImageDraw


GREEN = "#22842e"
YELLOW = "#facc00"
RED = "#c91616"
WHITE = "#fbfaf9"

BASE_SIZE = 1024
OUT_DIR = Path(__file__).resolve().parent
GUIDE_PATH = OUT_DIR.parent.parent / "ZDT updated logo.png"

SOURCE_ICON_BOUNDS = (222, 135, 801, 689)
SOURCE_BAND_GREEN_BOTTOM = 158
SOURCE_BAND_RED_TOP = 379

STANDARD_RECT = {"x": 128, "y": 96, "size": 768, "radius": 182}
MASKABLE_RECT = {"x": 64, "y": 64, "size": 896, "radius": 212}


def component_bbox(points):
    xs = [x for x, _ in points]
    ys = [y for _, y in points]
    return min(xs), min(ys), max(xs), max(ys)


def find_white_components(image, bounds):
    x0, y0, x1, y1 = bounds
    width = x1 - x0 + 1
    height = y1 - y0 + 1
    pixels = image.load()

    white = [[False] * width for _ in range(height)]
    for y in range(height):
        for x in range(width):
            r, g, b = pixels[x0 + x, y0 + y]
            white[y][x] = r > 245 and g > 245 and b > 245

    visited = [[False] * width for _ in range(height)]
    components = []
    for y in range(height):
        for x in range(width):
            if not white[y][x] or visited[y][x]:
                continue
            queue = deque([(x, y)])
            visited[y][x] = True
            points = []
            while queue:
                cx, cy = queue.popleft()
                points.append((cx, cy))
                for nx, ny in ((cx + 1, cy), (cx - 1, cy), (cx, cy + 1), (cx, cy - 1)):
                    if 0 <= nx < width and 0 <= ny < height and white[ny][nx] and not visited[ny][nx]:
                        visited[ny][nx] = True
                        queue.append((nx, ny))
            components.append(points)
    return components, width, height


def pick_head_and_body(components):
    head = None
    body = None
    for points in sorted(components, key=len, reverse=True):
        area = len(points)
        if body is None and 30000 < area < 80000:
            body = points
        if head is None and 5000 < area < 10000:
            head = points
    if head is None or body is None:
        raise RuntimeError("Could not isolate head/body from guide image")
    return head, body


def trace_loop(body_points):
    body = set(body_points)
    edges = []
    for x, y in body:
        if (x, y - 1) not in body:
            edges.append(((x, y), (x + 1, y)))
        if (x + 1, y) not in body:
            edges.append(((x + 1, y), (x + 1, y + 1)))
        if (x, y + 1) not in body:
            edges.append(((x + 1, y + 1), (x, y + 1)))
        if (x - 1, y) not in body:
            edges.append(((x, y + 1), (x, y)))

    next_edges = defaultdict(list)
    for start, end in edges:
        next_edges[start].append(end)

    direction_order = {(1, 0): 0, (0, 1): 1, (-1, 0): 2, (0, -1): 3}
    used = set()
    loops = []

    for edge in edges:
        if edge in used:
            continue
        loop = [edge[0], edge[1]]
        used.add(edge)
        while loop[-1] != loop[0]:
            current = loop[-1]
            previous = loop[-2]
            vx = current[0] - previous[0]
            vy = current[1] - previous[1]
            current_dir = direction_order[(vx, vy)]
            candidates = [end for end in next_edges[current] if (current, end) not in used]
            if not candidates:
                break
            chosen = None
            best_turn = None
            for end in candidates:
                dx = end[0] - current[0]
                dy = end[1] - current[1]
                turn = (direction_order[(dx, dy)] - current_dir) % 4
                if chosen is None or turn < best_turn:
                    chosen = end
                    best_turn = turn
            used.add((current, chosen))
            loop.append(chosen)
            if len(loop) > 25000:
                break
        loops.append(loop)

    closed_loops = [loop[:-1] for loop in loops if len(loop) > 3 and loop[0] == loop[-1]]
    if not closed_loops:
        raise RuntimeError("Could not trace silhouette outline")
    return max(closed_loops, key=len)


def perpendicular_distance(point, start, end):
    x0, y0 = point
    x1, y1 = start
    x2, y2 = end
    dx = x2 - x1
    dy = y2 - y1
    if dx == 0 and dy == 0:
        return hypot(x0 - x1, y0 - y1)
    return abs(dy * x0 - dx * y0 + x2 * y1 - y2 * x1) / hypot(dx, dy)


def rdp(points, epsilon):
    if len(points) < 3:
        return points
    start = points[0]
    end = points[-1]
    best_index = None
    best_distance = -1
    for index, point in enumerate(points[1:-1], start=1):
        distance = perpendicular_distance(point, start, end)
        if distance > best_distance:
            best_distance = distance
            best_index = index
    if best_distance > epsilon:
        left = rdp(points[: best_index + 1], epsilon)
        right = rdp(points[best_index:], epsilon)
        return left[:-1] + right
    return [start, end]


def chaikin(points, iterations=2):
    output = points[:]
    for _ in range(iterations):
        refined = []
        for index, point in enumerate(output):
            nxt = output[(index + 1) % len(output)]
            refined.append((0.75 * point[0] + 0.25 * nxt[0], 0.75 * point[1] + 0.25 * nxt[1]))
            refined.append((0.25 * point[0] + 0.75 * nxt[0], 0.25 * point[1] + 0.75 * nxt[1]))
        output = refined
    return output


def transform(local_x, local_y, rect, source_width, source_height):
    scale_x = rect["size"] / source_width
    scale_y = rect["size"] / source_height
    return rect["x"] + (local_x * scale_x), rect["y"] + (local_y * scale_y)


def extract_geometry():
    image = Image.open(GUIDE_PATH).convert("RGB")
    components, source_width, source_height = find_white_components(image, SOURCE_ICON_BOUNDS)
    head, body = pick_head_and_body(components)

    body_loop = trace_loop(body)
    top_index = min(range(len(body_loop)), key=lambda idx: (body_loop[idx][1], body_loop[idx][0]))
    ordered_loop = body_loop[top_index:] + body_loop[:top_index] + [body_loop[top_index]]
    simplified = rdp(ordered_loop, 4.5)[:-1]
    smoothed = chaikin(simplified, iterations=3)

    hx0, hy0, hx1, hy1 = component_bbox(head)
    head_center = ((hx0 + hx1) / 2, (hy0 + hy1) / 2)
    head_radius = (((hx1 - hx0 + 1) + (hy1 - hy0 + 1)) / 4)

    return {
        "source_width": source_width,
        "source_height": source_height,
        "head_center": head_center,
        "head_radius": head_radius,
        "body_points": smoothed,
    }


def icon_geometry(source_geometry, rect):
    source_width = source_geometry["source_width"]
    source_height = source_geometry["source_height"]
    head_center = transform(*source_geometry["head_center"], rect, source_width, source_height)
    head_radius = ((rect["size"] / source_width) + (rect["size"] / source_height)) * source_geometry["head_radius"] / 2
    body_points = [
        transform(x, y, rect, source_width, source_height)
        for x, y in source_geometry["body_points"]
    ]
    green_bottom = transform(0, SOURCE_BAND_GREEN_BOTTOM, rect, source_width, source_height)[1]
    red_top = transform(0, SOURCE_BAND_RED_TOP, rect, source_width, source_height)[1]
    return {
        "rect": rect,
        "head_center": head_center,
        "head_radius": head_radius,
        "body_points": body_points,
        "green_bottom": green_bottom,
        "red_top": red_top,
    }


def render_icon(geometry, anti_alias=6):
    canvas_size = BASE_SIZE * anti_alias
    scale = anti_alias
    rect = geometry["rect"]

    def s(value):
        return value * scale

    image = Image.new("RGBA", (canvas_size, canvas_size), (255, 255, 255, 0))
    mask = Image.new("L", (canvas_size, canvas_size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle(
        (
            s(rect["x"]),
            s(rect["y"]),
            s(rect["x"] + rect["size"]),
            s(rect["y"] + rect["size"]),
        ),
        radius=s(rect["radius"]),
        fill=255,
    )

    art = Image.new("RGBA", (canvas_size, canvas_size), WHITE)
    art_draw = ImageDraw.Draw(art)
    art_draw.rectangle((0, 0, canvas_size, s(geometry["green_bottom"])), fill=GREEN)
    art_draw.rectangle((0, s(geometry["green_bottom"]), canvas_size, s(geometry["red_top"])), fill=YELLOW)
    art_draw.rectangle((0, s(geometry["red_top"]), canvas_size, canvas_size), fill=RED)

    cx, cy = geometry["head_center"]
    radius = geometry["head_radius"]
    art_draw.ellipse(
        (s(cx - radius), s(cy - radius), s(cx + radius), s(cy + radius)),
        fill=WHITE,
    )
    art_draw.polygon([(s(x), s(y)) for x, y in geometry["body_points"]], fill=WHITE)

    image.paste(art, (0, 0), mask)
    return image.resize((BASE_SIZE, BASE_SIZE), Image.Resampling.LANCZOS)


def write_master_svg(geometry):
    rect = geometry["rect"]
    cx, cy = geometry["head_center"]
    radius = geometry["head_radius"]
    body_path = " ".join(
        [f"M {geometry['body_points'][0][0]:.1f} {geometry['body_points'][0][1]:.1f}"]
        + [f"L {x:.1f} {y:.1f}" for x, y in geometry["body_points"][1:]]
        + ["Z"]
    )
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" role="img" aria-labelledby="title desc">
  <title id="title">Zimbabwe Disability Toolkit app icon draft</title>
  <desc id="desc">Rounded square icon with green, yellow, and red stripes plus a traced white accessibility silhouette.</desc>

  <defs>
    <clipPath id="icon-shape">
      <rect x="{rect['x']}" y="{rect['y']}" width="{rect['size']}" height="{rect['size']}" rx="{rect['radius']}" ry="{rect['radius']}" />
    </clipPath>
  </defs>

  <g clip-path="url(#icon-shape)">
    <rect x="{rect['x']}" y="{rect['y']}" width="{rect['size']}" height="{rect['size']}" fill="{GREEN}" />
    <rect x="{rect['x']}" y="{geometry['green_bottom']:.1f}" width="{rect['size']}" height="{geometry['red_top'] - geometry['green_bottom']:.1f}" fill="{YELLOW}" />
    <rect x="{rect['x']}" y="{geometry['red_top']:.1f}" width="{rect['size']}" height="{rect['y'] + rect['size'] - geometry['red_top']:.1f}" fill="{RED}" />
  </g>

  <g fill="{WHITE}">
    <circle cx="{cx:.1f}" cy="{cy:.1f}" r="{radius:.1f}" />
    <path d="{body_path}" />
  </g>
</svg>
"""
    (OUT_DIR / "master.svg").write_text(svg, encoding="utf-8")


def export_png(image, filename, size):
    image.resize((size, size), Image.Resampling.LANCZOS).save(OUT_DIR / filename)


def main():
    source_geometry = extract_geometry()
    standard_geometry = icon_geometry(source_geometry, STANDARD_RECT)
    maskable_geometry = icon_geometry(source_geometry, MASKABLE_RECT)

    standard = render_icon(standard_geometry)
    maskable = render_icon(maskable_geometry)

    write_master_svg(standard_geometry)

    standard.save(OUT_DIR / "preview-1024.png")
    maskable.save(OUT_DIR / "maskable-preview-1024.png")

    export_png(standard, "pwa-192x192.png", 192)
    export_png(standard, "pwa-512x512.png", 512)
    export_png(maskable, "maskable-512x512.png", 512)
    export_png(standard, "apple-touch-icon.png", 180)
    export_png(standard, "favicon.png", 64)

    standard.save(
        OUT_DIR / "favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48), (64, 64)],
    )


if __name__ == "__main__":
    main()
