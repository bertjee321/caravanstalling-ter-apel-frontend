import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow access from your local network
    port: 5173,      // Optional: Specify the port
  },
  base: '/caravanstalling-ter-apel-frontend/', // Optional: Specify the base path
})
