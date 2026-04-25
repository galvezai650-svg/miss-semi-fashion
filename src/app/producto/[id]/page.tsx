"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  Minus,
  Plus,
  Truck,
  Star,
  Home,
  Store,
  ChevronLeft,
  ChevronRight,
  Package,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Breadcrumbs from "@/components/amazon/Breadcrumbs";
import StarRating from "@/components/amazon/StarRating";
import ProductGrid from "@/components/amazon/ProductGrid";
import { useCartStore } from "@/stores/cart-store";
import {
  getProductById,
  getRelatedProducts,
  type Product,
} from "@/data/products";

function formatPrice(price: number): string {
  return `$${price.toLocaleString("es-CO")}`;
}

/* ─── Mock Reviews ─── */
const MOCK_REVIEWS = [
  {
    id: "r1",
    name: "Carolina G.",
    date: "15 de marzo de 2024",
    rating: 5,
    text: "¡Excelente calidad! La tela es muy suave y el tallaje es perfecto. Queda hermosa, la recomiendo totalmente. El envío fue super rápido.",
  },
  {
    id: "r2",
    name: "María Fernanda R.",
    date: "28 de febrero de 2024",
    rating: 4,
    text: "Muy bonita y buena calidad. El único detalle es que la talla M me quedó un poco ajustada, recomiendo pedir una talla más de lo normal. De resto todo perfecto.",
  },
  {
    id: "r3",
    name: "Laura Patricia M.",
    date: "10 de febrero de 2024",
    rating: 5,
    text: "Amé el diseño y la confección. Se nota que es de buena calidad colombiana. Ya pedí otro color. El precio está muy bien para lo que ofrecen.",
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const product = getProductById(id);
  const relatedProducts = product
    ? getRelatedProducts(product.id, product.categorySlug)
    : [];

  const addItem = useCartStore((s) => s.addItem);
  const items = useCartStore((s) => s.items);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  // Product not found
  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <div className="rounded-full bg-muted p-6">
          <Package className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          Producto no encontrado
        </h1>
        <p className="text-muted-foreground">
          El producto que buscas no existe o fue removido.
        </p>
        <Button asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Volver al inicio
          </Link>
        </Button>
      </div>
    );
  }

  const images = product.images.length > 0 ? product.images : [product.image];
  const isInCart = items.some(
    (i) => i.productId === product.id && i.size === selectedSize
  );

  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : product.dealDiscount || 0;

  function handleAddToCart() {
    if (!selectedSize) return;
    for (let i = 0; i < quantity; i++) {
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: selectedSize,
      });
    }
  }

  return (
    <div className="flex flex-col">
      {/* Breadcrumbs */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: product.category, href: `/categoria/${product.categorySlug}` },
            { label: product.name },
          ]}
        />
      </div>

      {/* Product Main Section */}
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* ── Left Column: Images + Title ── */}
          <div className="flex-1">
            {/* Image gallery */}
            <div className="space-y-3">
              {/* Main image */}
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="relative aspect-square w-full overflow-hidden rounded-lg border bg-muted"
              >
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                  priority
                />
                {product.isDeal && (
                  <Badge className="absolute left-3 top-3 bg-orange-500 text-base font-bold text-white hover:bg-orange-600">
                    OFERTA -{discountPercent}%
                  </Badge>
                )}
              </motion.div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border-2 transition-colors ${
                        selectedImage === i
                          ? "border-primary"
                          : "border-transparent hover:border-muted-foreground/30"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} - imagen ${i + 1}`}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Title + Rating */}
            <div className="mt-4 space-y-2">
              <h1 className="text-2xl font-bold text-foreground lg:text-3xl">
                {product.name}
              </h1>

              <div className="flex items-center gap-3">
                <StarRating rating={product.rating} size="md" showValue />
                <span className="text-sm text-muted-foreground">
                  {product.reviewCount.toLocaleString("es-CO")} calificaciones
                </span>
                <Separator orientation="vertical" className="h-4" />
                <button className="text-sm text-primary hover:underline">
                  Calificaciones
                </button>
              </div>
            </div>
          </div>

          {/* ── Right Column: Purchase Box ── */}
          <div className="w-full lg:w-[380px] lg:flex-shrink-0">
            <div className="sticky top-24 space-y-4 rounded-lg border bg-card p-5 shadow-sm">
              {/* Price */}
              <div className="space-y-1">
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground line-through">
                      Antes: {formatPrice(product.originalPrice)}
                    </span>
                    <Badge variant="destructive" className="text-xs">
                      -{discountPercent}%
                    </Badge>
                  </div>
                )}
                <p className="text-3xl font-extrabold text-foreground">
                  {formatPrice(product.price)}
                </p>
                {product.priceMayorista && (
                  <p className="text-xs text-muted-foreground">
                    Precio mayorista: {formatPrice(product.priceMayorista)} (6+ unidades)
                  </p>
                )}
              </div>

              {/* Deal badge */}
              {product.isDeal && (
                <Badge className="bg-orange-500 text-sm font-bold text-white hover:bg-orange-600">
                  OFERTA DEL DÍA
                </Badge>
              )}

              {/* Prime badge */}
              {product.isPrime && (
                <Badge
                  variant="outline"
                  className="border-pink-400 bg-pink-50 font-semibold text-pink-600 dark:border-pink-500/50 dark:bg-pink-950 dark:text-pink-400"
                >
                  <span className="mr-1 inline-block h-2 w-2 rounded-full bg-pink-500" />
                  Prime
                </Badge>
              )}

              <Separator />

              {/* Shipping */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <Truck className="h-4 w-4" />
                  <span className="text-sm font-semibold">
                    Envío GRATIS a Chinchiná
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Envío a todo Colombia. Entrega estimada: 3-5 días hábiles.
                </p>
              </div>

              <Separator />

              {/* Size selector */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold">Talla</Label>
                  {!selectedSize && (
                    <span className="text-xs text-rose-500">
                      Selecciona una talla
                    </span>
                  )}
                </div>
                <RadioGroup
                  value={selectedSize}
                  onValueChange={setSelectedSize}
                  className="flex flex-wrap gap-2"
                >
                  {product.sizes.map((size) => (
                    <div key={size}>
                      <RadioGroupItem
                        value={size}
                        id={`size-${size}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`size-${size}`}
                        className="flex h-10 min-w-[48px] cursor-pointer items-center justify-center rounded-md border px-4 text-sm font-semibold transition-colors peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground hover:bg-muted"
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Cantidad</Label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center overflow-hidden rounded-md border">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-none"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="flex h-9 w-12 items-center justify-center border-x text-sm font-semibold">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-none"
                      onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                      disabled={quantity >= 10}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Disponible ({product.stockCount} en stock)
                  </span>
                </div>
              </div>

              {/* Add to Cart */}
              <Button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`w-full gap-2 py-6 text-base font-bold ${
                  isInCart
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-rose-500 hover:bg-rose-600"
                }`}
              >
                <ShoppingCart className="h-5 w-5" />
                {isInCart ? "Actualizar carrito" : "Agregar al carrito"}
              </Button>
              {!selectedSize && (
                <p className="text-center text-xs text-rose-500">
                  Por favor selecciona una talla
                </p>
              )}

              {/* Buy Now */}
              <Button
                asChild
                variant="outline"
                className="w-full gap-2 border-orange-400 bg-orange-50 py-6 text-base font-bold text-orange-600 hover:bg-orange-100 hover:text-orange-700 dark:border-orange-500/50 dark:bg-orange-950 dark:text-orange-400 dark:hover:bg-orange-900"
                disabled={!selectedSize}
              >
                <Link href="/checkout?buyNow=true">
                  Comprar ahora
                </Link>
              </Button>

              <Separator />

              {/* Extra links */}
              <div className="space-y-2">
                <Link
                  href="/mayorista"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Store className="h-4 w-4" />
                  Vender en Miss Semi Fashion
                </Link>
                <button className="flex items-center gap-2 text-sm text-primary hover:underline">
                  <Heart className="h-4 w-4" />
                  Agregar a Lista de Deseos
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tabs Section ── */}
        <div className="mt-10">
          <Tabs defaultValue="descripcion" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="descripcion">Descripción</TabsTrigger>
              <TabsTrigger value="opiniones">
                Opiniones de clientes ({product.reviewCount})
              </TabsTrigger>
              <TabsTrigger value="info">Información adicional</TabsTrigger>
            </TabsList>

            {/* Description */}
            <TabsContent value="descripcion" className="mt-4">
              <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>{product.shortDescription}</p>
                <p>{product.description}</p>
                {product.fabric && (
                  <div className="rounded-lg border bg-muted/50 p-4">
                    <h4 className="mb-2 font-semibold text-foreground">
                      🧵 Detalles de tela
                    </h4>
                    <p>{product.fabric}</p>
                  </div>
                )}
                <div className="rounded-lg border bg-muted/50 p-4">
                  <h4 className="mb-2 font-semibold text-foreground">
                    🧺 Instrucciones de cuidado
                  </h4>
                  <ul className="list-disc space-y-1 pl-5">
                    <li>Lavar a mano o en máquina en ciclo suave</li>
                    <li>No usar blanqueador</li>
                    <li>Secar a la sombra</li>
                    <li>Plancha a temperatura baja si es necesario</li>
                    <li>No retorcer ni exprimir</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            {/* Reviews */}
            <TabsContent value="opiniones" className="mt-4">
              <div className="max-w-3xl space-y-6">
                {/* Rating summary */}
                <div className="flex items-center gap-4 rounded-lg border bg-muted/30 p-4">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-foreground">
                      {product.rating}
                    </p>
                    <StarRating rating={product.rating} size="sm" />
                    <p className="mt-1 text-xs text-muted-foreground">
                      {product.reviewCount} calificaciones
                    </p>
                  </div>
                  <Separator orientation="vertical" className="h-16" />
                  <div className="flex-1 space-y-1">
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const percent =
                        stars === 5
                          ? 65
                          : stars === 4
                            ? 22
                            : stars === 3
                              ? 8
                              : stars === 2
                                ? 3
                                : 2;
                      return (
                        <div key={stars} className="flex items-center gap-2">
                          <span className="w-8 text-right text-xs text-muted-foreground">
                            {stars}★
                          </span>
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-yellow-400"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          <span className="w-8 text-xs text-muted-foreground">
                            {percent}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Individual reviews */}
                {MOCK_REVIEWS.map((review) => (
                  <div
                    key={review.id}
                    className="space-y-2 rounded-lg border p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {review.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {review.date}
                          </p>
                        </div>
                      </div>
                      <StarRating rating={review.rating} size="sm" />
                    </div>
                    <p className="text-sm text-muted-foreground">{review.text}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Additional Info */}
            <TabsContent value="info" className="mt-4">
              <div className="max-w-3xl">
                <div className="overflow-hidden rounded-lg border">
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b bg-muted/30">
                        <td className="px-4 py-3 font-semibold text-foreground">
                          Tela / Fabric
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {product.fabric}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-3 font-semibold text-foreground">
                          Tallas disponibles
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {product.sizes.join(", ")}
                        </td>
                      </tr>
                      <tr className="border-b bg-muted/30">
                        <td className="px-4 py-3 font-semibold text-foreground">
                          Tipo
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {product.subcategory}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-3 font-semibold text-foreground">
                          Categoría
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {product.category}
                        </td>
                      </tr>
                      <tr className="border-b bg-muted/30">
                        <td className="px-4 py-3 font-semibold text-foreground">
                          Colores
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {product.colors.join(", ")}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-3 font-semibold text-foreground">
                          Garantía
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          30 días por defectos de fabricación
                        </td>
                      </tr>
                      <tr className="bg-muted/30">
                        <td className="px-4 py-3 font-semibold text-foreground">
                          Envío
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          Envío GRATIS a todo Colombia. Entrega: 3-5 días hábiles.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* ── Related Products ── */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <ProductGrid
              products={relatedProducts}
              title="Productos relacionados"
            />
          </div>
        )}

        {/* Bottom spacer */}
        <div className="h-8" />
      </div>
    </div>
  );
}
