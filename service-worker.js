const CACHE_NAME = 'memo-vmc-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './logo.png',
  './manifest.json',
  './sw-register.js'
];

// Installation du Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Mise en cache des ressources');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activation du Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Suppression de l\'ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interception des requêtes réseau
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - retourne la réponse du cache
        if (response) {
          return response;
        }
        
        // Clone de la requête
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(
          response => {
            // Vérification de la validité de la réponse
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone de la réponse
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
              
            return response;
          }
        ).catch(() => {
          // Si la requête échoue (pas de réseau), essayer de servir la page offline
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});
