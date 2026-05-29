import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      '8c76-110-38-240-15.ngrok-free.app', // Jo error mein host mila hai
      '.ngrok-free.app' // Yeh add karne se saare ngrok URLs allow ho jayenge
    ]
  }
})