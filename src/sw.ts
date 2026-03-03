/// <reference lib="webworker" />

import { clientsClaim } from 'workbox-core'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { ExpirationPlugin } from 'workbox-expiration'
import { precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL } from 'workbox-precaching'
import { RangeRequestsPlugin } from 'workbox-range-requests'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies'

type ManifestEntry = {
  url: string
  revision: string | null
}

type OfflineCacheStatus = {
  timestamp: string
  requestedVideos: string[]
  cachedVideos: string[]
  omittedVideos: string[]
  fullyOffline: boolean
}

declare let self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: Array<ManifestEntry | string>
}

const VIDEO_EXTENSION_PATTERN = /\.(mp4|webm|mov|m4v)(\?.*)?$/i
const STATUS_CACHE_NAME = 'sage-offline-meta-v1'
const STATUS_CACHE_KEY = '/offline-cache-status.json'
const VIDEO_CACHE_NAME = 'sage-video-cache-v1'
const IMAGE_CACHE_NAME = 'sage-image-cache-v1'
const AUDIO_CACHE_NAME = 'sage-audio-cache-v1'
const DOCUMENT_CACHE_NAME = 'sage-document-cache-v1'
const STATUS_MESSAGE_TYPE = 'OFFLINE_CACHE_STATUS'

const manifestEntries = (self.__WB_MANIFEST || []).map((entry) => {
  if (typeof entry === 'string') {
    return {
      url: entry,
      revision: null,
    }
  }
  return entry
})
const videoManifestEntries = manifestEntries.filter((entry) => VIDEO_EXTENSION_PATTERN.test(entry.url))
const nonVideoManifestEntries = manifestEntries.filter((entry) => !VIDEO_EXTENSION_PATTERN.test(entry.url))

precacheAndRoute(nonVideoManifestEntries)
cleanupOutdatedCaches()
self.skipWaiting()
clientsClaim()

const appShellHandler = createHandlerBoundToURL('index.html')
registerRoute(
  new NavigationRoute(appShellHandler, {
    denylist: [/^\/api\//, /^\/chatgpt/],
  })
)

registerRoute(
  ({ request }) => request.destination === 'document',
  new NetworkFirst({
    cacheName: DOCUMENT_CACHE_NAME,
    networkTimeoutSeconds: 8,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 40,
      }),
    ],
  })
)

registerRoute(
  ({ request }) => request.destination === 'image',
  new StaleWhileRevalidate({
    cacheName: IMAGE_CACHE_NAME,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 300,
      }),
    ],
  })
)

registerRoute(
  ({ request }) => request.destination === 'audio',
  new CacheFirst({
    cacheName: AUDIO_CACHE_NAME,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 40,
      }),
    ],
  })
)

registerRoute(
  ({ request }) => request.destination === 'video',
  new CacheFirst({
    cacheName: VIDEO_CACHE_NAME,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new RangeRequestsPlugin(),
      new ExpirationPlugin({
        maxEntries: 10,
      }),
    ],
  })
)

self.addEventListener('install', (event) => {
  event.waitUntil(cacheVideosWithQuotaFallback())
})

self.addEventListener('activate', (event) => {
  event.waitUntil(broadcastStoredStatus())
})

self.addEventListener('message', (event) => {
  const data = event.data as { type?: string } | undefined
  if (data?.type === 'GET_OFFLINE_CACHE_STATUS') {
    const source = event.source
    if (source && 'id' in source) {
      event.waitUntil(sendStatusToClient(source.id))
      return
    }
    event.waitUntil(broadcastStoredStatus())
  }
})

async function cacheVideosWithQuotaFallback(): Promise<void> {
  const requestedVideos = videoManifestEntries.map((entry) => toAbsoluteUrl(entry.url))
  const prioritizedVideos = await sortUrlsByApproxSizeDesc(requestedVideos)
  const videoCache = await caches.open(VIDEO_CACHE_NAME)
  const cachedVideos: string[] = []
  const omittedVideos: string[] = []

  for (const videoUrl of prioritizedVideos) {
    try {
      const response = await fetch(videoUrl, { cache: 'no-cache' })
      if (!response.ok) {
        omittedVideos.push(videoUrl)
        continue
      }

      try {
        await videoCache.put(videoUrl, response.clone())
        cachedVideos.push(videoUrl)
      } catch (error) {
        if (isQuotaError(error)) {
          // Graceful degradation: skip the largest remaining video and continue.
          omittedVideos.push(videoUrl)
          continue
        }
        omittedVideos.push(videoUrl)
      }
    } catch {
      omittedVideos.push(videoUrl)
    }
  }

  const status: OfflineCacheStatus = {
    timestamp: new Date().toISOString(),
    requestedVideos,
    cachedVideos,
    omittedVideos,
    fullyOffline: omittedVideos.length === 0,
  }

  await saveStatus(status)
  await broadcastStatus(status)
}

async function sortUrlsByApproxSizeDesc(urls: string[]): Promise<string[]> {
  const sizedUrls = await Promise.all(
    urls.map(async (url) => ({
      url,
      size: await getContentLength(url),
    }))
  )

  return sizedUrls.sort((a, b) => b.size - a.size).map((item) => item.url)
}

async function getContentLength(url: string): Promise<number> {
  try {
    const response = await fetch(url, { method: 'HEAD', cache: 'no-cache' })
    if (!response.ok) {
      return 0
    }

    const value = response.headers.get('content-length')
    return value ? Number(value) || 0 : 0
  } catch {
    return 0
  }
}

function isQuotaError(error: unknown): boolean {
  if (error instanceof DOMException) {
    return error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED'
  }

  return String(error).toLowerCase().includes('quota')
}

async function saveStatus(status: OfflineCacheStatus): Promise<void> {
  const statusCache = await caches.open(STATUS_CACHE_NAME)
  await statusCache.put(
    STATUS_CACHE_KEY,
    new Response(JSON.stringify(status), {
      headers: {
        'content-type': 'application/json',
      },
    })
  )
}

async function loadStatus(): Promise<OfflineCacheStatus | null> {
  const statusCache = await caches.open(STATUS_CACHE_NAME)
  const response = await statusCache.match(STATUS_CACHE_KEY)
  if (!response) {
    return null
  }

  return (await response.json()) as OfflineCacheStatus
}

async function broadcastStoredStatus(): Promise<void> {
  const status = await loadStatus()
  if (!status) {
    return
  }
  await broadcastStatus(status)
}

async function sendStatusToClient(clientId: string | undefined): Promise<void> {
  if (!clientId) {
    await broadcastStoredStatus()
    return
  }

  const status = await loadStatus()
  if (!status) {
    return
  }

  const client = await self.clients.get(clientId)
  client?.postMessage({
    type: STATUS_MESSAGE_TYPE,
    payload: status,
  })
}

async function broadcastStatus(status: OfflineCacheStatus): Promise<void> {
  const clients = await self.clients.matchAll({
    type: 'window',
    includeUncontrolled: true,
  })

  for (const client of clients) {
    client.postMessage({
      type: STATUS_MESSAGE_TYPE,
      payload: status,
    })
  }
}

function toAbsoluteUrl(url: string): string {
  return new URL(url, self.registration.scope).toString()
}

export {}
