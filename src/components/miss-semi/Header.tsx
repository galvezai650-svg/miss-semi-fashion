"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  ShoppingBag,
  Moon,
  Sun,
  X,
  Heart,
} from "lucide-react";
import Image from "next/image";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#productos", label: "Productos" },
  { href: "#mayorista", label: "Mayorista" },
  { href: "#contacto", label: "Contacto" },
];

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Header({ cartCount, onCartClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const emptySubscribe = () => () => {};
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass shadow-lg shadow-primary/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#inicio");
            }}
            className="flex items-center gap-2 group"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/30 group-hover:ring-primary/60 transition-all">
              <Image
                src="/images/logo.png"
                alt="Miss Semi Fashion Logo"
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold gradient-text leading-tight">
                Miss Semi Fashion
              </h1>
              <p className="text-[10px] text-muted-foreground tracking-wider uppercase">
                Moda Colombiana
              </p>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary rounded-full hover:bg-primary/5 transition-all duration-200"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex text-foreground/70 hover:text-primary hover:bg-primary/5"
              aria-label="Favoritos"
            >
              <Heart className="w-5 h-5" />
            </Button>

            {/* Dark Mode Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-foreground/70 hover:text-primary hover:bg-primary/5"
                aria-label="Cambiar tema"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>
            )}

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onCartClick}
              className="relative text-foreground/70 hover:text-primary hover:bg-primary/5"
              aria-label="Carrito de compras"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-primary text-primary-foreground border-2 border-background">
                  {cartCount}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-foreground/70 hover:text-primary"
                  aria-label="Menu"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-background/95 backdrop-blur-xl">
                <div className="flex flex-col gap-6 mt-8">
                  <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src="/images/logo.png"
                        alt="Logo"
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                    <span className="font-bold gradient-text">Miss Semi Fashion</span>
                  </div>
                  <nav className="flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <button
                        key={link.href}
                        onClick={() => handleNavClick(link.href)}
                        className="px-4 py-3 text-left text-base font-medium text-foreground/80 hover:text-primary rounded-xl hover:bg-primary/5 transition-all"
                      >
                        {link.label}
                      </button>
                    ))}
                  </nav>
                  <div className="h-px bg-border" />
                  <div className="flex items-center gap-3 px-4">
                    <span className="text-sm text-muted-foreground">Tema:</span>
                    {mounted && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setTheme(theme === "dark" ? "light" : "dark")
                        }
                        className="gap-2"
                      >
                        {theme === "dark" ? (
                          <>
                            <Sun className="w-4 h-4" /> Claro
                          </>
                        ) : (
                          <>
                            <Moon className="w-4 h-4" /> Oscuro
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
