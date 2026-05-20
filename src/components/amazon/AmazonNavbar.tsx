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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Search,
  ShoppingCart,
  MapPin,
  User,
  Package,
  Heart,
  Menu,
  ChevronDown,
  X,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Todos", href: "/" },
  { label: "Ofertas", href: "/ofertas" },
  { label: "Pijamas", href: "/categoria/pijamas" },
  { label: "Blusas", href: "/categoria/blusas" },
  { label: "Deportivo", href: "/categoria/deportivo" },
  { label: "Pantalones", href: "/categoria/pantalones" },
  { label: "Atención al Cliente", href: "/ayuda" },
  { label: "Lista de Deseos", href: "/cuenta/deseos" },
];

const searchCategories = [
  { value: "all", label: "Todas" },
  { value: "pijamas", label: "Pijamas" },
  { value: "blusas", label: "Blusas" },
  { value: "deportivo", label: "Deportivo" },
  { value: "pantalones", label: "Pantalones" },
  { value: "vestidos", label: "Vestidos" },
  { value: "accesorios", label: "Accesorios" },
];

export default function AmazonNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { items } = useCartStore();
  const { currentUser: user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("all");
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (searchQuery.trim()) {
      const catParam =
        searchCategory && searchCategory !== "all"
          ? `&cat=${encodeURIComponent(searchCategory)}`
          : "";
      router.push(
        `/buscar?q=${encodeURIComponent(searchQuery.trim())}${catParam}`
      );
    }
  }

  function handleMobileSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (mobileSearchQuery.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(mobileSearchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  }

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* ── Top Strip ── */}
      <div className="bg-foreground text-background">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-4">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Miss Semi Fashion"
              width={100}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* Location */}
          <Link
            href="/cuenta/direcciones"
            className="hidden items-center gap-1 text-xs hover:underline lg:flex"
          >
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="leading-tight">
              Envío a{" "}
              <span className="font-bold">Chinchiná, Caldas</span>
            </span>
          </Link>

          {/* Desktop Search */}
          <form
            onSubmit={handleSearch}
            className="mx-2 hidden flex-1 items-center md:flex"
          >
            <Select
              value={searchCategory}
              onValueChange={setSearchCategory}
            >
              <SelectTrigger className="h-10 w-36 shrink-0 rounded-l-lg rounded-r-none border-0 bg-white/10 text-xs text-background backdrop-blur-sm focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {searchCategories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="relative flex-1">
              <Input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Buscar en Miss Semi Fashion..."
                className={cn(
                  "h-10 rounded-none border-0 bg-white/10 text-sm text-background placeholder:text-background/50 backdrop-blur-sm focus-visible:ring-0 transition-colors",
                  searchFocused && "bg-white/15"
                )}
              />
            </div>
            <Button
              type="submit"
              size="icon"
              className="h-10 shrink-0 rounded-r-lg rounded-l-none bg-amber-500 hover:bg-amber-400 transition-colors"
            >
              <Search className="h-5 w-5 text-foreground" />
            </Button>
          </form>

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            {/* Account */}
            <Link
              href="/cuenta"
              className="hidden items-center gap-1 text-xs hover:underline sm:flex"
            >
              <User className="h-5 w-5" />
              <span className="leading-tight">
                Hola,{" "}
                <span className="font-bold">
                  {user?.name ? user.name.split(" ")[0] : "Identifícate"}
                </span>
              </span>
            </Link>

            {/* Orders */}
            <Link
              href="/pedidos"
              className="hidden items-center gap-1 text-xs hover:underline lg:flex"
            >
              <Package className="h-5 w-5" />
              <span className="leading-tight">
                <span className="hidden xl:block">Devoluciones y </span>
                <span className="font-bold">Pedidos</span>
              </span>
            </Link>

            {/* Wishlist (mobile) */}
            <Link
              href="/cuenta/deseos"
              className="text-background hover:text-background/80 sm:hidden transition-colors"
              aria-label="Lista de deseos"
            >
              <Heart className="h-5 w-5" />
            </Link>

            {/* Cart */}
            <Link
              href="/carrito"
              className="relative flex items-center text-background transition-colors hover:text-background/80"
              aria-label={`Carrito con ${cartCount} artículos`}
            >
              <div className="relative">
                <ShoppingCart className="h-7 w-7" />
                {cartCount > 0 && (
                  <Badge className="absolute -right-2.5 -top-2.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 p-0 text-[10px] font-bold text-foreground shadow-sm">
                    {cartCount > 99 ? "99+" : cartCount}
                  </Badge>
                )}
              </div>
              <span className="ml-1 hidden font-bold sm:inline">Carrito</span>
            </Link>

            {/* Mobile hamburger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-background hover:bg-background/10 lg:hidden transition-colors"
                  aria-label="Abrir menú"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto p-0">
                <SheetTitle className="sr-only">Menú de navegación</SheetTitle>

                {/* Mobile Header */}
                <div className="bg-foreground px-5 py-4 text-background">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      <span className="text-sm font-medium">
                        Hola,{" "}
                        <span className="font-bold">
                          {user?.name ? user.name.split(" ")[0] : "Identifícate"}
                        </span>
                      </span>
                    </div>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-background/70 hover:text-background"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Mobile Search */}
                <form
                  onSubmit={handleMobileSearch}
                  className="flex gap-2 border-b px-5 py-3"
                >
                  <Input
                    type="search"
                    value={mobileSearchQuery}
                    onChange={(e) => setMobileSearchQuery(e.target.value)}
                    placeholder="Buscar productos..."
                    className="flex-1 border-muted-foreground/20"
                  />
                  <Button type="submit" size="icon" className="shrink-0 bg-primary hover:bg-primary/90">
                    <Search className="h-4 w-4" />
                  </Button>
                </form>

                {/* Mobile Location */}
                <Link
                  href="/cuenta/direcciones"
                  className="flex items-center gap-2 border-b px-5 py-3 text-sm transition-colors hover:bg-muted/50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>
                    Envío a <span className="font-bold">Chinchiná, Caldas</span>
                  </span>
                </Link>

                {/* Mobile Nav links */}
                <nav className="flex flex-col px-2 py-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href + link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted",
                        isActive(link.href) && "bg-primary/10 font-semibold text-primary"
                      )}
                    >
                      {link.label === "Todos" && (
                        <Menu className="h-4 w-4" />
                      )}
                      {link.label === "Lista de Deseos" && (
                        <ChevronDown className="h-4 w-4" />
                      )}
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {/* Mobile bottom links */}
                <div className="border-t px-2 py-2">
                  <Link
                    href="/pedidos"
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Package className="h-4 w-4" />
                    Devoluciones y Pedidos
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* ── Secondary Nav ── */}
      <nav className="bg-primary text-primary-foreground">
        <div className="mx-auto flex h-10 max-w-7xl items-center gap-0.5 overflow-x-auto px-4 scrollbar-none">
          {navLinks.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className={cn(
                "flex shrink-0 items-center gap-1 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                isActive(link.href)
                  ? "bg-primary-foreground/20 font-bold shadow-sm"
                  : "hover:bg-primary-foreground/10"
              )}
            >
              {link.label === "Todos" && <Menu className="h-3.5 w-3.5" />}
              {link.label === "Lista de Deseos" && (
                <ChevronDown className="h-3.5 w-3.5" />
              )}
              {link.label}
            </Link>
          ))}
          <span className="ml-auto shrink-0 pl-3 text-xs font-medium text-primary-foreground/70">
            Miss Semi Fashion
          </span>
        </div>
      </nav>
    </header>
  );
}
