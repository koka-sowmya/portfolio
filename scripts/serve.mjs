// Tiny static server with SPA fallback (any unknown path serves index.html) so direct URLs and refresh work.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve, normalize } from 'node:path';
const root = resolve(import.meta.dirname, '../dist');
const port = Number(process.env.PORT || 4173);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.pdf': 'application/pdf', '.webp': 'image/webp' };
createServer(async (req, res) => {
  const path = normalize(decodeURIComponent((req.url || '/').split('?')[0])).replace(/^(\.\.[/\\])+/, '');
  const tryFile = async (p) => { try { return [p, await readFile(resolve(root, '.' + p))]; } catch { return null; } };
  let hit = extname(path) ? await tryFile(path) : null;
  if (!hit && !extname(path)) hit = await tryFile('/index.html'); // SPA fallback
  if (!hit) { res.writeHead(404); res.end('Not found'); return; }
  res.writeHead(200, { 'Content-Type': types[extname(hit[0])] || 'application/octet-stream' });
  res.end(hit[1]);
}).listen(port, () => console.log(`Serving dist/ at http://localhost:${port}`));
