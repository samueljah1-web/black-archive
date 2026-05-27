import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

const LIBRARY_PATH = '/home/samuel-jah/Documents/Library';
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'library-files',
      configureServer(server) {
        server.middlewares.use('/library/', (req, res, next) => {
          const filename = decodeURIComponent(req.url.slice(1)); // skip leading /
          const filepath = path.join(LIBRARY_PATH, filename);
          if (fs.existsSync(filepath) && fs.statSync(filepath).isFile()) {
            const ext = path.extname(filepath).toLowerCase();
            const mime = { '.pdf': 'application/pdf' }[ext] || 'application/octet-stream';
            res.setHeader('Content-Type', mime);
            res.setHeader('Cache-Control', 'public, max-age=86400');
            fs.createReadStream(filepath).pipe(res);
          } else {
            next();
          }
        });
      }
    }
  ],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
  },
})
