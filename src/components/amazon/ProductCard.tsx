"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Check, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import StarRating from "./StarRating";

interface ProductCardProps {
  product: {
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
  };
}

function formatPrice(price: number): string {
  return `$${price.toLocaleString("es-CO")}`;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);
  const { toggleItem, items: wishlistItems } = useWishlistStore();

  // Check if product is already in cart
  const isInCart = items.some((item) => item.productId === product.id);

  // Check if product is in wishlist
  const isInWishlist = wishlistItems.some(
    (item) => item.productId === product.id
  );

  function handleAddToCart() {
    const size =
      product.sizes && product.sizes.length > 0 ? product.sizes[0] : "U";
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size,
    });
    toast.success(`${product.name} agregado al carrito`);
  }

  function handleToggleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggleItem({
      productId: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
    });
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-lg">
      {/* ── Badges ── */}
      <div className="relative">
        {product.isDeal && product.dealDiscount && (
          <Badge className="absolute left-2 top-2 z-10 bg-orange-500 text-white hover:bg-orange-600">
            OFERTA -{product.dealDiscount}%
          </Badge>
        )}
        {!product.isDeal && product.isBestSeller && (
          <Badge
            variant="secondary"
            className="absolute left-2 top-2 z-10 bg-blue-600 text-white hover:bg-blue-700"
          >
            Mas vendido
          </Badge>
        )}

        {/* ── Wishlist Heart Button ── */}
        <button
          onClick={handleToggleWishlist}
          className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-colors hover:bg-white"
          aria-label={
            isInWishlist
              ? "Quitar de lista de deseos"
              : "Agregar a lista de deseos"
          }
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              isInWishlist
                ? "fill-red-500 text-red-500"
                : "text-muted-foreground hover:text-primary"
            )}
          />
        </button>

        {/* ── Image ── */}
        <Link
          href={`/producto/${product.id}`}
          className="block aspect-[4/3] overflow-hidden bg-muted"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>

      {/* ── Info ── */}
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        {/* Title */}
        <Link
          href={`/producto/${product.id}`}
          className="line-clamp-2 text-sm leading-snug text-foreground transition-colors hover:text-primary hover:underline"
        >
          {product.name}
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <StarRating rating={product.rating} size="sm" />
          <span className="text-xs text-muted-foreground">
            {product.reviewCount.toLocaleString("es-CO")} calificaciones
          </span>
        </div>

        {/* Price */}
        <div className="flex flex-col gap-0.5">
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-muted-foreground line-through">
              Precio Antes: {formatPrice(product.originalPrice)}
            </span>
          )}
          <span className="text-lg font-bold text-foreground">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Prime badge */}
        {product.isPrime && (
          <Badge
            variant="outline"
            className="w-fit border-primary/40 bg-primary/5 text-[11px] font-semibold text-primary"
          >
            <span className="mr-1 inline-block h-2 w-2 rounded-full bg-primary" />
            Prime
          </Badge>
        )}

        {/* Shipping */}
        <span className="text-xs text-green-600 dark:text-green-400">
          Envio GRATIS
        </span>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Add to cart */}
        <Button
          onClick={handleAddToCart}
          variant={isInCart ? "outline" : "default"}
          className={cn(
            "mt-2 w-full gap-2 font-semibold transition-colors",
            isInCart
              ? "border-green-500 text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950"
              : "bg-amber-500 text-white hover:bg-amber-600"
          )}
        >
          {isInCart ? (
            <>
              <Check className="h-4 w-4" />
              En el carrito
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              Agregar al carrito
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
