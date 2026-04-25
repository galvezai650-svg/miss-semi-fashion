"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  X,
  ArrowUpDown,
  ShoppingCart,
} from "lucide-react";
import { searchProducts, type Product } from "@/data/products";
import { categories } from "@/data/categories";
import ProductCard from "@/components/amazon/ProductCard";
import Breadcrumbs from "@/components/amazon/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const sortOptions = [
  { label: "Relevancia", value: "relevance" },
  { label: "Precio menor", value: "price-asc" },
  { label: "Precio mayor", value: "price-desc" },
  { label: "Mejor valorados", value: "rating-desc" },
] as const;

const priceRangeOptions = [
  { label: "Todos los precios", value: "all" },
  { label: "Hasta $50.000", value: "0-50000" },
  { label: "$50.000 - $100.000", value: "50000-100000" },
  { label: "$100.000 - $150.000", value: "100000-150000" },
  { label: "Mas de $150.000", value: "150000-999999" },
] as const;

function sortProducts(products: Product[], sort: string): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating-desc":
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    default:
      return sorted;
  }
}

function filterByPrice(products: Product[], range: string): Product[] {
  if (range === "all") return products;
  const [min, max] = range.split("-").map(Number);
  return products.filter((p) => p.price >= min && p.price <= max);
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(query);
  const [sortBy, setSortBy] = useState("relevance");
  const [priceRange, setPriceRange] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const results = useMemo(() => searchProducts(query), [query]);

  const displayedResults = useMemo(() => {
    const filtered = filterByPrice(results, priceRange);
    return sortProducts(filtered, sortBy);
  }, [results, priceRange, sortBy]);

  // Extract unique categories from results and map to their real slugs
  const categoryLinks = useMemo(() => {
    const cats = new Set(results.map((p) => p.category).filter(Boolean));
    return Array.from(cats)
      .map((catName) => {
        const cat = categories.find((c) => c.name === catName);
        return cat ? { name: cat.name, slug: cat.slug } : null;
      })
      .filter(Boolean) as { name: string; slug: string }[];
  }, [results]);

  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = searchInput.trim();
    if (trimmed) {
      router.push(`/buscar?q=${encodeURIComponent(trimmed)}`);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: "Resultados de busqueda" },
              ...(query ? [{ label: query }] : []),
            ]}
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Search Bar */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex gap-2"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Buscar productos..."
              className="pl-10 pr-8"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => setSearchInput("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button type="submit">
            <Search className="mr-2 h-4 w-4" />
            Buscar
          </Button>
        </motion.form>

        {/* Search Info */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            {query ? (
              <h1 className="text-lg font-bold text-gray-900 md:text-xl">
                {results.length}{" "}
                {results.length === 1 ? "resultado" : "resultados"} para &ldquo;
                <span className="text-orange-600">{query}</span>&rdquo;
              </h1>
            ) : (
              <h1 className="text-lg font-bold text-gray-900 md:text-xl">
                Buscar productos
              </h1>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 lg:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtros
          </Button>
        </div>

        {/* No results state */}
        {query && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-16 text-center"
          >
            <Search className="mx-auto mb-4 h-16 w-16 text-gray-300" />
            <h2 className="mb-2 text-xl font-semibold text-gray-700">
              No se encontraron resultados para &ldquo;{query}&rdquo;
            </h2>
            <p className="mb-6 text-gray-500">
              Intenta con otras palabras o revisa la ortografia.
            </p>
            <div className="text-sm text-gray-500">
              <p className="mb-2 font-medium text-gray-700">Sugerencias:</p>
              <ul className="space-y-1">
                <li>Revisa que las palabras esten escritas correctamente</li>
                <li>Usa palabras mas generales</li>
                <li>
                  Intenta buscar por categoria: &quot;vestidos&quot;,
                  &quot;pijamas&quot;, &quot;blusas&quot;
                </li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Content: Filters + Grid */}
        {results.length > 0 && (
          <div className="flex gap-6">
            {/* Sidebar Filters */}
            <aside
              className={`${
                showFilters ? "block" : "hidden"
              } w-full shrink-0 lg:block lg:w-56`}
            >
              <div className="sticky top-4 rounded-lg border bg-white p-4 shadow-sm">
                <h3 className="mb-3 font-semibold text-gray-900">
                  <SlidersHorizontal className="mr-1.5 inline h-4 w-4" />
                  Filtros
                </h3>

                {/* Sort */}
                <div className="mb-5">
                  <h4 className="mb-2 text-sm font-medium text-gray-600">
                    <ArrowUpDown className="mr-1 inline h-3.5 w-3.5" />
                    Ordenar por
                  </h4>
                  <div className="space-y-1">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSortBy(option.value)}
                        className={`block w-full rounded px-2 py-1.5 text-left text-sm transition-colors ${
                          sortBy === option.value
                            ? "bg-orange-50 font-medium text-orange-700"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-5">
                  <h4 className="mb-2 text-sm font-medium text-gray-600">
                    Rango de precio
                  </h4>
                  <div className="space-y-1">
                    {priceRangeOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setPriceRange(option.value)}
                        className={`block w-full rounded px-2 py-1.5 text-left text-sm transition-colors ${
                          priceRange === option.value
                            ? "bg-orange-50 font-medium text-orange-700"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Categories - using real slugs */}
                {categoryLinks.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-gray-600">
                      Categorias
                    </h4>
                    <div className="space-y-1">
                      {categoryLinks.map((cat) => (
                        <button
                          key={cat.slug}
                          onClick={() =>
                            router.push(`/categoria/${cat.slug}`)
                          }
                          className="block w-full rounded px-2 py-1.5 text-left text-sm text-gray-600 transition-colors hover:bg-gray-50"
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              {/* Sort indicator on mobile */}
              <div className="mb-3 flex items-center gap-2 text-sm text-gray-500 lg:hidden">
                <ArrowUpDown className="h-3.5 w-3.5" />
                <span>
                  {sortOptions.find((o) => o.value === sortBy)?.label}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3">
                {displayedResults.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>

              {displayedResults.length === 0 && (
                <div className="py-12 text-center text-gray-500">
                  <p>No hay productos con los filtros seleccionados.</p>
                  <Button
                    variant="outline"
                    className="mt-3"
                    onClick={() => {
                      setPriceRange("all");
                      setSortBy("relevance");
                    }}
                  >
                    Limpiar filtros
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* No query state */}
        {!query && (
          <div className="py-16 text-center">
            <ShoppingCart className="mx-auto mb-4 h-16 w-16 text-gray-300" />
            <h2 className="mb-2 text-xl font-semibold text-gray-700">
              Escribe algo para buscar
            </h2>
            <p className="text-gray-500">
              Encuentra pijamas, vestidos, blusas y mas.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BuscarPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
