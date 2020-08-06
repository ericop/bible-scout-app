var staticCacheName = 'bible-scout-cache-update-and-refresh-v0.9.8'
// from https://serviceworke.rs/strategy-cache-update-and-refresh_service-worker_doc.html
//   and https://github.com/jakearchibald/wittr/blob/task-clean-db/public/js/sw/index.js 
self.addEventListener('install', function (event) {
  console.log('The service worker is being installed.')
  event.waitUntil(preCache())
})

// https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage/delete
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          return cacheName != staticCacheName
        }).map(function (cacheName) {
          return caches.delete(cacheName)
        })
      )
    })
  )
})

self.addEventListener('fetch', function (event) {
  console.log('The service worker is serving the asset.')

  var requestUrl = new URL(event.request.url)
  // if (requestUrl.origin === location.origin) {
  //   if (requestUrl.pathname === '/') {
  //     event.respondWith(caches.match('/skeleton'))
  //     return
  //   }
  // }

  event.respondWith(fromCache(event.request))

  event.waitUntil(
    updateFromNetwork(event.request)
      .then(refresh)
  )
})

self.addEventListener('message', function(event) {
  console.log('service worker event', event)
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting()
  }

  // TODO: allow this to trigger from Settings Page
  if (event.data.action === 'clearAllCache') {
    console.log('service worker action: clearAllCache', event)
    event.waitUntil(
      caches.keys().then(function (cacheNames) {
        console.log('caches.keys() cacheNames', cacheNames)
        return Promise.all(
          cacheNames.map(function (cacheName) {
            console.log('cacheNames.map cacheName', cacheName)
            return caches.delete(cacheName).then(function () {
              // Note the '173 MB used out of 586057 MB storage quota.' in Chrome  Dev Tools some times lags, 
              //  so check the Cache Storage itself to see that items are gone.
              console.log(`Cache with name '${cacheName}' is deleted`);
            });
          })
        )
      })
    )
  }
})

// Utility functions 
function preCache() {
  return caches.open(staticCacheName).then(function (cache) {
    return cache.addAll([
      './index.html',
      'media/bible-scout-192x192.png',
      'third-party/materialize.min.css',
      'app-styles.css',
      'third-party/mithril2.min.js',
      'third-party/materialize.min.js',
      '/third-party/material-icons.woff2',
      'media/bible-open-to-john.jpg'
    ])
  })
}

function fromCache(request) {
  return caches.open(staticCacheName).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || fetch(request)
    })
  })
}

function updateFromNetwork(request) {
  return caches.open(staticCacheName).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response.clone()).then(function () {
        return response
      })
    })
  })
}

function refresh(response) {
  return self.clients.matchAll().then(function (clients) {
    clients.forEach(function (client) {
      var message = {
        type: 'refresh',
        url: response.url,
        eTag: response.headers.get('ETag')
      }
      client.postMessage(JSON.stringify(message))
    })
  })

}