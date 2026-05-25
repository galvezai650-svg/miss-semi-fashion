import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyAdminToken, generateSlug } from '@/lib/admin-auth'

export async function GET(request: NextRequest) {
  try {
    const authError = await verifyAdminToken(request)
    if (authError) return authError

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '50', 10)
    const skip = (page - 1) * limit

    const where: Record<string, unknown> = { active: true }

    if (category) {
      where.categorySlug = category
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ]
    }

    const [products, total] = await Promise.all([
      db.product.findMany({
        where,
        orderBy: [
          { sortOrder: 'desc' },
          { createdAt: 'desc' },
        ],
        skip,
        take: limit,
      }),
      db.product.count({ where }),
    ])

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Admin products GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const authError = await verifyAdminToken(request)
    if (authError) return authError

    const body = await request.json()
    const { name, price, category, categorySlug, image } = body

    // Helper: ensure list fields are stored as JSON arrays
    function toArray(val: unknown): string[] {
      if (Array.isArray(val)) return val.map(String);
      if (typeof val === "string") {
        const trimmed = val.trim();
        if (!trimmed) return [];
        // Try JSON parse first (e.g. "[\"S\",\"M\"]")
        try {
          const parsed = JSON.parse(trimmed);
          if (Array.isArray(parsed)) return parsed.map(String);
          if (typeof parsed === "string") return parsed.trim() ? [parsed.trim()] : [];
        } catch {}
        // Otherwise treat as comma-separated
        return trimmed.split(",").map((s) => s.trim()).filter(Boolean);
      }
      return [];
    }

    // Validate required fields
    if (!name || price === undefined || !category || !categorySlug || !image) {
      return NextResponse.json(
        { error: 'Missing required fields: name, price, category, categorySlug, image' },
        { status: 400 }
      )
    }

    const slug = generateSlug(name)

    // Check if slug already exists
    const existing = await db.product.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json(
        { error: 'Product with similar name already exists' },
        { status: 409 }
      )
    }

    const product = await db.product.create({
      data: {
        name,
        slug,
        price: parseFloat(price),
        originalPrice: body.originalPrice ? parseFloat(body.originalPrice) : null,
        priceMayorista: body.priceMayorista ? parseFloat(body.priceMayorista) : null,
        category,
        categorySlug,
        subcategory: body.subcategory || '',
        description: body.description || '',
        shortDescription: body.shortDescription || '',
        image,
        images: JSON.stringify(toArray(body.images)),
        sizes: JSON.stringify(toArray(body.sizes)),
        colors: JSON.stringify(toArray(body.colors)),
        fabric: body.fabric || '',
        inStock: body.inStock !== undefined ? body.inStock : true,
        stockCount: body.stockCount || 0,
        rating: body.rating || 4.5,
        reviewCount: body.reviewCount || 0,
        isPrime: body.isPrime !== undefined ? body.isPrime : true,
        isBestSeller: body.isBestSeller || false,
        isDeal: body.isDeal || false,
        dealDiscount: body.dealDiscount || null,
        tags: JSON.stringify(toArray(body.tags)),
        sortOrder: body.sortOrder || 0,
        active: body.active !== undefined ? body.active : true,
      },
    })

    return NextResponse.json({ product }, { status: 201 })
  } catch (error) {
    console.error('Admin products POST error:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
