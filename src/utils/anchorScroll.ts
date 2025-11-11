const STORAGE_KEY = 'sage-pending-anchor';
const DEFAULT_HEADER_OFFSET = 72;

interface PendingAnchorPayload {
  anchor: string;
  path?: string;
  storedAt: number;
}

export interface AnchorScrollOptions {
  behavior?: ScrollBehavior;
  offset?: number;
  maxAttempts?: number;
  attemptDelay?: number;
  preferCardHeader?: boolean;
}

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const computeHeaderOffset = (): number => {
  if (typeof document === 'undefined') {
    return DEFAULT_HEADER_OFFSET;
  }

  const activePage = document.querySelector('ion-router-outlet#main-content .ion-page:not(.ion-page-hidden)') ?? document.body;
  const headers = Array.from(activePage.querySelectorAll('ion-header')) as HTMLElement[];

  if (!headers.length) {
    return DEFAULT_HEADER_OFFSET;
  }

  const total = headers.reduce((sum, header) => sum + header.getBoundingClientRect().height, 0);
  return Math.max(Math.round(total) + 8, DEFAULT_HEADER_OFFSET);
};

const escapeSelector = (value: string): string => {
  if (typeof CSS !== 'undefined' && typeof CSS.escape === 'function') {
    return CSS.escape(value);
  }
  return value.replace(/[^a-zA-Z0-9_-]/g, (char) => `\\${char}`);
};

const resolveAnchorElement = (anchor: string, preferCardHeader: boolean): HTMLElement | null => {
  if (typeof document === 'undefined') {
    return null;
  }

  const activePage = document.querySelector('ion-router-outlet#main-content .ion-page:not(.ion-page-hidden)') as HTMLElement | null;
  const selector = `#${escapeSelector(anchor)}`;
  const host =
    (activePage?.querySelector(selector) as HTMLElement | null) ??
    (document.querySelector(selector) as HTMLElement | null);

  if (!host) {
    return null;
  }

  if (!preferCardHeader) {
    return host;
  }

  const cardHeader = host.querySelector('ion-card-header') as HTMLElement | null;
  return cardHeader ?? host;
};

const scrollWithinContent = async (
  target: HTMLElement,
  behavior: ScrollBehavior,
  offset: number
) => {
  const ionContent = target.closest('ion-content') as HTMLElement & {
    getScrollElement?: () => Promise<HTMLElement>;
    scrollToPoint?: (x: number, y: number, duration?: number) => Promise<void>;
  } | null;

  if (ionContent && typeof ionContent.getScrollElement === 'function') {
    try {
      const scrollEl = await ionContent.getScrollElement();
      const scrollRect = scrollEl.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      const delta = targetRect.top - scrollRect.top;
      const desiredTopRaw = scrollEl.scrollTop + delta - offset;
      const desiredTop = desiredTopRaw > 0 ? desiredTopRaw : 0;

      console.log('[AnchorScroll] Scrolling within ion-content', {
        anchor: target.id,
        delta,
        desiredTop,
        currentScrollTop: scrollEl.scrollTop
      });

      if (typeof ionContent.scrollToPoint === 'function') {
        const duration = behavior === 'smooth' ? 300 : 0;
        await ionContent.scrollToPoint(0, desiredTop, duration);
        return;
      }

      scrollEl.scrollTo({
        top: desiredTop,
        behavior
      });
      return;
    } catch (error) {
      console.log('[AnchorScroll] Error using ion-content scroll helpers, falling back', error);
    }
  }

  target.scrollIntoView({ behavior, block: 'start' });
};

export const scrollAnchorIntoView = async (
  anchor: string,
  options: AnchorScrollOptions = {}
): Promise<boolean> => {
  if (typeof window === 'undefined' || !anchor) {
    console.log('[AnchorScroll] Cannot scroll (no window or anchor)', { anchor });
    return false;
  }

  const {
    behavior = 'smooth',
    offset,
    maxAttempts = 50,
    attemptDelay = 80,
    preferCardHeader = true
  } = options;

  const effectiveOffset = offset ?? computeHeaderOffset();

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const target = resolveAnchorElement(anchor, preferCardHeader);
    if (target) {
      console.log('[AnchorScroll] Found target', { anchor, attempt, offset: effectiveOffset });
      await scrollWithinContent(target, behavior, effectiveOffset);
      return true;
    }

    await wait(attemptDelay);
  }

  console.log('[AnchorScroll] Failed to find target within attempts', { anchor, maxAttempts });
  return false;
};

export const storePendingAnchor = (anchor: string, path?: string): void => {
  if (typeof window === 'undefined' || !anchor) {
    return;
  }

  const payload: PendingAnchorPayload = {
    anchor,
    path,
    storedAt: Date.now()
  };

  try {
    console.debug('[AnchorScroll] Storing pending anchor', payload);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore write failures (e.g. storage restrictions)
  }
};

export const clearPendingAnchor = (): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    console.log('[AnchorScroll] Failed to clear pending anchor');
    // Ignore removal failures
  }
};

export const consumePendingAnchor = async (
  path?: string,
  options: AnchorScrollOptions = {}
): Promise<boolean> => {
  if (typeof window === 'undefined') {
    return false;
  }

  let payload: PendingAnchorPayload | null = null;
  console.log('[AnchorScroll] consumePendingAnchor invoked', { path });

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      console.log('[AnchorScroll] No stored anchor');
      return false;
    }
    payload = JSON.parse(raw) as PendingAnchorPayload | null;
  } catch {
    console.log('[AnchorScroll] Error parsing stored anchor, clearing');
    clearPendingAnchor();
    return false;
  }

  if (!payload?.anchor) {
    console.log('[AnchorScroll] Stored payload missing anchor, clearing');
    clearPendingAnchor();
    return false;
  }

  if (path && payload.path && payload.path !== path) {
    console.log('[AnchorScroll] Stored anchor for different path; skipping', { payloadPath: payload.path, currentPath: path });
    return false;
  }

  console.log('[AnchorScroll] Consuming pending anchor', payload);
  clearPendingAnchor();
  return scrollAnchorIntoView(payload.anchor, options);
};


