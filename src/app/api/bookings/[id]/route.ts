import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params
    const id = params.id
    const body = await request.json()

    // Jika update waktu, perlu cek bentrok lagi
    // ... (Simplified: assume valid for now or implementation later if needed urgency)
    // Sebaiknya kita implementasi cek bentrok exclude current ID, tapi untuk MVP kita update data non-waktu dulu atau percayakan admin.

    // Namun, jika user mengubah startTime/courtId, kita WAJIB cek bentrok.
    // Mari kita implementasi proper check jika ada perubahan waktu.

    let updateData: any = {
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      notes: body.notes,
      status: body.status
    }

    if (body.courtId && body.date && body.startTime && body.duration) {
      const courtId = body.courtId
      const date = new Date(body.date)
      const startTime = Number(body.startTime)
      const duration = Number(body.duration)
      const endTime = startTime + duration

      // Cek collision exclude self
      const conflict = await prisma.booking.findFirst({
        where: {
          courtId,
          date,
          id: { not: id }, // Exclude self
          status: { not: 'CANCELLED' },
          AND: [
            { startTime: { lt: endTime } },
            { endTime: { gt: startTime } }
          ]
        }
      })

      if (conflict) {
        return NextResponse.json(
          { error: 'Jadwal bentrok dengan booking lain!' },
          { status: 409 }
        )
      }

      updateData.courtId = courtId
      updateData.date = date
      updateData.startTime = startTime
      updateData.endTime = endTime
    }

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json(updatedBooking)
  } catch (error) {
    console.error('Error updating booking:', error)
    return NextResponse.json(
      {
        error: 'Error updating booking',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params
    const id = params.id

    // Hard delete or Soft delete? Usually Soft delete (Status: CANCELLED) is better for records.
    // But user might want to clear chaos. Let's do DELETE for now as requested by typical simple CRUD.

    await prisma.booking.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting booking:', error)
    return NextResponse.json(
      { error: 'Error deleting booking' },
      { status: 500 }
    )
  }
}
