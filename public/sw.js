// Service Worker for Ilmhub Landing Page
// Version 1.0.0

const CACHE_NAME = 'ilmhub-v1';
const STATIC_CACHE_NAME = 'ilmhub-static-v1';
const DYNAMIC_CACHE_NAME = 'ilmhub-dynamic-v1';

// Static assets to cache
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/robots.txt',
  // Add your static assets here
];

// API endpoints to cache
const API_CACHE_PATTERNS = [
  /https:\/\/api\.crm\.ilmhub\.uz\/api\/locations/,
  /https:\/\/api\.crm\.ilmhub\.uz\/api\/courses/,
  /https:\/\/api\.crm\.ilmhub\.uz\/api\/courses\/types/,
];

// Cache-first strategy for static assets
const CACHE_FIRST_PATTERNS = [
  /\.(js|css|woff2?|png|jpg|jpeg|gif|svg|ico)$/,
  /https:\/\/fonts\.googleapis\.com/,
  /https:\/\/fonts\.gstatic\.com/,
];

// Network-first strategy for dynamic content
const NETWORK_FIRST_PATTERNS = [
  /https:\/\/api\.crm\.ilmhub\.uz\/api\/leads/,
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const { url, method } = request;

  // Only handle GET requests
  if (method !== 'GET') return;

  // Handle different caching strategies
  if (CACHE_FIRST_PATTERNS.some(pattern => pattern.test(url))) {
    // Cache-first strategy for static assets
    event.respondWith(cacheFirst(request));
  } else if (API_CACHE_PATTERNS.some(pattern => pattern.test(url))) {
    // Network-first with cache fallback for API data
    event.respondWith(networkFirstWithCache(request));
  } else if (NETWORK_FIRST_PATTERNS.some(pattern => pattern.test(url))) {
    // Network-first strategy for dynamic content
    event.respondWith(networkFirst(request));
  } else {
    // Default: network-first with cache fallback
    event.respondWith(networkFirstWithCache(request));
  }
});

// Cache-first strategy
async function cacheFirst(request) {
  const cache = await caches.open(STATIC_CACHE_NAME);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Return offline page or fallback
    return new Response('Offline content not available', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Network-first strategy
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    return response;
  } catch (error) {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const cached = await cache.match(request);
    return cached || new Response('Network error', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Network-first with cache fallback
async function networkFirstWithCache(request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      // Cache successful responses
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Fallback to cache
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    
    // Return offline response
    return new Response('Offline - content not available', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync-form') {
    event.waitUntil(syncForms());
  }
});

// Sync forms when connection is restored
async function syncForms() {
  // Implementation for syncing offline form submissions
  console.log('Syncing offline forms...');
}

// Push notifications (future enhancement)
self.addEventListener('push', (event) => {
  if (event.data) {
    const options = {
      body: event.data.text(),
      icon: '/icon-192x192.png',
      badge: '/badge-72x72.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    
    event.waitUntil(
      self.registration.showNotification('Ilmhub', options)
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://ilmhub.uz')
  );
}); 