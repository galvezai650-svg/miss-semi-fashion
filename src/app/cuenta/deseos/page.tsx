"use client";

import { motion } from "framer-motion";
import { Heart, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/amazon/Breadcrumbs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { useWishlistStore, type WishlistItem } from "@/stores/wishlist-store";
import { useCartStore } from "@/stores/cart-store";
import Link from "next/link";
import { toast } from "sonner";

export default function DeseosPage() {
  const { items, removeItem } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);

  function handleAddToCart(item: WishlistItem) {
    addItem({
      productId: item.productId,
      name: item.name,
      image: item.image,
      price: item.price,
      size: "M",
    });
    toast.success("Producto agregado al carrito");
  }

  function handleRemove(productId: string) {
    removeItem(productId);
    toast.success("Producto eliminado de la lista");
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <Breadcrumbs
            items={[{ label: "Inicio", href: "/" }, { label: "Lista de Deseos" }]}
          />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-3"
        >
          <Heart className="h-7 w-7 text-pink-500" />
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Tu Lista de Deseos
          </h1>
          {items.length > 0 && (
            <span className="ml-2 rounded-full bg-orange-100 px-3 py-0.5 text-sm font-medium text-orange-700">
              {items.length} {items.length === 1 ? "producto" : "productos"}
            </span>
          )}
        </motion.div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item, index) => (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              >
                <Card className="group overflow-hidden">
                  <CardContent className="p-0">
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <p className="mb-1 truncate text-sm font-medium text-foreground">
                        {item.name}
                      </p>
                      <p className="mb-1 text-lg font-bold text-orange-600">
                        ${item.price.toLocaleString("es-CO")}
                      </p>
                      <p className="mb-3 text-xs text-muted-foreground">
                        Agregado:{" "}
                        {new Date(item.addedAt).toLocaleDateString("es-CO", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-orange-500 hover:bg-orange-600"
                          onClick={() => handleAddToCart(item)}
                        >
                          <ShoppingCart className="mr-1 h-3.5 w-3.5" />
                          Agregar al carrito
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemove(item.productId)}
                          className="border-red-200 text-red-600 hover:bg-red-500/10 hover:text-red-700"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-16 text-center"
          >
            <Heart className="mx-auto mb-4 h-16 w-16 text-muted-foreground/50" />
            <h2 className="mb-2 text-xl font-semibold text-foreground">
              Tu lista de deseos esta vacia
            </h2>
            <p className="mb-6 text-muted-foreground">
              Explora nuestros productos y guarda tus favoritos aqui.
            </p>
            <Link href="/">
              <Button className="bg-orange-500 hover:bg-orange-600">
                Explorar productos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
