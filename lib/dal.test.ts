import { describe, it, expect, vi } from 'vitest'

// requireUser() calls cookies() and redirect() — real Next.js APIs that
// only work inside an actual request. We fake both so the function's
// logic can run in a plain test.
vi.mock('next/headers', () => ({
  cookies: vi.fn(async () => ({
    get: () => undefined, // simulates a visitor with no session cookie at all
  })),
}))

vi.mock('next/navigation', () => ({
  // The real redirect() throws internally to halt rendering — mimic that
  // so requireUser() stops right where it should, and we can assert on
  // exactly what URL it tried to send the visitor to.
  redirect: vi.fn((url: string) => {
    throw new Error(`REDIRECT:${url}`)
  }),
}))

import { requireUser } from './dal'

describe('requireUser', () => {
  it('redirects to /signin instead of returning a user when logged out', async () => {
    await expect(requireUser('/account')).rejects.toThrow(
      'REDIRECT:/signin?redirectTo=%2Faccount'
    )
  })
})
