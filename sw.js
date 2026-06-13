const CACHE_NAME = 'ftl-calc-v9'
const STATIC_ASSETS = [
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  // Remove all stale caches from previous versions
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)
  const isHTMLRequest = event.request.destination === 'document'
    || url.pathname.endsWith('.html')
    || url.pathname.endsWith('/')

  if (isHTMLRequest) {
    // Network first for HTML — always fetch fresh, fall back to cache if offline
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          // Update the cache with the fresh version
          const responseToCache = networkResponse.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache))
          return networkResponse
        })
        .catch(() => caches.match(event.request))
    )
  } else {
    // Cache first for static assets (icons, manifest) — they rarely change
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => cachedResponse || fetch(event.request))
        .catch(() => caches.match('./index.html'))
    )
  }
})
