import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-rangeforge',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/RangeForge-Project' || req.url === '/RangeForge-Project/') {
            req.url = '/RangeForge-Project/index.html';
          }
          if (req.url === '/login' || req.url === '/login/') {
            res.writeHead(302, { Location: '/RangeForge-Project/' });
            res.end();
            return;
          }
          next();
        });
      }
    }
  ],
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '/ws': {
        target: 'ws://localhost:3001',
        ws: true
      }
    }
  }
})
