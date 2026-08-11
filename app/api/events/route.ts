import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/dal'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const audience = searchParams.get('audience')
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')

    const events = await prisma.event.findMany({
      where: {
        status: 'approved',
        ...(category && { category }),
        ...(audience && { audience }),
        ...(dateFrom && {
          date: {
            gte: new Date(dateFrom),
            ...(dateTo && { lte: new Date(dateTo) }),
          },
        }),
      },
      orderBy: { date: 'asc' },
    })

    const session = await verifySession()
    if (!session) {
      return NextResponse.json(events)
    }

    const saved = await prisma.savedEvent.findMany({
      where: { userId: session.userId, eventId: { in: events.map((e) => e.id) } },
      select: { eventId: true },
    })
    const savedIds = new Set(saved.map((s) => s.eventId))

    return NextResponse.json(
      events.map((event) => ({ ...event, savedByMe: savedIds.has(event.id) }))
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}