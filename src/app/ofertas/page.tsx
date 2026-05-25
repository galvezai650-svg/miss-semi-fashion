"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Tag, Clock, TrendingUp } from "lucide-react";
import type { Product } from "@/data/products";
import ProductGrid from "@/components/amazon/ProductGrid";
import Breadcrumbs from "@/components/amazon/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLiveFetch } from "@/hooks/useLiveFetch";

const sortOptions = [
  { label: "Relevancia", value: "relevance" },
  { label: "Mayor descuento", value: "discount-desc" },
  { label: "Precio menor", value: "price-asc" },
  { label: "Precio mayor", value: "price-desc" },
] as const;

const discountOptions = [
  { label: "Todos", value: 0 },
  { label: "10% o mas", value: 10 },
  { label: "20% o mas", value: 20 },
  { label: "30% o mas", value: 30 },
] as const;

function getDiscount(p: Product): number {
  if (!p.originalPrice || p.originalPrice <= p.price) return 0;
  return Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
}

function sortProducts(products: Product[], sort: string): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "discount-desc":
      return sorted.sort((a, b) => getDiscount(b) - getDiscount(a));
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    default:
      return sorted;
  }
}

export default function OfertasPage() {
  const [sortBy, setSortBy] = useState("relevance");
  const [minDiscount, setMinDiscount] = useState(0);
  const { data: allDeals } = useLiveFetch<Product>("/api/products?deals=true");
  const { data: bestSellers } = useLiveFetch<Product>("/api/products?bestSellers=true");

  const dealsWithSellers = useMemo(() => {
    if (allDeals.length >= 4) return allDeals;
    const sellerIds = new Set(allDeals.map((p) => p.id));
    const additional = bestSellers.filter((p) => !sellerIds.has(p.id));
    return [...allDeals, ...additional];
  }, [allDeals, bestSellers]);

  const filteredDeals = useMemo(() => {
    let filtered = dealsWithSellers.filter(
      (p) => getDiscount(p) >= minDiscount
    );
    return sortProducts(filtered, sortBy);
  }, [dealsWithSellers, minDiscount, sortBy]);

  const sortedBestSellers = useMemo(
    () => sortProducts(bestSellers, sortBy),
    [bestSellers, sortBy]
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Ofertas" }]} />
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-orange-600">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <Tag className="h-10 w-10 text-white md:h-12 md:w-12" />
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                Ofertas del Dia
              </h1>
              <p className="mt-1 text-lg text-orange-100">
                Descuentos exclusivos en ropa femenina
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Deal Timer */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-6 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3"
        >
          <Clock className="h-5 w-5 animate-pulse text-red-500" />
          <span className="font-semibold text-red-700">
            Las ofertas terminan hoy!
          </span>
          <Badge variant="secondary" className="bg-red-100 text-red-700">
            <Clock className="mr-1 h-3 w-3" />
            Tiempo limitado
          </Badge>
        </motion.div>

        {/* Filters Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-6 flex flex-wrap items-center gap-4 rounded-lg border bg-card p-4 shadow-sm"
        >
          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Ordenar:</span>
            <div className="flex flex-wrap gap-1.5">
              {sortOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={sortBy === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy(option.value)}
                  className="h-8 text-xs"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="hidden h-6 w-px bg-border sm:block" />

          {/* Discount Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Descuento:</span>
            <div className="flex flex-wrap gap-1.5">
              {discountOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={minDiscount === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMinDiscount(option.value)}
                  className="h-8 text-xs"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Deals Product Grid */}
        <ProductGrid
          products={filteredDeals}
          title={
            filteredDeals.length > 0
              ? "Ofertas disponibles"
              : "No hay ofertas con ese descuento"
          }
          viewAllHref="/"
          variant="grid"
        />

        {/* Featured Bestsellers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="mt-10 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-orange-600" />
            <h2 className="text-xl font-bold text-foreground md:text-2xl">
              Productos destacados
            </h2>
          </div>
          <ProductGrid
            products={sortedBestSellers}
            title=""
            viewAllHref="/"
            variant="grid"
          />
        </motion.div>
      </div>
    </div>
  );
}
