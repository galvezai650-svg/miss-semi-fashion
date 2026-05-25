import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';

const noCacheHeaders = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
};

function safeJSON(str: string, fallback: unknown[] = []) {
  if (!str) return fallback;
  try {
    const parsed = JSON.parse(str);
    if (Array.isArray(parsed)) return parsed;
    // If parsed result is a string, treat as comma-separated or single value
    if (typeof parsed === "string") {
      const trimmed = parsed.trim();
      if (!trimmed) return fallback;
      if (trimmed.includes(",")) {
        return trimmed.split(",").map((s) => s.trim()).filter(Boolean);
      }
      return [trimmed];
    }
    return fallback;
  } catch {
    // Fallback: treat the raw string as comma-separated or single value
    if (typeof str === "string") {
      const trimmed = str.trim();
      if (!trimmed) return fallback;
      if (trimmed.includes(",")) {
        return trimmed.split(",").map((s) => s.trim()).filter(Boolean);
      }
      return [trimmed];
    }
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const bestSellers = searchParams.get("bestSellers");
    const deals = searchParams.get("deals");

    const where: Record<string, unknown> = { active: true };

    if (category) {
      where.categorySlug = category;
    }

    if (bestSellers === "true") {
      where.isBestSeller = true;
    }

    if (deals === "true") {
      where.isDeal = true;
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { shortDescription: { contains: search } },
        { subcategory: { contains: search } },
        { tags: { contains: search } },
        { category: { contains: search } },
      ];
    }

    const products = await db.product.findMany({
      where,
      orderBy: [{ sortOrder: "desc" }, { createdAt: "desc" }],
    });

    const formatted = products.map(formatProduct);
    return NextResponse.json(formatted, { headers: noCacheHeaders });
  } catch (error) {
    console.error("Products GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
