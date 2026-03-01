// ============================================================
// GESTLOG AC - Service Worker
// ============================================================
const CACHE_NAME = 'gestlog-ac-v3';
const CACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png'
];

// Instalar: guardar recursos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Cacheando recursos');
      return cache.addAll(CACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activar: limpiar cachés antiguas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch: estrategia Network First para API, Cache First para assets
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Las llamadas a Google Apps Script siempre van a la red (datos en tiempo real)
  if (url.hostname.includes('script.google.com')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        // Si no hay red, devolver respuesta de error amigable
        return new Response(JSON.stringify({
          ok: false,
          error: 'Sin conexión. Por favor, conecta a internet para usar la aplicación.'
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      })
    );
    return;
  }

  // Ignorar peticiones que no sean http/https
  if (!event.request.url.startsWith('http')) return;

  // Para assets locales: Cache First
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(response => {
        // Solo cachear respuestas válidas de http/https
        if (!response || response.status !== 200 || !event.request.url.startsWith('http')) {
          return response;
        }
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    }).catch(() => {
      return caches.match('./index.html');
    })
  );
});

// Sincronización en background cuando vuelve la conexión
self.addEventListener('sync', event => {
  if (event.tag === 'sync-pending') {
    console.log('[SW] Sincronizando datos pendientes...');
  }
});
