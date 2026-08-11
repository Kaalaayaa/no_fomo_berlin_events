'use server'

import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'
import * as z from 'zod'
import { prisma } from '@/lib/prisma'
import { createSession, deleteSession } from '@/lib/session'
import {
  LoginFormSchema,
  LoginFormState,
  SignupFormSchema,
  SignupFormState,
} from '@/lib/definitions'

export async function signup(state: SignupFormState, formData: FormData) {
  const rawName = formData.get('name') as string
  const rawEmail = formData.get('email') as string
  const values = { name: rawName, email: rawEmail }

  const validatedFields = SignupFormSchema.safeParse({
    name: rawName,
    email: rawEmail,
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      values,
    }
  }

  const { name, email, password } = validatedFields.data

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    return { message: 'An account with this email already exists.', values }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  let userId: string
  try {
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    })
    userId = user.id
  } catch {
    return { message: 'An error occurred while creating your account.', values }
  }

  await createSession(userId)
  return { success: true }
}

export async function login(state: LoginFormState, formData: FormData) {
  const rawEmail = formData.get('email') as string
  const values = { email: rawEmail }

  const validatedFields = LoginFormSchema.safeParse({
    email: rawEmail,
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      values,
    }
  }

  const { email, password } = validatedFields.data

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return { message: 'Invalid email or password.', values }
  }

  const passwordsMatch = await bcrypt.compare(password, user.password)
  if (!passwordsMatch) {
    return { message: 'Invalid email or password.', values }
  }

  await createSession(user.id)

  const redirectTo = formData.get('redirectTo')
  redirect(typeof redirectTo === 'string' && redirectTo.startsWith('/') ? redirectTo : '/')
}

export async function logout() {
  await deleteSession()
  redirect('/')
}
