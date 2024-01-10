import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import 'dotenv/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  define: {
    'process.env.VITE_SITE_KEY': JSON.stringify(process.env.VITE_SITE_KEY)
  }
})
