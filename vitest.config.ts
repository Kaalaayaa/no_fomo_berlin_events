import path from 'path'
import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  resolve: {
    alias: {
      // Next.js's bundler special-cases this guard package; outside Next
      // (i.e. under Vitest) it just throws, so swap it for a no-op in tests.
      'server-only': path.resolve(__dirname, 'test/mocks/server-only.ts'),
    },
  },
  test: {
    env: {
      SESSION_SECRET: 'test-only-secret-do-not-use-in-prod',
    },
  },
})
