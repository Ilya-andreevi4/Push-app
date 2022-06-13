const staticCacheName = "static-pnapp-cache-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/favicon.svg",
  "/logo192.png",
  "/logo512.png",
  "/static/css/main.f1be1968.css",
  "/static/css/main.f1be1968.css.map",
  "/static/js/main.7cbc11a0.js",
  "/static/js/main.7cbc11a0.js.map",
  "/static/js/main.7cbc11a0.js.LICENSE.txt",
  "/static/js/main.8fc9dd89.js",
  "/static/js/main.8fc9dd89.js.map",
  "/static/js/main.8fc9dd89.js.LICENSE.txt",
  "/static/js/main.10ca731e.js",
  "/static/js/main.10ca731e.js.map",
  "/static/js/main.10ca731e.js.LICENSE.txt",
  "/src/index.tsx",
  "/src/index.css",
  "/src/routes/Routes.tsx",
  "/src/routes/Form.tsx",
  "/src/routes/Main/Main.tsx",
  "/src/routes/Main/Loader.tsx",
  "/src/routes/Main/",
];

// // eslint-disable-next-line no-restricted-globals
// self.addEventListener("install", async (event) => {
//   const cache = await caches.open(staticCacheName);
//   await cache.addAll(urlsToCache);
// });

// // eslint-disable-next-line no-restricted-globals
// self.addEventListener("activate", async (event) => {
//   const cacheNames = await caches.keys();
//   await Promise.all(
//     cacheNames
//       .filter((name) => name !== staticCacheName)
//       .map((name) => caches.delete(name))
//   );
// });

// async function cacheFirst(request) {
//   const cached = await caches.match(request);
//   return cached ?? (await fetch(request));
// }

// // eslint-disable-next-line no-restricted-globals
// self.addEventListener("fetch", (event) => {
//   const { request } = event;
//   event.respondWith(cacheFirst(request));
// });
// // eslint-disable-next-line no-restricted-globals
// self?.addEventListener?.("push", (event) => {
//   // console.log("push", event);
//   const payload = event.data.json();
//   const {
//     notification,
//     collapse_key,
//     data,
//     fcmMessageId,
//     from,
//     priority
//   } = payload;
  
//   // console.log("payload", payload);
//   // console.log("notification", notification);
// // eslint-disable-next-line no-restricted-globals
//   var promise = self.registration.showNotification(notification.title, {
//     body: notification.body,
//     icon: notification.icon || notification.image || 'https://test.stroygrad66.ru/favicon.svg',
//     tag: notification.tag,
//     data: data
//   })

//   event.waitUntil(promise)
// });
