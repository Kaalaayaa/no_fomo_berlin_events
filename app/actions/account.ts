'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import * as z from 'zod'
import { prisma } from '@/lib/prisma'
import { requireUser } from '@/lib/dal'
import { deleteSession } from '@/lib/session'
import { ProfileFormSchema, ProfileFormState } from '@/lib/definitions'

export async function updateProfile(
  state: ProfileFormState,
  formData: FormData
) {
  const currentUser = await requireUser('/account')

  const validatedFields = ProfileFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  })

  if (!validatedFields.success) {
    return { errors: z.flattenError(validatedFields.error).fieldErrors }
  }

  const { name, email } = validatedFields.data

  if (email !== currentUser.email) {
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return { message: 'That email is already in use by another account.' }
    }
  }

  await prisma.user.update({
    where: { id: currentUser.id },
    data: { name, email },
  })

  revalidatePath('/account')
  return { success: true }
}

export async function deleteAccount() {
  const currentUser = await requireUser('/account')

  await prisma.user.delete({ where: { id: currentUser.id } })
  await deleteSession()
  redirect('/')
}
