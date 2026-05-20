"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cart-store";
import { useAuthStore } from "@/stores/auth-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Search,
  ShoppingCart,
  User,
  Package,
  Heart,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Hombre", href: "/hombre" },
  { label: "Lencería", href: "/lenceria" },
  { label: "Niños", href: "/ninos" },
  { label: "Adornos", href: "/adornos" },
  { label: "Hogar", href: "/hogar" },
];

export default function AmazonNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { items } = useCartStore();
  const { currentUser: user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  }

  function handleMobileSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (mobileSearchQuery.trim()) {
      router.push(
        `/buscar?q=${encodeURIComponent(mobileSearchQuery.trim())}`
      );
      setMobileMenuOpen(false);
    }
  }

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E8E5DE] bg-white/95 backdrop-blur-md">
      {/* ── Top Bar ── */}
      <div className="hidden border-b border-[#F0EDE8] bg-[#FAFAF8] lg:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-6">
          <p className="text-[11px] tracking-[0.15em] text-[#999] uppercase">
            Envío gratis en compras superiores a $50.000 COP
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/cuenta"
              className="text-[11px] tracking-[0.1em] text-[#666] transition-colors hover:text-[#C6A962] uppercase"
            >
              Mi Cuenta
            </Link>
            <Link
              href="/pedidos"
              className="text-[11px] tracking-[0.1em] text-[#666] transition-colors hover:text-[#C6A962] uppercase"
            >
              Mis Pedidos
            </Link>
            <Link
              href="/ayuda"
              className="text-[11px] tracking-[0.1em] text-[#666] transition-colors hover:text-[#C6A962] uppercase"
            >
              Ayuda
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main Nav ── */}
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/images/logo.png"
              alt="Miss Semi Fashion"
              width={160}
              height={48}
              className="h-9 w-auto lg:h-11"
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-[13px] font-medium tracking-[0.08em] uppercase transition-colors",
                  isActive(link.href)
                    ? "text-[#1A1A1A]"
                    : "text-[#666] hover:text-[#1A1A1A]"
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#C6A962]"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search (desktop - icon toggle) */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="hidden h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-[#F5F3EF] lg:flex"
              aria-label="Buscar"
            >
              <Search className="h-[18px] w-[18px] text-[#4A4A4A]" />
            </button>

            {/* Account */}
            <Link
              href="/cuenta"
              className="hidden h-10 items-center gap-2 rounded-full px-3 transition-colors hover:bg-[#F5F3EF] lg:flex"
            >
              <User className="h-[18px] w-[18px] text-[#4A4A4A]" />
              <span className="text-[13px] font-medium text-[#4A4A4A]">
                {user?.name ? user.name.split(" ")[0] : "Cuenta"}
              </span>
            </Link>

            {/* Wishlist */}
            <Link
              href="/cuenta/deseos"
              className="hidden h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-[#F5F3EF] lg:flex"
              aria-label="Lista de deseos"
            >
              <Heart className="h-[18px] w-[18px] text-[#4A4A4A]" />
            </Link>

            {/* Cart */}
            <Link
              href="/carrito"
              className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-[#F5F3EF]"
              aria-label={`Carrito con ${cartCount} artículos`}
            >
              <ShoppingCart className="h-[18px] w-[18px] text-[#4A4A4A]" />
              {cartCount > 0 && (
                <Badge className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-[#C6A962] p-0 text-[10px] font-bold text-white shadow-sm">
                  {cartCount > 99 ? "99+" : cartCount}
                </Badge>
              )}
            </Link>

            {/* Mobile hamburger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full text-[#4A4A4A] hover:bg-[#F5F3EF] lg:hidden"
                  aria-label="Abrir menú"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto p-0 bg-white">
                <SheetTitle className="sr-only">Menú de navegación</SheetTitle>

                {/* Mobile Header */}
                <div className="flex items-center justify-between border-b border-[#E8E5DE] px-6 py-5">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-[#C6A962]" />
                    <span className="text-sm font-medium text-[#1A1A1A]">
                      {user?.name
                        ? user.name.split(" ")[0]
                        : "Iniciar Sesión"}
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[#999] hover:text-[#1A1A1A] transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Mobile Search */}
                <form
                  onSubmit={handleMobileSearch}
                  className="flex gap-2 border-b border-[#E8E5DE] px-6 py-4"
                >
                  <Input
                    type="search"
                    value={mobileSearchQuery}
                    onChange={(e) => setMobileSearchQuery(e.target.value)}
                    placeholder="Buscar productos..."
                    className="flex-1 border-[#E8E5DE] bg-[#FAFAF8] text-sm"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="h-10 w-10 shrink-0 rounded-full bg-[#1A1A1A] hover:bg-[#333]"
                  >
                    <Search className="h-4 w-4 text-white" />
                  </Button>
                </form>

                {/* Mobile Nav links */}
                <nav className="flex flex-col py-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href + link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between px-6 py-3.5 text-sm transition-colors",
                        isActive(link.href)
                          ? "bg-[#F5F3EF] font-semibold text-[#1A1A1A]"
                          : "text-[#4A4A4A] hover:bg-[#FAFAF8]"
                      )}
                    >
                      <span className="tracking-wide uppercase text-[13px]">
                        {link.label}
                      </span>
                      <ChevronDown className="h-3.5 w-3.5 -rotate-90 text-[#C6A962]" />
                    </Link>
                  ))}
                </nav>

                {/* Mobile bottom links */}
                <div className="border-t border-[#E8E5DE] py-2">
                  <Link
                    href="/pedidos"
                    className="flex items-center gap-3 px-6 py-3.5 text-[13px] text-[#666] transition-colors hover:bg-[#FAFAF8]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Package className="h-4 w-4 text-[#C6A962]" />
                    Mis Pedidos
                  </Link>
                  <Link
                    href="/cuenta/deseos"
                    className="flex items-center gap-3 px-6 py-3.5 text-[13px] text-[#666] transition-colors hover:bg-[#FAFAF8]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Heart className="h-4 w-4 text-[#C6A962]" />
                    Lista de Deseos
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* ── Search Overlay (desktop) ── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-[#E8E5DE] bg-white"
          >
            <form
              onSubmit={handleSearch}
              className="mx-auto flex max-w-2xl items-center gap-3 px-6 py-4"
            >
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
                <Input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar en Miss Semi Fashion..."
                  className="h-11 border-[#E8E5DE] bg-[#FAFAF8] pl-11 text-sm placeholder:text-[#AAA]"
                  autoFocus
                />
              </div>
              <Button
                type="submit"
                className="h-11 rounded-full bg-[#1A1A1A] px-6 font-medium text-white hover:bg-[#333]"
              >
                Buscar
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
