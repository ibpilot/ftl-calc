const CACHE_NAME = 'ftl-calc-v5'
const CACHED_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CACHED_ASSETS))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  // Remove stale caches from previous versions
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
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => cachedResponse || fetch(event.request))
      .catch(() => caches.match('./index.html'))
  )
})
