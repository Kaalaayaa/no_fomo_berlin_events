import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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

    return NextResponse.json(events)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}