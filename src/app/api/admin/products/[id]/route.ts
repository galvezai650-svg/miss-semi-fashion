import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyAdminToken, generateSlug } from '@/lib/admin-auth'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const authError = await verifyAdminToken(request)
    if (authError) return authError

    const { id } = await params

    // Handle route conflict prevention
    if (id === 'auth') {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const product = await db.product.findUnique({
      where: { id },
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json({ product })
  } catch (error) {
    console.error('Admin product GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const authError = await verifyAdminToken(request)
    if (authError) return authError

    const { id } = await params

    if (id === 'auth') {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const existing = await db.product.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const body = await request.json()

    const updateData: Record<string, unknown> = {}
    const allowedFields = [
      'name', 'description', 'shortDescription', 'image', 'images',
      'price', 'originalPrice', 'priceMayorista', 'category', 'categorySlug',
      'subcategory', 'sizes', 'colors', 'fabric', 'inStock', 'stockCount',
      'rating', 'reviewCount', 'isPrime', 'isBestSeller', 'isDeal',
      'dealDiscount', 'tags', 'sortOrder', 'active',
    ]

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        // Convert numeric fields
        if (['price', 'originalPrice', 'priceMayorista'].includes(field) && body[field] !== null) {
          updateData[field] = parseFloat(body[field])
        } else if (['stockCount', 'rating', 'reviewCount', 'dealDiscount', 'sortOrder'].includes(field)) {
          updateData[field] = parseInt(body[field], 10)
        } else if (['sizes', 'colors', 'images', 'tags'].includes(field)) {
          updateData[field] = JSON.stringify(body[field])
        } else {
          updateData[field] = body[field]
        }
      }
    }

    // Regenerate slug if name changed
    if (body.name && body.name !== existing.name) {
      const newSlug = generateSlug(body.name)
      const slugExists = await db.product.findFirst({ where: { slug: newSlug, NOT: { id } } })
      if (!slugExists) {
        updateData.slug = newSlug
      }
    }

    const product = await db.product.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({ product })
  } catch (error) {
    console.error('Admin product PUT error:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const authError = await verifyAdminToken(request)
    if (authError) return authError

    const { id } = await params

    // Handle route conflict prevention
    if (id === 'auth') {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const existing = await db.product.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    await db.product.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Admin product DELETE error:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
