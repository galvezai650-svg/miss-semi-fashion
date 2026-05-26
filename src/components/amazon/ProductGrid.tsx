"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
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

  // Grid variant
  if (variant === "grid") {
    return (
      <section className="w-full">
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 flex items-end justify-between"
          >
            <div>
              <h2 className="font-serif text-xl font-medium text-[#E5E5E5] sm:text-2xl">
                {title}
              </h2>
              {subtitle && (
                <p className="mt-1 text-sm text-[#666]">{subtitle}</p>
              )}
            </div>
            {viewAllHref && (
              <Link
                href={viewAllHref}
                className="hidden text-[12px] font-medium tracking-wider text-[#C6A962] uppercase transition-colors duration-300 hover:text-[#D4AF37] sm:block"
              >
                Ver todo
              </Link>
            )}
          </motion.div>
        )}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>
    );
  }

  // Scroll variant
  return (
    <section className="w-full">
      {title && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 flex items-end justify-between"
        >
          <div>
            <h2 className="font-serif text-xl font-medium text-[#E5E5E5] sm:text-2xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 text-sm text-[#666]">{subtitle}</p>
            )}
          </div>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="group/link flex items-center gap-1.5 text-[12px] font-medium tracking-wider text-[#C6A962] uppercase transition-all duration-300 hover:text-[#D4AF37]"
            >
              Ver todo
              <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5" />
            </Link>
          )}
        </motion.div>
      )}

      <div className="relative group/scroll">
        {canScrollLeft && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => scroll("left")}
            className="absolute -left-2 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/50 backdrop-blur-md p-2 shadow-sm transition-all duration-300 hover:border-[#C6A962]/30 hover:shadow-md md:flex"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-4 w-4 text-[#999]" />
          </motion.button>
        )}

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="scroll-container flex gap-4 pb-2"
        >
          {products.map((product, i) => (
            <div
              key={product.id}
              className="w-[180px] shrink-0 sm:w-[200px] md:w-[220px] lg:w-[230px]"
            >
              <ProductCard product={product} index={i} />
            </div>
          ))}
        </div>

        {canScrollRight && (
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => scroll("right")}
            className="absolute -right-2 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/50 backdrop-blur-md p-2 shadow-sm transition-all duration-300 hover:border-[#C6A962]/30 hover:shadow-md md:flex"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-4 w-4 text-[#999]" />
          </motion.button>
        )}

        {/* Edge fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/40 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-black/40 to-transparent" />
      </div>
    </section>
  );
}
