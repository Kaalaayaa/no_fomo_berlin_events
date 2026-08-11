import * as z from 'zod'

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { error: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.email({ error: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { error: 'Be at least 8 characters long.' })
    .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
    .regex(/[0-9]/, { error: 'Contain at least one number.' })
    .trim(),
})

export const LoginFormSchema = z.object({
  email: z.email({ error: 'Please enter a valid email.' }).trim(),
  password: z.string().min(1, { error: 'Password is required.' }).trim(),
})

export const ProfileFormSchema = z.object({
  name: z
    .string()
    .min(2, { error: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.email({ error: 'Please enter a valid email.' }).trim(),
})

export type SignupFormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
      values?: {
        name?: string
        email?: string
      }
      success?: boolean
    }
  | undefined

export type LoginFormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
      }
      message?: string
      values?: {
        email?: string
      }
    }
  | undefined

export type ProfileFormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
      }
      message?: string
      success?: boolean
    }
  | undefined
