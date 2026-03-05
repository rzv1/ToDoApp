const CACHE_NAME = 'perishable-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/controller.js',
    '/display.js',
    '/domain.js',
    '/repo.js',
    '/manifest.json'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});