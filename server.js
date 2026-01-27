const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Ajouter des en-têtes CORS pour permettre les requêtes cross-origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  // Gérer les requêtes OPTIONS pour CORS
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Construire le chemin de fichier
  let filePath = path.resolve('.' + req.url);
  let rootPath = path.resolve('.');
  
  // Vérifier que le chemin est dans le répertoire racine pour éviter le path traversal
  if (!filePath.startsWith(rootPath)) {
    res.writeHead(403, { 'Content-Type': 'text/html' });
    res.end('<h1>403 Forbidden</h1><p>Access denied.</p>');
    return;
  }
  
  if (filePath === rootPath) {
    filePath = path.join(rootPath, 'index.html');
  }

  // Obtenir l'extension du fichier
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  // Lire le fichier
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1><p>The requested file was not found.</p>');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end(`<h1>500 Server Error</h1><p>${error.code}</p>`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
