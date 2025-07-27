import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // 2. Adicione o plugin VitePWA com as configurações
    VitePWA({
      registerType: 'autoUpdate', // Atualiza o PWA automaticamente quando há uma nova versão
      
      // Configurações do Web App Manifest
      manifest: {
        name: 'Pet Amigo',
        short_name: 'PetAmigo',
        description: 'Uma plataforma social para conectar amantes de animais de estimação.',
        theme_color: '#f4f4f4', // Cor da barra de título do app no tema claro
        background_color: '#f4f4f4', // Cor da tela de splash
        start_url: '/',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png', // Caminho para o ícone na pasta 'public'
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png', // Caminho para o ícone maior na pasta 'public'
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable' // Ícone que se adapta a diferentes formatos
          }
        ]
      },

      // Opcional: Configurações do Service Worker com Workbox
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg}'] // Define quais arquivos serão cacheados
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})


    