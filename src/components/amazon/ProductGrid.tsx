"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Array<{
    id: string;
    name: string;
    slug: string;
    image: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewCount: number;
    isBestSeller?: boolean;
    isDeal?: boolean;
    dealDiscount?: number;
    isPrime?: boolean;
  }>;
  title?: string;
  viewAllHref?: string;
}

export default function ProductGrid({
  products,
  title,
  viewAllHref,
}: ProductGridProps) {
  if (products.length === 0) return null;

  return (
    <section className="w-full">
      {/* ── Section Header ── */}
      {title && (
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            {title}
          </h2>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:underline"
            >
              Ver todo
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      )}

      {/* ── Grid ── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
