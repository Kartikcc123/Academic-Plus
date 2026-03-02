import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Automatically updates the app on students' phones when you deploy a new version
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
  name: 'Academic Plus Institute',
  short_name: 'Academic Plus',
  description: 'Your Gateway to a Medical Career. Exclusive portal for notes and lectures.',
  theme_color: '#1a365d', // The deep navy blue from the poster
  background_color: '#ffffff',
  display: 'standalone',
  // ... keep your icons array exactly as it was
}
    })
  ],
  server: {
    port: 3000,
    // This proxy prevents CORS errors during development
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
});