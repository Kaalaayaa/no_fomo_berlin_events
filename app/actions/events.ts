'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/dal'

export async function toggleSaveEvent(eventId: string) {
  const session = await verifySession()
  if (!session) {
    return { error: 'not-authenticated' as const }
  }

  const existing = await prisma.savedEvent.findUnique({
    where: { userId_eventId: { userId: session.userId, eventId } },
  })

  if (existing) {
    await prisma.savedEvent.delete({ where: { id: existing.id } })
  } else {
    await prisma.savedEvent.create({
      data: { userId: session.userId, eventId },
    })
  }

  revalidatePath('/')
  revalidatePath('/my-events')
  revalidatePath('/account')
  revalidatePath(`/events/${eventId}`)

  return { saved: !existing }
}
