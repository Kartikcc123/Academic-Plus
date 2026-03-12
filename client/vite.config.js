import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['app-icon.svg', 'app-icon-maskable.svg'],
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },
      manifest: {
        name: 'Academic Plus',
        short_name: 'Academic Plus',
        description: 'Professional coaching and healthcare career guidance platform with student and admin portals.',
        theme_color: '#102033',
        background_color: '#fcfaf5',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait-primary',
        categories: ['education', 'productivity'],
        icons: [
          {
            src: '/app-icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: '/app-icon-maskable.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
});
