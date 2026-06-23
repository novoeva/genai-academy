/**
 * Dev server for the Agentic AI learning app.
 * Serves the lessons folder and the prototype frontend.
 *
 * Usage: node serve.js
 * Then open: http://localhost:3000
 *
 * No npm install needed — uses Node.js built-ins only.
 */

const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT        = 3000;
const BASE_DIR    = __dirname;
const LESSONS_DIR = path.join(BASE_DIR, 'lessons');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.md':   'text/plain; charset=utf-8',
  '.css':  'text/css',
};

function send(res, status, contentType, body) {
  res.writeHead(status, {
    'Content-Type': contentType,
    'Access-Control-Allow-Origin': '*',
  });
  res.end(body);
}

function serveFile(res, filePath) {
  if (!fs.existsSync(filePath)) {
    return send(res, 404, 'application/json', JSON.stringify({ error: 'Not found', path: filePath }));
  }
  const ext  = path.extname(filePath);
  const mime = MIME[ext] || 'text/plain';
  send(res, 200, mime, fs.readFileSync(filePath));
}

http.createServer((req, res) => {
  const url = req.url.split('?')[0];

  // Root → serve the prototype HTML
  if (url === '/' || url === '/index.html') {
    return serveFile(res, path.join(BASE_DIR, 'prototype.html'));
  }

  // /api/chapters → list all chapter manifests
  if (url === '/api/chapters') {
    const dirs = fs.readdirSync(LESSONS_DIR)
      .filter(d => fs.statSync(path.join(LESSONS_DIR, d)).isDirectory())
      .sort();

    const chapters = dirs.map(dir => {
      const manifestPath = path.join(LESSONS_DIR, dir, 'manifest.json');
      if (!fs.existsSync(manifestPath)) return null;
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      return { folder: dir, ...manifest };
    }).filter(Boolean);

    return send(res, 200, 'application/json', JSON.stringify(chapters));
  }

  // /api/lessons/:chapter/:file → serve any file from a chapter folder
  const lessonMatch = url.match(/^\/api\/lessons\/([^/]+)\/(.+)$/);
  if (lessonMatch) {
    const [, chapter, file] = lessonMatch;
    const filePath = path.join(LESSONS_DIR, chapter, file);
    // Safety: ensure path stays within lessons dir
    if (!filePath.startsWith(LESSONS_DIR)) {
      return send(res, 403, 'application/json', JSON.stringify({ error: 'Forbidden' }));
    }
    return serveFile(res, filePath);
  }

  // Anything else in the base dir (prototype.html assets etc.)
  const staticPath = path.join(BASE_DIR, url);
  if (fs.existsSync(staticPath) && fs.statSync(staticPath).isFile()) {
    return serveFile(res, staticPath);
  }

  send(res, 404, 'application/json', JSON.stringify({ error: 'Not found' }));

}).listen(PORT, () => {
  console.log(`\n  Agentic AI app running at http://localhost:${PORT}\n`);
});
