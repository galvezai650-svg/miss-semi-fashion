"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cart-store";
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
import { useTheme } from "next-themes";
import {
  Search,
  ShoppingCart,
  MapPin,
  User,
  Package,
  Heart,
  Menu,
  ChevronDown,
  Sun,
  Moon,
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
  { label: "Atencion al Cliente", href: "/ayuda" },
  { label: "Lista de Deseos", href: "/cuenta/deseos" },
];

const searchCategories = [
  { value: "all", label: "Todas las categorias" },
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
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("all");
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      {/* ── Top Strip (dark) ── */}
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
              Envio a{" "}
              <span className="font-bold">Chinchina, Caldas</span>
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
              <SelectTrigger className="h-10 w-44 shrink-0 rounded-r-none border-0 bg-white/10 text-xs text-background backdrop-blur-sm focus:ring-0">
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
            <Input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar en Miss Semi Fashion..."
              className="h-10 flex-1 rounded-none border-0 bg-white/10 text-sm text-background placeholder:text-background/60 backdrop-blur-sm focus-visible:ring-0"
            />
            <Button
              type="submit"
              size="icon"
              className="h-10 shrink-0 rounded-l-none rounded-r-md bg-amber-500 hover:bg-amber-600"
            >
              <Search className="h-5 w-5 text-foreground" />
            </Button>
          </form>

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-1 sm:gap-3">
            {/* Dark mode toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-background hover:bg-background/10"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Cambiar tema"
            >
              <Sun className="h-4 w-4 scale-100 rotate-0 transition-transform dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-transform dark:scale-100 dark:rotate-0" />
            </Button>

            {/* Account */}
            <Link
              href="/cuenta"
              className="hidden items-center gap-1 text-xs hover:underline sm:flex"
            >
              <User className="h-5 w-5" />
              <span className="leading-tight">
                Hola, <span className="font-bold">Identificate</span>
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
              className="text-background hover:text-background/80 sm:hidden"
              aria-label="Lista de deseos"
            >
              <Heart className="h-5 w-5" />
            </Link>

            {/* Cart */}
            <Link
              href="/carrito"
              className="relative flex items-center text-background"
              aria-label={`Carrito con ${cartCount} articulos`}
            >
              <div className="relative">
                <ShoppingCart className="h-7 w-7" />
                {cartCount > 0 && (
                  <Badge className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 p-0 text-[10px] font-bold text-foreground">
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
                  className="h-9 w-9 text-background hover:bg-background/10 lg:hidden"
                  aria-label="Abrir menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <SheetTitle className="sr-only">Menu de navegacion</SheetTitle>

                {/* Mobile: Location */}
                <div className="mb-4 flex items-center gap-2 border-b pb-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-sm">
                    Envio a <span className="font-bold">Chinchina, Caldas</span>
                  </span>
                </div>

                {/* Mobile: Account */}
                <Link
                  href="/cuenta"
                  className="mb-4 flex items-center gap-2 border-b pb-3 text-sm font-medium hover:underline"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  Hola, <span className="font-bold">Identificate</span>
                </Link>

                {/* Mobile: Search */}
                <form
                  onSubmit={handleMobileSearch}
                  className="mb-4 flex gap-2 border-b pb-4"
                >
                  <Input
                    type="search"
                    value={mobileSearchQuery}
                    onChange={(e) => setMobileSearchQuery(e.target.value)}
                    placeholder="Buscar..."
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" className="shrink-0">
                    <Search className="h-4 w-4" />
                  </Button>
                </form>

                {/* Mobile: Orders */}
                <Link
                  href="/pedidos"
                  className="mb-4 flex items-center gap-2 border-b pb-3 text-sm hover:underline"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Package className="h-5 w-5" />
                  Devoluciones y Pedidos
                </Link>

                {/* Mobile: Wishlist */}
                <Link
                  href="/cuenta/deseos"
                  className="mb-4 flex items-center gap-2 border-b pb-3 text-sm hover:underline"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Heart className="h-5 w-5" />
                  Lista de Deseos
                </Link>

                {/* Mobile: Nav links */}
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href + link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted",
                        isActive(link.href) &&
                          "font-bold text-primary"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* ── Secondary Nav (rose/pink) ── */}
      <nav className="bg-primary text-primary-foreground">
        <div className="mx-auto flex h-10 max-w-7xl items-center gap-1 overflow-x-auto px-4 scrollbar-none">
          {navLinks.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className={cn(
                "flex shrink-0 items-center gap-1 whitespace-nowrap rounded-sm px-2 py-1 text-xs font-medium transition-colors hover:bg-primary-foreground/10",
                isActive(link.href) &&
                  "rounded-sm bg-primary-foreground/20 font-bold"
              )}
            >
              {link.label === "Todos" && <Menu className="h-3.5 w-3.5" />}
              {link.label === "Lista de Deseos" && (
                <ChevronDown className="h-3.5 w-3.5" />
              )}
              {link.label}
            </Link>
          ))}
          <span className="ml-auto shrink-0 text-xs font-semibold">
            Miss Semi Fashion | Premium
          </span>
        </div>
      </nav>
    </header>
  );
}
