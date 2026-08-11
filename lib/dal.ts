import 'server-only'
import { cache } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { decrypt } from './session'
import { prisma } from './prisma'

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  if (!session?.userId) {
    return null
  }

  return { userId: session.userId }
})

export async function requireUser(redirectTo: string) {
  const session = await verifySession()
  if (!session) {
    redirect(`/signin?redirectTo=${encodeURIComponent(redirectTo)}`)
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, name: true, email: true, createdAt: true },
  })

  if (!user) {
    redirect(`/signin?redirectTo=${encodeURIComponent(redirectTo)}`)
  }

  return user
}

export const getCurrentUser = cache(async () => {
  const session = await verifySession()
  if (!session) {
    return null
  }

  return prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, name: true, email: true, createdAt: true },
  })
})
