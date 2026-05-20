import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyAdminToken } from '@/lib/admin-auth'

export async function GET(request: NextRequest) {
  try {
    const authError = await verifyAdminToken(request)
    if (authError) return authError

    const [totalProducts, activePromotions, productsByCategory, allProducts] =
      await Promise.all([
        db.product.count(),
        db.promotion.count({ where: { active: true } }),
        db.product.groupBy({
          by: ['category'],
          _count: { id: true },
          where: { active: true },
        }),
        db.product.findMany({
          where: { active: true },
          select: { price: true, stockCount: true },
        }),
      ])

    const totalStockValue = allProducts.reduce(
      (sum, p) => sum + p.price * p.stockCount,
      0
    )

    return NextResponse.json({
      totalProducts,
      activePromotions,
      productsByCategory: productsByCategory.map((group) => ({
        category: group.category || 'Sin categoría',
        count: group._count.id,
      })),
      totalStockValue: Math.round(totalStockValue * 100) / 100,
    })
  } catch (error) {
    console.error('Admin stats GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
