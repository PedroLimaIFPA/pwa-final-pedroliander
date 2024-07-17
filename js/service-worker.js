const CACHE_NAME = 'sismorcego-cache-v1';
const urlsToCache = [
  '/',
  '/cadastro.html',
  '/configuracoes.html',
  '/desenvolvedores.html',
  '/index.html',
  '/inicial.html',
  '/pesquisar.html',
  '/recuperasenha.html',
  '/registro.html',
  '/styles/cadastro.css',
  '/styles/configuracoes.css',
  '/styles/desenvolvedores.css',
  '/styles/index.css',
  '/styles/inicial.css',
  '/styles/pesquisar.css',
  '/styles/recuperasenha.css',
  '/styles/registro.css',
  '/js/theme.js',
  '/js/registros.js',
  '/src/Logo_tema_claro144px.png',
  '/src/Logo_tema_escuro144px.png',
  '/src/Logo_tema_claro192px.png',
  '/src/Logo_tema_escuro192px.png',
  '/src/Logo_tema_claro512px.png',
  '/src/Logo_tema_escuro512px.png'
];


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
