import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const event = await prisma.event.create({
      data: {
        title: body.title,
        tagline: body.tagline,
        description: body.description,
        lineup: body.lineup || null,
        date: new Date(body.date),
        venue: body.venue,
        address: body.address || null,
        category: body.category,
        audience: body.audience,
        tags: body.tags || [],
        priceMin: body.priceMin ?? null,
        priceMax: body.priceMax ?? null,
        pricingModel: body.pricingModel || null,
        capacity: body.capacity ?? null,
        ticketUrl: body.ticketUrl || null,
        status: 'pending',
      },
    })

    return NextResponse.json({ success: true, id: event.id })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to submit event' }, { status: 500 })
  }
}