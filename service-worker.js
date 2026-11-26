// Kill switch: installed copies of Bible Scout pick this up on their next visit, delete every cache, unregister, and
// reload onto the retirement page. Keep this file served until hosting is turned off.
self.addEventListener('install', function () {
  self.skipWaiting()
})

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (cacheNames) {
        return Promise.all(cacheNames.map(function (cacheName) { return caches.delete(cacheName) }))
      })
      .then(function () { return self.registration.unregister() })
      .then(function () { return self.clients.matchAll({ type: 'window' }) })
      .then(function (clients) {
        clients.forEach(function (client) { client.navigate(client.url) })
      })
  )
})
