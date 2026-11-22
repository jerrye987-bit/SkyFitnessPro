import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname } from "node:path";

const root = ".output/public";
const port = 3000;
const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".json": "application/json",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  let filePath = decodeURIComponent(url.pathname);
  if (filePath.endsWith("/")) filePath += "index.html";
  try {
    const s = await stat(join(root, filePath));
    const target = s.isDirectory()
      ? join(root, filePath, "index.html")
      : join(root, filePath);
    const data = await readFile(target);
    res.writeHead(200, {
      "Content-Type": types[extname(target)] ?? "application/octet-stream",
    });
    res.end(data);
  } catch {
    // вот он, правильный SPA-фолбэк
    const data = await readFile(join(root, "200.html"));
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  }
}).listen(port, () => console.log(`http://localhost:${port}`));
