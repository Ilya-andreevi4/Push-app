var CACHE_NAME = 'push-notification-app-cache';
var urlsToCache = [
  '/',
  '/styles/main.css',
  '/scripts/app.js',
  '/scripts/lib.js'
];

// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', function(event) {
  // event.waitUntil принимает промис для того, чтобы узнать,
  // сколько времени займёт установка, и успешно
  // или нет она завершилась.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});