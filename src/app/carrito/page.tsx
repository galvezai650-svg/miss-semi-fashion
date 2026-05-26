"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  Bookmark,
  ArrowLeft,
  Tag,
  ShoppingBag,
  Truck,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Breadcrumbs from "@/components/amazon/Breadcrumbs";
import { useCartStore, type CartItem } from "@/stores/cart-store";

type SavedItem = CartItem;

function formatPrice(price: number): string {
  return `$${price.toLocaleString("es-CO")}`;
}

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);
  const totalItems = useCartStore((s) => s.totalItems());
  const totalPrice = useCartStore((s) => s.totalPrice());

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);

  const discount = promoApplied ? totalPrice * 0.1 : 0;
  const finalTotal = totalPrice - discount;

  function handleApplyPromo() {
    if (!promoCode.trim()) {
      setPromoError("Ingresa un codigo promocional");
      return;
    }
    if (promoCode.toUpperCase() === "MISSSEMI10") {
      setPromoApplied(true);
      setPromoError("");
      toast.success("Codigo MISSSEMI10 aplicado! 10% de descuento");
    } else {
      setPromoError("Codigo invalido. Intenta con MISSSEMI10");
      setPromoApplied(false);
    }
  }

  function handleRemoveItem(productId: string, size: string) {
    removeItem(productId, size);
    toast.success("Producto eliminado del carrito");
  }

  function handleUpdateQuantity(productId: string, size: string, newQty: number) {
    if (newQty <= 0) {
      removeItem(productId, size);
      toast.success("Producto eliminado del carrito");
      return;
    }
    updateQuantity(productId, size, newQty);
    toast.success("Cantidad actualizada");
  }

  function handleSaveForLater(item: CartItem) {
    removeItem(item.productId, item.size);
    setSavedItems((prev) => [...prev, item]);
    toast.success("Producto guardado para despues");
  }

  function handleMoveToCart(item: SavedItem) {
    addItem({
      productId: item.productId,
      name: item.name,
      image: item.image,
      price: item.price,
      size: item.size,
    });
    setSavedItems((prev) =>
      prev.filter(
        (s) => !(s.productId === item.productId && s.size === item.size)
      )
    );
    toast.success("Producto movido al carrito");
  }

  // Empty cart (and no saved items)
  if (items.length === 0 && savedItems.length === 0) {
    return (
      <div className="flex flex-col">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Carrito de compras" }]} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4"
        >
          <div className="rounded-full bg-muted p-8">
            <ShoppingCart className="h-16 w-16 text-muted-foreground/50" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">
              Tu carrito esta vacio
            </h1>
            <p className="mt-2 text-muted-foreground">
              Parece que aun no has agregado productos a tu carrito. Explora
              nuestro catalogo y encuentra algo que te encante!
            </p>
          </div>
          <Button asChild size="lg" className="mt-2 gap-2">
            <Link href="/">
              <ShoppingBag className="h-5 w-5" />
              Seguir comprando
            </Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Breadcrumbs */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Carrito de compras" }]} />
      </div>

      {/* Title */}
      <div className="mx-auto w-full max-w-7xl px-4 pb-2 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Tu Carrito de Compras
          {items.length > 0 && (
            <span className="ml-2 text-lg font-normal text-muted-foreground">
              ({totalItems}{" "}
              {totalItems === 1 ? "articulo" : "articulos"})
            </span>
          )}
        </h1>
      </div>

      {/* Main content */}
      <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* ── Left: Cart Items ── */}
          <div className="min-w-0 flex-1 space-y-4">
            {items.length > 0 ? (
              items.map((item, index) => (
                <motion.div
                  key={`${item.productId}-${item.size}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-lg border bg-card p-4 shadow-sm"
                >
                  <div className="flex gap-4 sm:gap-6">
                    {/* Image */}
                    <Link
                      href={`/producto/${item.productId}`}
                      className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-md border bg-muted sm:h-36 sm:w-36"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="144px"
                        quality={100}
                        className="object-cover"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div>
                        <Link
                          href={`/producto/${item.productId}`}
                          className="line-clamp-2 text-base font-semibold text-foreground transition-colors hover:text-primary hover:underline sm:text-lg"
                        >
                          {item.name}
                        </Link>
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            Talla: {item.size}
                          </Badge>
                          {item.price > 0 && (
                            <span className="text-xs text-green-400">
                              <Truck className="mr-1 inline h-3 w-3" />
                              Envio GRATIS
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        {/* Quantity controls */}
                        <div className="flex items-center gap-1">
                          <div className="flex items-center overflow-hidden rounded-md border">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none"
                              onClick={() =>
                                handleUpdateQuantity(
                                  item.productId,
                                  item.size,
                                  item.quantity - 1
                                )
                              }
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="flex h-8 w-10 items-center justify-center border-x text-sm font-semibold">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none"
                              onClick={() =>
                                handleUpdateQuantity(
                                  item.productId,
                                  item.size,
                                  Math.min(10, item.quantity + 1)
                                )
                              }
                              disabled={item.quantity >= 10}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-lg font-bold text-foreground">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-muted-foreground">
                              {formatPrice(item.price)} c/u
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Action links */}
                      <div className="mt-2 flex flex-wrap gap-4">
                        <button
                          onClick={() =>
                            handleRemoveItem(item.productId, item.size)
                          }
                          className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-rose-500"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Eliminar
                        </button>
                        <button
                          onClick={() => handleSaveForLater(item)}
                          className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                        >
                          <Bookmark className="h-3.5 w-3.5" />
                          Guardar para despues
                        </button>
                      </div>
                    </div>
                  </div>

                  {index < items.length - 1 && (
                    <div className="mt-4">
                      <Separator />
                    </div>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="rounded-lg border bg-card p-6 text-center shadow-sm">
                <p className="text-muted-foreground">
                  No hay productos en tu carrito
                </p>
                <Button asChild variant="link" className="mt-2">
                  <Link href="/">Explorar productos</Link>
                </Button>
              </div>
            )}

            {/* Subtotal bar */}
            {items.length > 0 && (
              <div className="flex items-center justify-between rounded-lg border bg-muted/30 px-4 py-3">
                <span className="text-sm text-muted-foreground">
                  Subtotal ({totalItems}{" "}
                  {totalItems === 1 ? "articulo" : "articulos"}):
                </span>
                <span className="text-lg font-bold text-foreground">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            )}

            {/* ── Saved for Later ── */}
            {savedItems.length > 0 && (
              <div className="mt-6">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
                  <Bookmark className="h-5 w-5 text-primary" />
                  Guardados para despues ({savedItems.length})
                </h2>
                <div className="space-y-3">
                  {savedItems.map((item, index) => (
                    <motion.div
                      key={`saved-${item.productId}-${item.size}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="rounded-lg border border-dashed bg-muted/20 p-4"
                    >
                      <div className="flex items-center gap-4">
                        <Link
                          href={`/producto/${item.productId}`}
                          className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border bg-muted"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="80px"
                            quality={100}
                            className="object-cover"
                          />
                        </Link>
                        <div className="min-w-0 flex-1">
                          <Link
                            href={`/producto/${item.productId}`}
                            className="line-clamp-1 text-sm font-semibold text-foreground hover:text-primary hover:underline"
                          >
                            {item.name}
                          </Link>
                          <div className="mt-1 flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              Talla: {item.size}
                            </Badge>
                            <span className="text-sm font-semibold text-foreground">
                              {formatPrice(item.price)}
                            </span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1.5 flex-shrink-0"
                          onClick={() => handleMoveToCart(item)}
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          Mover al carrito
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Right: Order Summary ── */}
          <div className="w-full lg:w-[340px] lg:flex-shrink-0">
            <div className="sticky top-24 space-y-0 rounded-lg border bg-card shadow-sm">
              <div className="p-5">
                <h2 className="text-lg font-bold text-foreground">
                  Resumen del pedido
                </h2>
              </div>

              <Separator />

              <div className="space-y-3 p-5">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Subtotal
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                {/* Shipping */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Envio</span>
                  <span className="text-sm font-semibold text-green-400">
                    GRATIS
                  </span>
                </div>

                {/* Discount */}
                {promoApplied && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-400">
                      Descuento (MISSSEMI10)
                    </span>
                    <span className="text-sm font-semibold text-green-400">
                      -{formatPrice(discount)}
                    </span>
                  </div>
                )}

                <Separator />

                {/* Promo code */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">
                    Codigo promocional
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Ingresa tu codigo"
                        value={promoCode}
                        onChange={(e) => {
                          setPromoCode(e.target.value);
                          setPromoError("");
                        }}
                        disabled={promoApplied}
                        className="pl-9"
                      />
                    </div>
                    {promoApplied ? (
                      <Button
                        variant="outline"
                        className="flex-shrink-0 text-green-600 border-green-300"
                        onClick={() => {
                          setPromoApplied(false);
                          setPromoCode("");
                          toast.success("Codigo promocional removido");
                        }}
                      >
                        Quitar
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={handleApplyPromo}
                        className="flex-shrink-0"
                      >
                        Aplicar
                      </Button>
                    )}
                  </div>
                  {promoApplied && (
                    <p className="text-xs text-green-400">
                      &#10003; Codigo MISSSEMI10 aplicado - 10% de descuento
                    </p>
                  )}
                  {promoError && (
                    <p className="text-xs text-rose-500">{promoError}</p>
                  )}
                </div>

                <Separator />

                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-foreground">
                    Total
                  </span>
                  <span className="text-xl font-extrabold text-foreground">
                    {formatPrice(items.length > 0 ? finalTotal : 0)}
                  </span>
                </div>

                {promoApplied && items.length > 0 && (
                  <p className="text-xs text-green-400">
                    Estás ahorrando {formatPrice(discount)} con tu codigo
                    promocional
                  </p>
                )}

                <p className="text-xs text-muted-foreground">
                  El impuesto se calcula en el checkout.
                </p>

                {/* Checkout button */}
                {items.length > 0 && (
                  <Button asChild className="w-full gap-2 py-6 text-base font-bold">
                    <Link href="/checkout">
                      Proceder al pago
                    </Link>
                  </Button>
                )}

                {/* Keep shopping */}
                <Button
                  asChild
                  variant="ghost"
                  className="w-full text-sm text-muted-foreground"
                >
                  <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Seguir comprando
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="h-8" />
    </div>
  );
}
