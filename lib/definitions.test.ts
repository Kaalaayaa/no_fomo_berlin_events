import { describe, it, expect } from 'vitest'
import { SignupFormSchema, LoginFormSchema } from './definitions'

describe('SignupFormSchema', () => {
  it('accepts a valid signup', () => {
    const result = SignupFormSchema.safeParse({
      name: 'Kalaya',
      email: 'kalaya@example.com',
      password: 'password1',
    })
    expect(result.success).toBe(true)
  })

  it('rejects a name shorter than 2 characters', () => {
    const result = SignupFormSchema.safeParse({
      name: 'K',
      email: 'kalaya@example.com',
      password: 'password1',
    })
    expect(result.success).toBe(false)
  })

  it('rejects a malformed email', () => {
    const result = SignupFormSchema.safeParse({
      name: 'Kalaya',
      email: 'not-an-email',
      password: 'password1',
    })
    expect(result.success).toBe(false)
  })

  it('rejects a password shorter than 8 characters', () => {
    const result = SignupFormSchema.safeParse({
      name: 'Kalaya',
      email: 'kalaya@example.com',
      password: 'ab1',
    })
    expect(result.success).toBe(false)
  })

  it('rejects a password with no letters', () => {
    const result = SignupFormSchema.safeParse({
      name: 'Kalaya',
      email: 'kalaya@example.com',
      password: '12345678',
    })
    expect(result.success).toBe(false)
  })

  it('rejects a password with no numbers', () => {
    const result = SignupFormSchema.safeParse({
      name: 'Kalaya',
      email: 'kalaya@example.com',
      password: 'abcdefgh',
    })
    expect(result.success).toBe(false)
  })
})

describe('LoginFormSchema', () => {
  it('accepts a valid login', () => {
    const result = LoginFormSchema.safeParse({
      email: 'kalaya@example.com',
      password: 'anything',
    })
    expect(result.success).toBe(true)
  })

  it('rejects an empty password', () => {
    const result = LoginFormSchema.safeParse({
      email: 'kalaya@example.com',
      password: '',
    })
    expect(result.success).toBe(false)
  })
})
