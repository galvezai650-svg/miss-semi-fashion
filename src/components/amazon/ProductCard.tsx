"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Check, Heart, Eye, Truck } from "lucide-react";
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

  const isInCart = items.some((item) => item.productId === product.id);
  const isInWishlist = wishlistItems.some(
    (item) => item.productId === product.id
  );

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
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
    toast.success(
      isInWishlist
        ? "Eliminado de lista de deseos"
        : "Agregado a lista de deseos"
    );
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
      {/* ── Image Container ── */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <Link href={`/producto/${product.id}`} className="block h-full w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="card-image-zoom object-cover group-hover:scale-110"
          />
        </Link>

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* ── Badges ── */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
          {product.isDeal && product.dealDiscount && (
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25 border-0 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide">
              -{product.dealDiscount}%
            </Badge>
          )}
          {!product.isDeal && product.isBestSeller && (
            <Badge className="bg-gradient-to-r from-amber-500 to-yellow-400 text-foreground shadow-lg shadow-amber-500/25 border-0 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide">
              Top
            </Badge>
          )}
        </div>

        {/* ── Action Buttons (show on hover) ── */}
        <div className="absolute right-3 top-3 z-10 flex flex-col gap-2 opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
          <button
            onClick={handleToggleWishlist}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-110",
              isInWishlist
                ? "bg-red-500/90 text-white hover:bg-red-600"
                : "bg-black/70 text-white hover:bg-black/90"
            )}
            aria-label={
              isInWishlist
                ? "Quitar de lista de deseos"
                : "Agregar a lista de deseos"
            }
          >
            <Heart
              className={cn(
                "h-4 w-4",
                isInWishlist && "fill-current"
              )}
            />
          </button>
          <Link
            href={`/producto/${product.id}`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/70 shadow-lg backdrop-blur-md text-white transition-all duration-200 hover:scale-110 hover:bg-black/90"
            aria-label="Ver producto"
          >
            <Eye className="h-4 w-4" />
          </Link>
        </div>

        {/* ── Quick Add to Cart (bottom of image on hover) ── */}
        <div className="absolute bottom-3 left-3 right-3 z-10 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Button
            onClick={handleAddToCart}
            className={cn(
              "w-full gap-2 rounded-xl font-semibold shadow-lg backdrop-blur-sm transition-all duration-200",
              isInCart
                ? "bg-green-500 text-white hover:bg-green-600 shadow-green-500/25"
                : "bg-black/80 text-white hover:bg-black/95"
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
                Agregar
              </>
            )}
          </Button>
        </div>
      </div>

      {/* ── Info Section ── */}
      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        {/* Rating & Reviews */}
        <div className="flex items-center gap-1.5">
          <StarRating rating={product.rating} size="sm" />
          <span className="text-[11px] text-muted-foreground">
            ({product.reviewCount.toLocaleString("es-CO")})
          </span>
        </div>

        {/* Title */}
        <Link
          href={`/producto/${product.id}`}
          className="line-clamp-2 text-sm font-medium leading-snug text-foreground transition-colors hover:text-primary"
        >
          {product.name}
        </Link>

        {/* Price Block */}
        <div className="mt-auto flex items-end gap-2 pt-1">
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          <span className="text-xl font-bold text-foreground">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Shipping & Prime */}
        <div className="flex items-center gap-2 pt-0.5">
          {product.isPrime && (
            <Badge
              variant="outline"
              className="h-5 border-primary/30 bg-primary/5 px-1.5 text-[10px] font-semibold text-primary"
            >
              <span className="mr-0.5 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              Prime
            </Badge>
          )}
          <span className="flex items-center gap-1 text-[11px] text-green-400">
            <Truck className="h-3 w-3" />
            Envío gratis
          </span>
        </div>
      </div>
    </div>
  );
}
