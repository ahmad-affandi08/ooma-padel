import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get('date') // Optional filter by date

  try {
    const whereClause = date ? {
      date: new Date(date)
    } : {}

    const bookings = await prisma.booking.findMany({
      where: whereClause,
      include: {
        court: true
      },
      orderBy: {
        startTime: 'asc'
      }
    })
    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: 'Error fetching bookings' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validasi Input
    const courtId = body.courtId
    const date = new Date(body.date)
    const startTime = Number(body.startTime)
    const duration = Number(body.duration) // Durasi dalam jam
    const endTime = startTime + duration

    if (endTime > 24) {
      return NextResponse.json(
        { error: 'Waktu booking melebihi batas hari (24:00)' },
        { status: 400 }
      )
    }

    // Cek Bentrok (Collision Detection)
    const existingBookings = await prisma.booking.findMany({
      where: {
        courtId: courtId,
        date: date,
        status: { not: 'CANCELLED' }, // Abaikan yang cancel
        OR: [
          // Logic intersection: (StartA < EndB) and (EndA > StartB)
          {
            AND: [
              { startTime: { lt: endTime } },
              { endTime: { gt: startTime } }
            ]
          }
        ]
      }
    })

    if (existingBookings.length > 0) {
      return NextResponse.json(
        {
          error: 'Jadwal bentrok!',
          details: `Sudah ada booking pada jam ${existingBookings[0].startTime}:00 - ${existingBookings[0].endTime}:00`
        },
        { status: 409 } // Conflict
      )
    }

    // Create Booking
    const newBooking = await prisma.booking.create({
      data: {
        courtId,
        date,
        startTime,
        endTime,
        customerName: body.customerName,
        customerPhone: body.customerPhone,
        notes: body.notes,
        status: 'CONFIRMED'
      }
    })

    return NextResponse.json(newBooking, { status: 201 })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      {
        error: 'Error creating booking',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}
