import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://137.184.83.246',
        changeOrigin: true,
        secure: false, // Only disable SSL verification in development
        rewrite: (path) => path.replace(/^\/api/, '/api/v1')
      }
    }
  }
});
