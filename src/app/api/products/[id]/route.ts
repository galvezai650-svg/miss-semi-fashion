import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

function safeJSON(str: string, fallback: unknown[] = []) {
  try {
    const arr = JSON.parse(str);
    return Array.isArray(arr) ? arr : fallback;
  } catch {
    return fallback;
  }
}

function formatProduct(p: Record<string, unknown>) {
  return {
    ...p,
    images: safeJSON(p.images as string),
    sizes: safeJSON(p.sizes as string),
    colors: safeJSON(p.colors as string),
    tags: safeJSON(p.tags as string),
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const product = await db.product.findUnique({
      where: { id },
    });

    if (!product || !product.active) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Get related products (same category, max 6)
    const related = await db.product.findMany({
      where: {
        categorySlug: product.categorySlug,
        active: true,
        id: { not: product.id },
      },
      take: 6,
      orderBy: [{ sortOrder: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({
      product: formatProduct(product as unknown as Record<string, unknown>),
      related: related.map(
        (r) => formatProduct(r as unknown as Record<string, unknown>)
      ),
    });
  } catch (error) {
    console.error("Product GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
