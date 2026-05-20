import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyAdminToken } from '@/lib/admin-auth'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const authError = await verifyAdminToken(request)
    if (authError) return authError

    const { id } = await params

    const existing = await db.promotion.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Promotion not found' }, { status: 404 })
    }

    const body = await request.json()

    const updateData: Record<string, unknown> = {}
    const allowedFields = ['name', 'description', 'discount', 'type', 'active', 'startsAt', 'endsAt']

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        if (['startsAt', 'endsAt'].includes(field) && body[field] !== null) {
          updateData[field] = new Date(body[field])
        } else if (field === 'discount') {
          updateData[field] = parseInt(body[field], 10)
        } else {
          updateData[field] = body[field]
        }
      }
    }

    const promotion = await db.promotion.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({ promotion })
  } catch (error) {
    console.error('Admin promotion PUT error:', error)
    return NextResponse.json(
      { error: 'Failed to update promotion' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const authError = await verifyAdminToken(request)
    if (authError) return authError

    const { id } = await params

    const existing = await db.promotion.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Promotion not found' }, { status: 404 })
    }

    await db.promotion.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Admin promotion DELETE error:', error)
    return NextResponse.json(
      { error: 'Failed to delete promotion' },
      { status: 500 }
    )
  }
}
