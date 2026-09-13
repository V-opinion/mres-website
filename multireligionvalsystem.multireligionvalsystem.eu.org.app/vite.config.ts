import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: 'https://www.multireligionvalsystem.eu.org/mres-website/', // Ensures JS, CSS, and asset paths include the subfolder
})
