import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    // Yeh line saare ngrok tunnels aur external hosts ko allow kar degi
    allowedHosts: true
  }
})