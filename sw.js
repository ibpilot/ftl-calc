const CACHE_NAME = 'ftl-calc-v13'
const STATIC_ASSETS = [
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
]

// On install: cache static assets and skip waiting immediately
// so the new SW takes over without waiting for tabs to close
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  )
  self.skipWaiting()
})

// On activate: delete all old caches, then claim all clients immediately
// After claiming, post a message to all tabs so they reload to get fresh HTML
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        )
      )
      .then(() => self.clients.claim())
      .then(() => {
        // Notify all open tabs that a new version is active — they will reload
        return self.clients.matchAll({ type: 'window' }).then((clients) => {
          clients.forEach((client) => client.postMessage({ type: 'SW_UPDATED' }))
        })
      })
  )
})

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)
  const isHTMLRequest = event.request.destination === 'document'
    || url.pathname.endsWith('.html')
    || url.pathname.endsWith('/')

  if (isHTMLRequest) {
    // Network first for HTML — always fetch fresh, update cache, fall back offline
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          const responseToCache = networkResponse.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache))
          return networkResponse
        })
        .catch(() => caches.match(event.request))
    )
  } else {
    // Cache first for static assets
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => cachedResponse || fetch(event.request))
        .catch(() => caches.match('./index.html'))
    )
  }
})
