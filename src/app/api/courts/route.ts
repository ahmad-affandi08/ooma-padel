import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const courts = await prisma.court.findMany({
      orderBy: { name: 'asc' }
    })
    return NextResponse.json(courts)
  } catch (error) {
    console.error('Error fetching courts:', error)
    return NextResponse.json(
      { error: 'Error fetching courts' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const newCourt = await prisma.court.create({
      data: {
        name: body.name,
        pricePerHour: Number(body.pricePerHour),
        isActive: body.isActive ?? true
      }
    })

    return NextResponse.json(newCourt, { status: 201 })
  } catch (error) {
    console.error('Error creating court:', error)
    return NextResponse.json(
      {
        error: 'Error creating court',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}
