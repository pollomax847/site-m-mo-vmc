const CACHE_NAME = 'memo-vmc-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './verification-debit.js',
  './logo.png',
  './logo-192.png',
  './logo-512.png',
  './manifest.json',
  './sw-register.js'
];

// Variables pour le suivi de la progression
let totalAssets = ASSETS.length;
let loadedAssets = 0;

// Installation du Service Worker avec suivi de la progression
self.addEventListener('install', event => {
  self.skipWaiting(); // Assure que le nouveau SW prend le contrôle immédiatement
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // Pour chaque ressource, nous effectuons un fetch et un cache.put
        const cachePromises = ASSETS.map(url => {
          return fetch(url)
            .then(response => {
              if (!response.ok) {
                throw new Error(`Failed to fetch ${url}`);
              }
              
              // Mettre en cache la ressource
              const cacheResponse = cache.put(url, response.clone());
              
              // Mettre à jour la progression
              loadedAssets++;
              const progress = Math.round((loadedAssets / totalAssets) * 100);
              
              // Envoyer une notification de progression aux clients
              self.clients.matchAll().then(clients => {
                clients.forEach(client => {
                  client.postMessage({
                    type: 'DOWNLOAD_PROGRESS',
                    progress: progress
                  });
                });
              });
              
              return cacheResponse;
            })
            .catch(error => {
              console.error(`Cache error for ${url}: ${error.message}`);
            });
        });
        
        return Promise.all(cachePromises);
      })
      .then(() => {
        console.log('Mise en cache terminée');
        // Notification de fin de téléchargement
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({
              type: 'DOWNLOAD_COMPLETE'
            });
          });
        });
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
    }).then(() => {
      console.log('Service worker activé');
      return self.clients.claim(); // Prendre le contrôle de toutes les pages
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

// Événement message pour communiquer avec les pages
self.addEventListener('message', event => {
  if (event.data && event.data.action === 'GET_INSTALLATION_STATUS') {
    // Répond avec l'état d'installation actuel
    event.source.postMessage({
      type: 'INSTALLATION_STATUS',
      isInstalled: true,
      progress: Math.round((loadedAssets / totalAssets) * 100)
    });
  }
});
