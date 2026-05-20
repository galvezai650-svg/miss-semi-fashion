import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function verifyAdminToken(request: NextRequest): Promise<NextResponse | null> {
  try {
    const authHeader = request.headers.get('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      )
    }

    const token = authHeader.split(' ')[1]

    const session = await db.adminSession.findUnique({
      where: { token },
    })

    if (!session) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    if (new Date() > session.expiresAt) {
      // Clean up expired session
      await db.adminSession.delete({ where: { id: session.id } })
      return NextResponse.json(
        { error: 'Token expired' },
        { status: 401 }
      )
    }

    return null // Token is valid, no error response
  } catch {
    return NextResponse.json(
      { error: 'Authentication error' },
      { status: 500 }
    )
  }
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    + '-' + Date.now().toString(36)
}
