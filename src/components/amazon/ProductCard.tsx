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
import { motion } from "framer-motion";
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
  index?: number;
}

function formatPrice(price: number): string {
  return `$${price.toLocaleString("es-CO")}`;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);
  const wishlistAddItem = useWishlistStore((state) => state.addItem);
  const wishlistRemoveItem = useWishlistStore((state) => state.removeItem);
  const wishlistItems = useWishlistStore((state) => state.items);

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
    if (isInWishlist) {
      wishlistRemoveItem(product.id);
      toast.success("Eliminado de lista de deseos");
    } else {
      wishlistAddItem({
        productId: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
      });
      toast.success("Agregado a lista de deseos");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: Math.min(index * 0.06, 0.4),
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      className="group relative flex flex-col overflow-hidden border border-white/10 bg-black/50 backdrop-blur-md card-lift hover:border-[#C6A962]/30"
    >
      {/* ── Image Container ── */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#111111]">
        <Link href={`/producto/${product.id}`} className="block h-full w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            quality={100}
            className="card-image-zoom object-contain group-hover:scale-105"
          />
        </Link>

        {/* ── Badges ── */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
          {product.isDeal && product.dealDiscount && (
            <Badge className="badge-soft border-0 bg-[#C6A962] px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-[#0A0A0A] uppercase">
              -{product.dealDiscount}%
            </Badge>
          )}
          {!product.isDeal && product.isBestSeller && (
            <Badge className="badge-soft border border-[#C6A962]/30 bg-[#111111]/90 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-[#C6A962] uppercase backdrop-blur-sm">
              Best Seller
            </Badge>
          )}
        </div>

        {/* ── Action Buttons (show on hover) ── */}
        <div className="absolute right-3 top-3 z-10 flex flex-col gap-2 opacity-0 translate-x-3 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-hover:translate-x-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            onClick={handleToggleWishlist}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full border border-[#333]/80 bg-[#111111]/90 shadow-sm backdrop-blur-sm transition-colors duration-300",
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
              className={cn(
                "h-4 w-4 transition-transform duration-300",
                isInWishlist && "fill-current scale-110"
              )}
            />
          </motion.button>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
            <Link
              href={`/producto/${product.id}`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#333]/80 bg-[#111111]/90 text-[#999] shadow-sm backdrop-blur-sm transition-colors duration-300 hover:bg-[#1A1A1A]"
              aria-label="Ver producto"
            >
              <Eye className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        {/* ── Quick Add to Cart (bottom of image on hover) ── */}
        <div className="absolute bottom-0 left-0 right-0 z-10 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
          <div className="bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3 pt-10">
            <motion.div whileTap={{ scale: 0.97 }}>
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
            </motion.div>
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
          className="line-clamp-2 text-[13px] font-normal leading-snug text-[#B3B3B3] transition-colors duration-300 hover:text-[#E5E5E5]"
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
    </motion.div>
  );
}
