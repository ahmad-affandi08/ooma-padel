import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // Next.js 15: params is a Promise
) {
  try {
    // Await params first (Next.js 15 requirement)
    const { id } = await params

    const body = await req.json()
    const { status } = body

    if (!status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 })
    }

    const updatedItem = await prisma.orderItem.update({
      where: { id },
      data: { status }
    })

    return NextResponse.json(updatedItem)
  } catch (error) {
    console.error('KDS Update Error:', error)
    return NextResponse.json({ error: 'Failed to update item status' }, { status: 500 })
  }
}
