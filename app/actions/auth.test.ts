import { describe, it, expect, vi, beforeEach } from 'vitest'

// Replace the real database client with a fake one we control per-test.
// Uses a relative path (not the "@/" alias) — vi.mock doesn't always
// reliably intercept alias-based imports resolved via the
// vite-tsconfig-paths plugin, even though both point at the same file.
vi.mock('../../lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}))

// Replace bcrypt so "does this password match" is something we decide
// directly, instead of depending on real hash comparison.
vi.mock('bcryptjs', () => ({
  default: {
    hash: vi.fn(),
    compare: vi.fn(),
  },
}))

import { prisma } from '../../lib/prisma'
import bcrypt from 'bcryptjs'
import { signup, login } from './auth'

// bcrypt.compare has an old-style callback overload, which makes plain
// vi.mocked(bcrypt.compare) infer the wrong (void-returning) signature.
// Casting to the Promise-based shape we actually use fixes that.
const mockedCompare = bcrypt.compare as unknown as (
  password: string,
  hash: string
) => Promise<boolean>

// Server actions take a FormData, same as a real <form> submission would.
function formData(fields: Record<string, string>) {
  const data = new FormData()
  for (const [key, value] of Object.entries(fields)) {
    data.set(key, value)
  }
  return data
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('signup', () => {
  it('rejects a duplicate email without creating a user', async () => {
    // Pretend the database already has a user with this email.
    vi.mocked(prisma.user.findUnique).mockResolvedValue({
      id: 'user_1',
      name: 'Existing Person',
      email: 'taken@example.com',
      password: 'hashed-password',
      createdAt: new Date(),
    })

    const result = await signup(
      undefined,
      formData({
        name: 'New Person',
        email: 'taken@example.com',
        password: 'password1',
      })
    )

    expect(result?.message).toBe('An account with this email already exists.')
    expect(prisma.user.create).not.toHaveBeenCalled()
  })
})

describe('login', () => {
  it('gives the identical message for "no such user" and "wrong password"', async () => {
    // Case 1: no user with this email at all.
    vi.mocked(prisma.user.findUnique).mockResolvedValueOnce(null)
    const noUserResult = await login(
      undefined,
      formData({ email: 'nobody@example.com', password: 'whatever1' })
    )

    // Case 2: the user exists, but the password is wrong.
    vi.mocked(prisma.user.findUnique).mockResolvedValueOnce({
      id: 'user_1',
      name: 'Real User',
      email: 'real@example.com',
      password: 'hashed-password',
      createdAt: new Date(),
    })
    vi.mocked(mockedCompare).mockResolvedValueOnce(false)
    const wrongPasswordResult = await login(
      undefined,
      formData({ email: 'real@example.com', password: 'wrongpassword1' })
    )

    // The whole point: an attacker gets no signal about which case they hit.
    expect(noUserResult?.message).toBe('Invalid email or password.')
    expect(wrongPasswordResult?.message).toBe(noUserResult?.message)
  })
})
