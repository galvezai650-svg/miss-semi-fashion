import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdminToken } from "@/lib/admin-auth";
import { products } from "@/data/products";

export async function POST(request: NextRequest) {
  try {
    const authError = await verifyAdminToken(request);
    if (authError) return authError;

    let created = 0;
    let skipped = 0;

    for (const p of products) {
      const existing = await db.product.findUnique({
        where: { slug: p.slug },
      });
      if (existing) {
        skipped++;
        continue;
      }

      await db.product.create({
        data: {
          id: p.id,
          name: p.name,
          slug: p.slug,
          description: p.description,
          shortDescription: p.shortDescription || "",
          image: p.image,
          images: Array.isArray(p.images)
            ? JSON.stringify(p.images)
            : String(p.images || "[]"),
          price: p.price,
          originalPrice: p.originalPrice ?? null,
          priceMayorista: p.priceMayorista ?? null,
          category: p.category || "",
          categorySlug: p.categorySlug || "",
          subcategory: p.subcategory || "",
          sizes: Array.isArray(p.sizes)
            ? JSON.stringify(p.sizes)
            : String(p.sizes || "[]"),
          colors: Array.isArray(p.colors)
            ? JSON.stringify(p.colors)
            : String(p.colors || "[]"),
          fabric: p.fabric || "",
          inStock: p.inStock ?? true,
          stockCount: p.stockCount ?? 0,
          rating: p.rating ?? 4.5,
          reviewCount: p.reviewCount ?? 0,
          isPrime: p.isPrime ?? true,
          isBestSeller: p.isBestSeller ?? false,
          isDeal: p.isDeal ?? false,
          dealDiscount: p.dealDiscount ?? null,
          tags: Array.isArray(p.tags)
            ? JSON.stringify(p.tags)
            : String(p.tags || "[]"),
          sortOrder: 0,
          active: true,
          createdAt: p.createdAt ? new Date(p.createdAt) : new Date(),
        },
      });
      created++;
    }

    // Create default promotions if none exist
    const promoCount = await db.promotion.count();
    if (promoCount === 0) {
      await db.promotion.createMany({
        data: [
          {
            name: "Descuento de Verano",
            description:
              "Descuento especial en toda la tienda por temporada de verano",
            discount: 15,
            type: "percentage",
            active: true,
          },
          {
            name: "Envio Gratis Compras +$100k",
            description:
              "Envio gratis en compras superiores a $100.000 COP",
            discount: 0,
            type: "fixed",
            active: true,
          },
          {
            name: "Bienvenida MSF2026",
            description: "10% de descuento para nuevos clientes",
            discount: 10,
            type: "percentage",
            active: true,
          },
        ],
      });
    }

    return NextResponse.json({
      message: "Sincronización completada",
      created,
      skipped,
      total: products.length,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Error al sincronizar datos" },
      { status: 500 }
    );
  }
}
