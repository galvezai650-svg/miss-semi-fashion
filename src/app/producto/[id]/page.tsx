"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  ShoppingCart,
  Heart,
  Minus,
  Plus,
  Truck,
  Star,
  Home,
  Store,
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
import { useWishlistStore } from "@/stores/wishlist-store";
import type { Product } from "@/data/products";

function formatPrice(price: number): string {
  return `$${price.toLocaleString("es-CO")}`;
}

/* ─── Animation helpers ─── */
const smoothEase = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: smoothEase,
    },
  }),
};

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
  const router = useRouter();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  // Fetch product data — also refetches when tab becomes visible
  const fetchProduct = () => {
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.product) setProduct(data.product);
        if (data.related) setRelatedProducts(data.related);
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        fetchProduct();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [id]);

  const addItem = useCartStore((s) => s.addItem);
  const items = useCartStore((s) => s.items);
  const wishlistAddItem = useWishlistStore((s) => s.addItem);
  const wishlistRemoveItem = useWishlistStore((s) => s.removeItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product?.id || ""));

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("descripcion");

  // Product not found or loading
  if (!product) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="rounded-full bg-muted p-6"
        >
          <Package className="h-10 w-10 text-muted-foreground" />
        </motion.div>
        <h1 className="text-2xl font-bold text-foreground">
          Cargando producto...
        </h1>
      </motion.div>
    );
  }

  const images = product.images.length > 0 ? product.images : [product.image];
  const inCart = items.some(
    (i) => i.productId === product.id && i.size === selectedSize
  );

  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : product.dealDiscount || 0;

  function handleAddToCart() {
    if (!selectedSize) {
      toast.error("Por favor selecciona una talla");
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: selectedSize,
      });
    }
    toast.success("Producto agregado al carrito");
  }

  function handleBuyNow() {
    if (!selectedSize) {
      toast.error("Por favor selecciona una talla");
      return;
    }
    addItem({
      productId: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      size: selectedSize,
    });
    router.push("/checkout?buyNow=true");
  }

  function handleToggleWishlist() {
    if (isInWishlist) {
      wishlistRemoveItem(product.id);
      toast.success("Eliminado de tu lista de deseos");
    } else {
      wishlistAddItem({
        productId: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        addedAt: new Date().toISOString(),
      });
      toast.success("Agregado a tu lista de deseos");
    }
  }

  function handleCalificaciones() {
    setActiveTab("opiniones");
    setTimeout(() => {
      document.getElementById("product-tabs")?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: smoothEase }}
      className="flex flex-col"
    >
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
          <motion.div
            initial="hidden"
            animate="visible"
            className="w-full lg:w-[460px] lg:flex-shrink-0"
          >
            {/* Image gallery */}
            <div className="space-y-4">
              {/* Main image */}
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: smoothEase }}
                className="relative mx-auto aspect-[3/4] w-full max-w-[420px] overflow-hidden rounded-xl border border-[#2A2A2A] bg-[#111111]"
              >
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 90vw, 420px"
                  quality={100}
                  className="object-contain"
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
                <motion.div
                  variants={fadeUp}
                  custom={0.2}
                  className="flex gap-3 overflow-x-auto pb-1 scrollbar-none"
                >
                  {images.map((img, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedImage(i)}
                      className={`relative h-[72px] w-[72px] flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-300 sm:h-[76px] sm:w-[76px] ${
                        selectedImage === i
                          ? "border-[#C6A962] ring-1 ring-[#C6A962]/30"
                          : "border-[#2A2A2A] hover:border-[#C6A962]/40"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} - imagen ${i + 1}`}
                        fill
                        sizes="90px"
                        quality={100}
                        className="object-contain"
                      />
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Product Title + Rating */}
            <motion.div variants={fadeUp} custom={0.3} className="mt-4 space-y-2">
              <h1 className="text-2xl font-bold text-foreground lg:text-3xl">
                {product.name}
              </h1>

              <div className="flex items-center gap-3">
                <StarRating rating={product.rating} size="md" showValue />
                <span className="text-sm text-muted-foreground">
                  {product.reviewCount.toLocaleString("es-CO")} calificaciones
                </span>
                <Separator orientation="vertical" className="h-4" />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCalificaciones}
                  className="text-sm text-primary hover:underline"
                >
                  Calificaciones
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right Column: Purchase Box ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: smoothEase }}
            className="w-full lg:w-[380px] lg:flex-shrink-0"
          >
            <div className="sticky top-24 space-y-4 rounded-lg border bg-card p-5 shadow-sm">
              {/* Price */}
              <div className="space-y-1">
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground line-through">
                      Antes: {formatPrice(product.originalPrice)}
                    </span>
                    <Badge variant="destructive" className="badge-soft text-xs">
                      -{discountPercent}%
                    </Badge>
                  </div>
                )}
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-3xl font-extrabold text-foreground"
                >
                  {formatPrice(product.price)}
                </motion.p>
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
                  className="border-pink-500/50 bg-pink-950 font-semibold text-pink-400"
                >
                  <span className="mr-1 inline-block h-2 w-2 rounded-full bg-pink-500" />
                  Prime
                </Badge>
              )}

              <Separator />

              {/* Shipping */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-green-400">
                  <motion.div animate={{ y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
                    <Truck className="h-4 w-4" />
                  </motion.div>
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
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-rose-500"
                    >
                      Selecciona una talla
                    </motion.span>
                  )}
                </div>
                <RadioGroup
                  value={selectedSize}
                  onValueChange={setSelectedSize}
                  className="flex flex-wrap gap-2"
                >
                  {product.sizes.map((size, idx) => (
                    <motion.div
                      key={size}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.05 * idx }}
                    >
                      <RadioGroupItem
                        value={size}
                        id={`size-${size}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`size-${size}`}
                        className="flex h-10 min-w-[48px] cursor-pointer items-center justify-center rounded-md border px-4 text-sm font-semibold transition-all duration-300 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground hover:bg-muted"
                      >
                        {size}
                      </Label>
                    </motion.div>
                  ))}
                </RadioGroup>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Cantidad</Label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center overflow-hidden rounded-md border">
                    <motion.div whileTap={{ scale: 0.9 }}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-none"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </motion.div>
                    <motion.span
                      key={quantity}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className="flex h-9 w-12 items-center justify-center border-x text-sm font-semibold"
                    >
                      {quantity}
                    </motion.span>
                    <motion.div whileTap={{ scale: 0.9 }}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-none"
                        onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                        disabled={quantity >= 10}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Disponible ({product.stockCount} en stock)
                  </span>
                </div>
              </div>

              {/* Add to Cart */}
              <motion.div whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  className={`btn-press w-full gap-2 py-6 text-base font-bold transition-all duration-300 ${
                    inCart
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-rose-500 hover:bg-rose-600"
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {inCart ? "Actualizar carrito" : "Agregar al carrito"}
                </Button>
              </motion.div>
              {!selectedSize && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-xs text-rose-500"
                >
                  Por favor selecciona una talla
                </motion.p>
              )}

              {/* Buy Now */}
              <motion.div whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  className="btn-press w-full gap-2 border-orange-500/50 bg-orange-950 py-6 text-base font-bold text-orange-400 hover:bg-orange-900 hover:text-orange-300"
                  disabled={!selectedSize}
                  onClick={handleBuyNow}
                >
                  Comprar ahora
                </Button>
              </motion.div>

              <Separator />

              {/* Extra links */}
              <div className="space-y-2">
                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <Link
                    href="/vender"
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <Store className="h-4 w-4" />
                    Vender en Miss Semi Fashion
                  </Link>
                </motion.div>
                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <button
                    onClick={handleToggleWishlist}
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <motion.div
                      animate={isInWishlist ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      <Heart
                        className={`h-4 w-4 transition-all duration-300 ${
                          isInWishlist ? "fill-red-500 text-red-500" : ""
                        }`}
                      />
                    </motion.div>
                    {isInWishlist
                      ? "En tu Lista de Deseos"
                      : "Agregar a Lista de Deseos"}
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Tabs Section ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: smoothEase }}
          className="mt-10"
          id="product-tabs"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="descripcion">Descripción</TabsTrigger>
              <TabsTrigger value="opiniones">
                Opiniones de clientes ({product.reviewCount})
              </TabsTrigger>
              <TabsTrigger value="info">Información adicional</TabsTrigger>
            </TabsList>

            {/* Description */}
            <TabsContent value="descripcion" className="mt-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground"
              >
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
              </motion.div>
            </TabsContent>

            {/* Reviews */}
            <TabsContent value="opiniones" className="mt-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-3xl space-y-6"
              >
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
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${percent}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: (5 - stars) * 0.1, ease: smoothEase }}
                              className="h-full rounded-full bg-yellow-400"
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
                {MOCK_REVIEWS.map((review, idx) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1, ease: smoothEase }}
                    className="space-y-2 rounded-lg border p-4 transition-colors duration-300 hover:border-[#C6A962]/20"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: idx * 0.1 + 0.2, type: "spring" }}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
                        >
                          {review.name.charAt(0)}
                        </motion.div>
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
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            {/* Additional Info */}
            <TabsContent value="info" className="mt-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-3xl"
              >
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
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* ── Related Products ── */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: smoothEase }}
            className="mt-12"
          >
            <ProductGrid
              products={relatedProducts}
              title="Productos relacionados"
              variant="grid"
            />
          </motion.div>
        )}

        {/* Bottom spacer */}
        <div className="h-8" />
      </div>
    </motion.div>
  );
}
