import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyAdminToken } from '@/lib/admin-auth'

export async function GET(request: NextRequest) {
  try {
    const authError = await verifyAdminToken(request)
    if (authError) return authError

    const promotions = await db.promotion.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ promotions })
  } catch (error) {
    console.error('Admin promotions GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch promotions' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const authError = await verifyAdminToken(request)
    if (authError) return authError

    const body = await request.json()
    const { name, discount, type } = body

    // Validate required fields
    if (!name || discount === undefined || !type) {
      return NextResponse.json(
        { error: 'Missing required fields: name, discount, type' },
        { status: 400 }
      )
    }

    const promotion = await db.promotion.create({
      data: {
        name,
        discount: parseInt(discount, 10),
        type,
        description: body.description || '',
        active: body.active !== undefined ? body.active : true,
        startsAt: body.startsAt ? new Date(body.startsAt) : new Date(),
        endsAt: body.endsAt ? new Date(body.endsAt) : null,
      },
    })

    return NextResponse.json({ promotion }, { status: 201 })
  } catch (error) {
    console.error('Admin promotions POST error:', error)
    return NextResponse.json(
      { error: 'Failed to create promotion' },
      { status: 500 }
    )
  }
}
