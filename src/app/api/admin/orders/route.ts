import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/admin-auth'

export async function GET(request: NextRequest) {
  try {
    const authError = await verifyAdminToken(request)
    if (authError) return authError

    // Orders are managed client-side via Zustand store + localStorage
    // Server cannot access localStorage, so we return an empty array
    return NextResponse.json({
      orders: [],
      note: 'Orders are managed client-side via the Zustand cart store in localStorage',
    })
  } catch (error) {
    console.error('Admin orders GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}
