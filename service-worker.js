var CACHE = 'network-or-cache'
// from https://serviceworke.rs/strategy-network-or-cache_service-worker_doc.html
self.addEventListener('install', function (evt) {
  console.log('The service worker is being installed.')
  evt.waitUntil(preCache())
})

self.addEventListener('fetch', function (evt) {
  console.log('The service worker is serving the asset.')
  evt.respondWith(fromNetwork(evt.request, 1500).catch(function () {
    return console.error(`Event ${evt.srcElement} had error or no response in 1500ms`)
  }))
})

function preCache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll([
      './index.html'
    ])
  })
}

function fromNetwork(request, timeout) {
  return new Promise(function (fulfill, reject) {
    var timeoutId = setTimeout(reject, timeout)
    fetch(request).then(function (response) {
      clearTimeout(timeoutId)
      fulfill(response)
    }, reject)
  })
}