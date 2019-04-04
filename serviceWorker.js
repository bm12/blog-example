const CACHE_NAME = 'v3.1.34';

self.addEventListener('install', function onInstall(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll([
      '/static/media/Lato-Bold.44dfe8cc.ttf',
      '/static/media/Lato-Light.5b761f2d.ttf',
      '/static/media/Lato-Regular.7f690e50.ttf',
    ])),
  );

  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function onActivate(event) {
  self.clients.claim();

  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map((cacheName) => {
        if (cacheName !== CACHE_NAME) {
          console.log('Deleting out of date cache:', cacheName);
          return caches.delete(cacheName);
        }
      }),
    )),
  );
});

self.addEventListener('fetch', function onFetch(event) {
  const { request } = event;

  if (request.method !== 'GET' || request.url.indexOf('chrome-extension://') !== -1) return;

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // if (response) console.log('Response from cache: ', event.request);
        // else console.log('not cached: ', event.request);

        if (response) {
          fetchAndCacheResource(request.clone());
          return response;
        }

        return fetch(event.request)
          .then((fetchResponse) => {
            const fetchResponseClone = fetchResponse.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, fetchResponseClone);
              });

            return fetchResponse;
          });
      }),
  );
});


self.addEventListener('message', async function onMessage(event) {
  const { data } = event;
  if (data.type === 'prefetch') {
    event.waitUntil(
      data.urls.map(url => fetchAndCacheResource(new Request(url)))
    );
  }
});

async function fetchAndCacheResource(request) {
  const response = await fetch(request);

  const cache = await caches.open(CACHE_NAME);

  cache.put(request, response);
}