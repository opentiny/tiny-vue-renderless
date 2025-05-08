import { fileURLToPath } from 'node:url'
import { defineConfig, configDefaults } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, '**/__e2e__/**'],
    root: fileURLToPath(new URL('./', import.meta.url)),
  },
})
