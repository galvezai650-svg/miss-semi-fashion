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
    <div className="group relative flex flex-col overflow-hidden bg-[#111111] border border-[#2A2A2A] transition-all duration-500 hover:border-[#C6A962]/30">
      {/* ── Image Container ── */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#151515]">
        <Link href={`/producto/${product.id}`} className="block h-full w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="card-image-zoom object-cover group-hover:scale-105"
          />
        </Link>

        {/* ── Badges ── */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
          {product.isDeal && product.dealDiscount && (
            <Badge className="border-0 bg-[#C6A962] px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-[#0A0A0A] uppercase">
              -{product.dealDiscount}%
            </Badge>
          )}
          {!product.isDeal && product.isBestSeller && (
            <Badge className="border border-[#C6A962]/30 bg-[#111111]/90 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-[#C6A962] uppercase backdrop-blur-sm">
              Best Seller
            </Badge>
          )}
        </div>

        {/* ── Action Buttons (show on hover) ── */}
        <div className="absolute right-3 top-3 z-10 flex flex-col gap-2 opacity-0 translate-x-2 transition-all duration-400 group-hover:opacity-100 group-hover:translate-x-0">
          <button
            onClick={handleToggleWishlist}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full border border-[#333]/80 bg-[#111111]/90 shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-110",
              isInWishlist
                ? "text-[#C6A962] hover:bg-[#C6A962] hover:text-[#0A0A0A]"
                : "text-[#999] hover:bg-[#1A1A1A]"
            )}
            aria-label={
              isInWishlist
                ? "Quitar de lista de deseos"
                : "Agregar a lista de deseos"
            }
          >
            <Heart
              className={cn("h-4 w-4", isInWishlist && "fill-current")}
            />
          </button>
          <Link
            href={`/producto/${product.id}`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#333]/80 bg-[#111111]/90 text-[#999] shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-[#1A1A1A]"
            aria-label="Ver producto"
          >
            <Eye className="h-4 w-4" />
          </Link>
        </div>

        {/* ── Quick Add to Cart (bottom of image on hover) ── */}
        <div className="absolute bottom-0 left-0 right-0 z-10 translate-y-full transition-transform duration-400 group-hover:translate-y-0">
          <div className="bg-gradient-to-t from-black/60 to-transparent p-3 pt-8">
            <Button
              onClick={handleAddToCart}
              className={cn(
                "w-full gap-2 rounded-none border-0 text-[12px] font-medium tracking-wider text-white shadow-lg uppercase transition-all duration-300",
                isInCart
                  ? "bg-[#C6A962] text-[#0A0A0A] hover:bg-[#A68B3C]"
                  : "bg-[#E5E5E5]/90 text-[#0A0A0A] hover:bg-white"
              )}
            >
              {isInCart ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  En el carrito
                </>
              ) : (
                <>
                  <ShoppingCart className="h-3.5 w-3.5" />
                  Agregar al carrito
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* ── Info Section ── */}
      <div className="flex flex-1 flex-col gap-2 border-t border-[#2A2A2A] p-4">
        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <StarRating rating={product.rating} size="sm" />
          <span className="text-[11px] text-[#666]">
            ({product.reviewCount.toLocaleString("es-CO")})
          </span>
        </div>

        {/* Title */}
        <Link
          href={`/producto/${product.id}`}
          className="line-clamp-2 text-[13px] font-normal leading-snug text-[#B3B3B3] transition-colors hover:text-[#E5E5E5]"
        >
          {product.name}
        </Link>

        {/* Price Block */}
        <div className="mt-auto flex items-end gap-2.5 pt-2">
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-[12px] text-[#666] line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          <span className="text-lg font-medium text-[#E5E5E5]">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex items-center gap-2 pt-0.5">
          <span className="flex items-center gap-1 text-[11px] text-[#C6A962]">
            <Truck className="h-3 w-3" />
            Envío gratis
          </span>
        </div>
      </div>
    </div>
  );
}
