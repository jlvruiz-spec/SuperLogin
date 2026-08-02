import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('react-big-calendar') || id.includes('moment')) {
            return 'calendar';
          }
          if (id.includes('react')) {
            return 'vendor';
          }
        }
      }
    }
  } 
})
