"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    sizes?: string[];
  }>;
  title?: string;
  subtitle?: string;
  viewAllHref?: string;
  variant?: "grid" | "scroll";
}

export default function ProductGrid({
  products,
  title,
  subtitle,
  viewAllHref,
  variant = "scroll",
}: ProductGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  if (products.length === 0) return null;

  function checkScroll() {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  }

  function scroll(direction: "left" | "right") {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }

  // Grid variant for category/search pages
  if (variant === "grid") {
    return (
      <section className="w-full">
        {title && (
          <div className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                {title}
              </h2>
              {subtitle && (
                <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
            {viewAllHref && (
              <Link
                href={viewAllHref}
                className="hidden text-sm font-medium text-primary transition-colors hover:underline sm:block"
              >
                Ver todo
              </Link>
            )}
          </div>
        )}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    );
  }

  // Scroll variant for homepage
  return (
    <section className="w-full">
      {/* ── Section Header ── */}
      {title && (
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="group/link flex items-center gap-1 text-sm font-medium text-primary transition-all hover:gap-2"
            >
              Ver todo
              <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
            </Link>
          )}
        </div>
      )}

      {/* ── Scrollable Container ── */}
      <div className="relative group/scroll">
        {/* Left scroll button */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute -left-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full bg-card shadow-xl border border-border/50 p-1.5 transition-all hover:scale-110 hover:shadow-2xl md:flex"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>
        )}

        {/* Scroll content */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="scroll-container flex gap-4 pb-2"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[180px] shrink-0 sm:w-[200px] md:w-[220px] lg:w-[230px]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Right scroll button */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute -right-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full bg-card shadow-xl border border-border/50 p-1.5 transition-all hover:scale-110 hover:shadow-2xl md:flex"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-5 w-5 text-foreground" />
          </button>
        )}

        {/* Edge fade gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
}
