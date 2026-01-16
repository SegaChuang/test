// Minimal placeholder Service Worker for development.
// NOTE: This is a lightweight placeholder to ensure the path /mockServiceWorker.js
// returns JavaScript and avoids MIME-type registration errors. To enable MSW's
// full mocking behavior, replace this file with the official generated
// mockServiceWorker.js by running:
//   npx msw init public/ --save

self.addEventListener('install', () => {
  // immediately activate
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

// Basic fetch handler - this placeholder does nothing and simply allows requests
// to proceed to the network. Replace with official MSW service worker to enable
// request interception.
self.addEventListener('fetch', () => {})
