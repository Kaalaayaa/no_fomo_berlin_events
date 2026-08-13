import { describe, it, expect } from 'vitest'
import { SignJWT } from 'jose'
import { encrypt, decrypt } from './session'

describe('session encrypt/decrypt', () => {
  it('round-trips a userId through encrypt then decrypt', async () => {
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60)
    const token = await encrypt({ userId: 'user_123', expiresAt })

    const payload = await decrypt(token)

    expect(payload?.userId).toBe('user_123')
  })

  it('returns undefined for a garbage token instead of throwing', async () => {
    const payload = await decrypt('this-is-not-a-real-jwt')
    expect(payload).toBeUndefined()
  })

  it('returns undefined when no token is passed', async () => {
    const payload = await decrypt(undefined)
    expect(payload).toBeUndefined()
  })

  it('rejects a token that has already expired', async () => {
    // Built by hand with the same secret + library as lib/session.ts,
    // since encrypt() always signs a 7-day token — there's no way to ask
    // it for an already-expired one.
    const encodedKey = new TextEncoder().encode(process.env.SESSION_SECRET)
    const tenSecondsAgo = Math.floor(Date.now() / 1000) - 10

    const expiredToken = await new SignJWT({ userId: 'user_123' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(tenSecondsAgo)
      .sign(encodedKey)

    const payload = await decrypt(expiredToken)

    expect(payload).toBeUndefined()
  })
})
