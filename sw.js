// sw.js - Service Worker HARINFOOD POS Lite (Optimal for Automatic Updates & Offline)
// GANTI versi cache SETIAP kali ada update file!
const CACHE_VERSION = 'v80'; // Ganti setiap update!
const CACHE_NAME = `harinfood-cache-${CACHE_VERSION}`;
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css?v=80',
  '/script.js?v=80',
  '/manifest.json?v=80',
  // Tambahkan semua gambar/audio/icon di bawah ini ok
  '/risol.webp',
  '/cibay.webp',
  '/toppoki.webp',
  '/spaghetti.webp',
  '/spaghetti1.webp',
  '/sbalungan.webp',
  '/balungan.webp',
  '/esteh.webp',
  '/esteh1.webp',
  '/kopi.webp',
  '/2000.webp',
  '/estawar.webp',
  '/qris.webp',
  '/click.mp3',
  '/beep.mp3',
  '/ding.mp3',
  '/aaa.mp3'
];

// Install: cache semua aset penting
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// Activate: hapus semua cache versi lama
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Fetch: index.html selalu fresh dari network. Asset lain pakai cache-first.
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // Untuk index.html atau navigasi, selalu ambil dari network (agar update langsung terlihat)
  if (
    request.mode === 'navigate' ||
    url.pathname === '/' ||
    url.pathname.endsWith('index.html')
  ) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Optional, simpan ke cache untuk offline
          caches.open(CACHE_NAME).then(cache => cache.put(request, response.clone()));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Untuk asset lain (CSS, JS, gambar, audio), cache-first
  event.respondWith(
    caches.match(request).then(cachedResponse => {
      if (cachedResponse) return cachedResponse;
      return fetch(request).then(networkResponse => {
        // Simpan ke cache jika asset penting
        if (ASSETS_TO_CACHE.some(asset => url.pathname.endsWith(asset.replace('/', '')))) {
          caches.open(CACHE_NAME).then(cache => cache.put(request, networkResponse.clone()));
        }
        return networkResponse;
      }).catch(() => caches.match(request));
    })
  );
});
