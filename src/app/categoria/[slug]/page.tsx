"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Breadcrumbs from "@/components/amazon/Breadcrumbs";
import ProductCard from "@/components/amazon/ProductCard";
import { getCategoryBySlug } from "@/data/categories";
import type { Product } from "@/data/products";

/* ─── Filter types ─── */
interface Filters {
  priceRanges: string[];
  sizes: string[];
  ratings: number[];
  freeShipping: boolean;
  subcategories: string[];
}

const PRICE_RANGES: { label: string; value: string; min: number; max: number }[] = [
  { label: "Hasta $30.000", value: "0-30000", min: 0, max: 30000 },
  { label: "$30.000 - $50.000", value: "30000-50000", min: 30000, max: 50000 },
  { label: "$50.000 - $80.000", value: "50000-80000", min: 50000, max: 80000 },
  { label: "Más de $80.000", value: "80000-999999", min: 80000, max: 999999 },
];

const SIZE_OPTIONS = ["S", "M", "L", "XL"];
const RATING_OPTIONS = [4, 3, 2];

const SORT_OPTIONS = [
  { label: "Destacados", value: "featured" },
  { label: "Precio: menor a mayor", value: "price-asc" },
  { label: "Precio: mayor a menor", value: "price-desc" },
  { label: "Mejor valorados", value: "rating" },
  { label: "Más vendidos", value: "bestseller" },
] as const;

function FilterSidebar({
  category,
  filters,
  setFilters,
}: {
  category: { subcategories: string[] } | undefined;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}) {
  function toggleArrayFilter(
    key: "priceRanges" | "sizes" | "ratings" | "subcategories",
    value: string | number
  ) {
    setFilters((prev) => {
      const arr = prev[key] as (string | number)[];
      const exists = arr.includes(value);
      return {
        ...prev,
        [key]: exists ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  }

  const activeCount =
    filters.priceRanges.length +
    filters.sizes.length +
    filters.ratings.length +
    filters.subcategories.length +
    (filters.freeShipping ? 1 : 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-base font-bold text-foreground">
          <SlidersHorizontal className="h-4 w-4" />
          Filtros
        </h3>
        {activeCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
            onClick={() =>
              setFilters({
                priceRanges: [],
                sizes: [],
                ratings: [],
                freeShipping: false,
                subcategories: [],
              })
            }
          >
            Limpiar todo ({activeCount})
          </Button>
        )}
      </div>

      <Separator />

      {/* Price */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-foreground">Precio</h4>
        <div className="space-y-2">
          {PRICE_RANGES.map((range) => (
            <div key={range.value} className="flex items-center gap-2">
              <Checkbox
                id={`price-${range.value}`}
                checked={filters.priceRanges.includes(range.value)}
                onCheckedChange={() => toggleArrayFilter("priceRanges", range.value)}
              />
              <Label
                htmlFor={`price-${range.value}`}
                className="cursor-pointer text-sm text-muted-foreground"
              >
                {range.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Size */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-foreground">Talla</h4>
        <div className="flex flex-wrap gap-2">
          {SIZE_OPTIONS.map((size) => (
            <Button
              key={size}
              variant={filters.sizes.includes(size) ? "default" : "outline"}
              size="sm"
              className="h-8 min-w-[40px] text-xs font-semibold"
              onClick={() => toggleArrayFilter("sizes", size)}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Rating */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-foreground">Calificación</h4>
        <div className="space-y-2">
          {RATING_OPTIONS.map((r) => (
            <div key={r} className="flex items-center gap-2">
              <Checkbox
                id={`rating-${r}`}
                checked={filters.ratings.includes(r)}
                onCheckedChange={() => toggleArrayFilter("ratings", r)}
              />
              <Label
                htmlFor={`rating-${r}`}
                className="cursor-pointer text-sm text-muted-foreground"
              >
                {r}+ estrellas
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Free shipping */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="free-shipping"
          checked={filters.freeShipping}
          onCheckedChange={(checked) =>
            setFilters((prev) => ({
              ...prev,
              freeShipping: checked === true,
            }))
          }
        />
        <Label
          htmlFor="free-shipping"
          className="cursor-pointer text-sm text-muted-foreground"
        >
          Envío GRATIS
        </Label>
      </div>

      {/* Subcategories */}
      {category?.subcategories && category.subcategories.length > 0 && (
        <>
          <Separator />
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Tipo</h4>
            <div className="space-y-2">
              {category.subcategories.map((sub) => (
                <div key={sub} className="flex items-center gap-2">
                  <Checkbox
                    id={`sub-${sub}`}
                    checked={filters.subcategories.includes(sub)}
                    onCheckedChange={() => toggleArrayFilter("subcategories", sub)}
                  />
                  <Label
                    htmlFor={`sub-${sub}`}
                    className="cursor-pointer text-sm text-muted-foreground"
                  >
                    {sub}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const category = getCategoryBySlug(slug);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`/api/products?category=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((data) => setAllProducts(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, [slug]);

  const [filters, setFilters] = useState<Filters>({
    priceRanges: [],
    sizes: [],
    ratings: [],
    freeShipping: false,
    subcategories: [],
  });
  const [sort, setSort] = useState<string>("featured");

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Price filter
    if (filters.priceRanges.length > 0) {
      result = result.filter((p) =>
        filters.priceRanges.some((rangeStr) => {
          const range = PRICE_RANGES.find((r) => r.value === rangeStr);
          if (!range) return false;
          return p.price >= range.min && p.price <= range.max;
        })
      );
    }

    // Size filter
    if (filters.sizes.length > 0) {
      result = result.filter((p) =>
        filters.sizes.some((s) => p.sizes.includes(s))
      );
    }

    // Rating filter
    if (filters.ratings.length > 0) {
      result = result.filter((p) =>
        filters.ratings.some((r) => p.rating >= r)
      );
    }

    // Free shipping filter (isPrime = free shipping)
    if (filters.freeShipping) {
      result = result.filter((p) => p.isPrime);
    }

    // Subcategory filter
    if (filters.subcategories.length > 0) {
      result = result.filter((p) =>
        filters.subcategories.includes(p.subcategory)
      );
    }

    // Sort
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "bestseller":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        break;
    }

    return result;
  }, [allProducts, filters, sort]);

  const activeFilterCount =
    filters.priceRanges.length +
    filters.sizes.length +
    filters.ratings.length +
    filters.subcategories.length +
    (filters.freeShipping ? 1 : 0);

  // Category not found
  if (!category) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4">
        <h1 className="text-2xl font-bold text-foreground">Categoría no encontrada</h1>
        <p className="text-muted-foreground">
          La categoría que buscas no existe.
        </p>
        <Button asChild>
          <a href="/">Volver al inicio</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Breadcrumbs */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: category.name }]} />
      </div>

      {/* Category Banner */}
      <div className="relative w-full overflow-hidden">
        <div className="relative h-48 w-full sm:h-56 md:h-64">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 md:p-10">
            <h1 className="text-2xl font-extrabold text-white drop-shadow sm:text-3xl md:text-4xl">
              {category.name}
            </h1>
            <p className="mt-1 max-w-xl text-sm text-white/80 sm:text-base">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main content: sidebar + grid */}
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden w-64 flex-shrink-0 lg:block">
            <div className="sticky top-24 rounded-lg border bg-card p-4">
              <FilterSidebar
                category={category}
                filters={filters}
                setFilters={setFilters}
              />
            </div>
          </aside>

          {/* Product area */}
          <div className="min-w-0 flex-1">
            {/* Toolbar: sort + filter button + results count */}
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                {/* Mobile filter button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <SlidersHorizontal className="mr-2 h-4 w-4" />
                      Filtros
                      {activeFilterCount > 0 && (
                        <Badge
                          variant="secondary"
                          className="ml-2 h-5 min-w-[20px] rounded-full bg-rose-500 px-1.5 text-xs text-white"
                        >
                          {activeFilterCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Filtros</SheetTitle>
                    </SheetHeader>
                    <div className="mt-4">
                      <FilterSidebar
                        category={category}
                        filters={filters}
                        setFilters={setFilters}
                      />
                    </div>
                  </SheetContent>
                </Sheet>

                <span className="text-sm text-muted-foreground">
                  {filteredProducts.length} resultado
                  {filteredProducts.length !== 1 ? "s" : ""}
                </span>
              </div>

              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-full sm:w-[220px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Active filter badges */}
            {activeFilterCount > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {filters.priceRanges.map((v) => {
                  const range = PRICE_RANGES.find((r) => r.value === v);
                  return range ? (
                    <Badge
                      key={v}
                      variant="secondary"
                      className="cursor-pointer gap-1"
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          priceRanges: prev.priceRanges.filter((r) => r !== v),
                        }))
                      }
                    >
                      {range.label}
                      <X className="h-3 w-3" />
                    </Badge>
                  ) : null;
                })}
                {filters.sizes.map((s) => (
                  <Badge
                    key={s}
                    variant="secondary"
                    className="cursor-pointer gap-1"
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        sizes: prev.sizes.filter((sz) => sz !== s),
                      }))
                    }
                  >
                    Talla {s}
                    <X className="h-3 w-3" />
                  </Badge>
                ))}
                {filters.ratings.map((r) => (
                  <Badge
                    key={r}
                    variant="secondary"
                    className="cursor-pointer gap-1"
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        ratings: prev.ratings.filter((rt) => rt !== r),
                      }))
                    }
                  >
                    {r}+ estrellas
                    <X className="h-3 w-3" />
                  </Badge>
                ))}
                {filters.freeShipping && (
                  <Badge
                    variant="secondary"
                    className="cursor-pointer gap-1"
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, freeShipping: false }))
                    }
                  >
                    Envío GRATIS
                    <X className="h-3 w-3" />
                  </Badge>
                )}
                {filters.subcategories.map((sub) => (
                  <Badge
                    key={sub}
                    variant="secondary"
                    className="cursor-pointer gap-1"
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        subcategories: prev.subcategories.filter((s) => s !== sub),
                      }))
                    }
                  >
                    {sub}
                    <X className="h-3 w-3" />
                  </Badge>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs"
                  onClick={() =>
                    setFilters({
                      priceRanges: [],
                      sizes: [],
                      ratings: [],
                      freeShipping: false,
                      subcategories: [],
                    })
                  }
                >
                  Limpiar todo
                </Button>
              </div>
            )}

            {/* Products grid */}
            {filteredProducts.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex min-h-[40vh] flex-col items-center justify-center gap-4"
              >
                <div className="rounded-full bg-muted p-6">
                  <SlidersHorizontal className="h-8 w-8 text-muted-foreground" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">
                  No se encontraron productos
                </h2>
                <p className="max-w-md text-center text-sm text-muted-foreground">
                  Intenta ajustar los filtros para encontrar lo que buscas.
                </p>
                <Button
                  variant="outline"
                  onClick={() =>
                    setFilters({
                      priceRanges: [],
                      sizes: [],
                      ratings: [],
                      freeShipping: false,
                      subcategories: [],
                    })
                  }
                >
                  Limpiar filtros
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="h-8" />
    </div>
  );
}
