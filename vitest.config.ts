import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  resolve: {
    alias: {
      // Next.js's bundler special-cases this guard package; outside Next
      // (i.e. under Vitest) it just throws, so swap it for a no-op in tests.
      // (fileURLToPath instead of __dirname — this file may load as native
      // ESM in a future Vite version, where __dirname doesn't exist.)
      'server-only': fileURLToPath(new URL('./test/mocks/server-only.ts', import.meta.url)),
    },
  },
  test: {
    env: {
      SESSION_SECRET: 'test-only-secret-do-not-use-in-prod',
    },
  },
})
