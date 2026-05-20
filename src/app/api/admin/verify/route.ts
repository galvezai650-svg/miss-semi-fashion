import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ valid: false }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]

    const session = await db.adminSession.findUnique({
      where: { token },
    })

    if (!session) {
      return NextResponse.json({ valid: false })
    }

    if (new Date() > session.expiresAt) {
      // Clean up expired session
      await db.adminSession.delete({ where: { id: session.id } })
      return NextResponse.json({ valid: false })
    }

    return NextResponse.json({ valid: true })
  } catch (error) {
    console.error('Admin verify GET error:', error)
    return NextResponse.json({ valid: false }, { status: 500 })
  }
}
