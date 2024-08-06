import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/personal-website-frontend',
  build: {
    outDir: 'build'  // Change this to 'build' if you want the output in a 'build' folder
  }
})
