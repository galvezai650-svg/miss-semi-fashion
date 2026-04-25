"use client";

import { useState, useCallback } from "react";
import Header from "@/components/miss-semi/Header";
import HeroSection from "@/components/miss-semi/HeroSection";
import AboutSection from "@/components/miss-semi/AboutSection";
import ProductsSection from "@/components/miss-semi/ProductsSection";
import WholesaleSection from "@/components/miss-semi/WholesaleSection";
import ContactSection from "@/components/miss-semi/ContactSection";
import Footer from "@/components/miss-semi/Footer";
import WhatsAppButton from "@/components/miss-semi/WhatsAppButton";
import CartDrawer, { type CartItem } from "@/components/miss-semi/CartDrawer";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

interface Product {
  id: number;
  name: string;
  image: string;
  priceDetal: string;
  sizes: string[];
}

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = useCallback((product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.priceDetal,
          size: product.sizes[0],
          quantity: 1,
        },
      ];
    });
    toast.success(`${product.name} agregado al carrito`);
  }, []);

  const updateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />

      {/* Main Content */}
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ProductsSection onAddToCart={addToCart} />
        <WholesaleSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp */}
      <WhatsAppButton />

      {/* Cart Drawer */}
      <CartDrawer
        open={cartOpen}
        onOpenChange={setCartOpen}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "12px",
          },
        }}
      />
    </div>
  );
}
