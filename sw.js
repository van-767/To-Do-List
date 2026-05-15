importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCIsK36ijlcZnPMRLleRP_gibZGkuCagDc",
  authDomain: "todo-list-4ab52.firebaseapp.com",
  projectId: "todo-list-4ab52",
  storageBucket: "todo-list-4ab52.firebasestorage.app",
  messagingSenderId: "1017204948498",
  appId: "1:1017204948498:web:1b3d7069afbc7724de22cb"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  const title = (payload.notification && payload.notification.title) || (payload.data && payload.data.title) || 'MyGoals';
  const body = (payload.notification && payload.notification.body) || (payload.data && payload.data.body) || '';
  return self.registration.showNotification(title, {
    body,
    icon: '/To-Do-List/icons/mygoals-icon.svg',
    badge: '/To-Do-List/icons/mygoals-icon.svg',
    vibrate: [200, 100, 200],
    tag: 'mygoals',
    renotify: true
  });
});

const CACHE_NAME = 'mygoals-v4';
const APP_SHELL = [
  './index.html',
  './manifest.webmanifest',
  './icons/mygoals-icon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  // Network-first: luôn lấy bản mới, fallback cache khi offline
  event.respondWith(
    fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      return response;
    }).catch(() => {
      return caches.match(event.request).then(cached => {
        if (cached) return cached;
        if (event.request.mode === 'navigate') return caches.match('/To-Do-List/index.html');
      });
    })
  );
});
