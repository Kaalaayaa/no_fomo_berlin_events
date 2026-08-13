import { describe, it, expect } from 'vitest'
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
})
