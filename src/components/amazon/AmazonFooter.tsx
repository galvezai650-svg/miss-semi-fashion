"use client";

import Link from "next/link";
import {
  ArrowUp,
  Instagram,
  Facebook,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const footerSections = [
  {
    title: "Conócenos",
    links: [
      { label: "Sobre nosotros", href: "/nosotros" },
      { label: "Empleo", href: "/empleo" },
      { label: "Prensa", href: "/prensa" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Gana Dinero",
    links: [
      { label: "Vende en Miss Semi", href: "/vender" },
      { label: "Programa Mayorista", href: "/mayorista" },
      { label: "Afiliados", href: "/afiliados" },
    ],
  },
  {
    title: "Métodos de Pago",
    links: [
      { label: "Contra entrega", href: "/pago/contra-entrega" },
      { label: "Abonos", href: "/pago/abonos" },
      { label: "Transferencias", href: "/pago/transferencias" },
      { label: "Nequi / Daviplata", href: "/pago/nequi-daviplata" },
    ],
  },
  {
    title: "¿Necesitas Ayuda?",
    links: [
      { label: "Centro de ayuda", href: "/ayuda" },
      { label: "Devoluciones", href: "/devoluciones" },
      { label: "Contacto WhatsApp", href: "/ayuda" },
      { label: "Garantía", href: "/garantia" },
    ],
  },
];

export default function AmazonFooter() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="w-full">
      {/* ── Back to Top ── */}
      <button
        onClick={scrollToTop}
        className="flex w-full items-center justify-center gap-2 bg-foreground px-4 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
      >
        <ArrowUp className="h-4 w-4" />
        Volver arriba
      </button>

      {/* ── Main Footer Content ── */}
      <div className="bg-secondary/30">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 sm:grid-cols-2 md:grid-cols-4 lg:px-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-sm font-bold text-foreground">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-muted-foreground transition-colors hover:text-foreground hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Social & Branding ── */}
      <div className="bg-secondary/50">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-6 text-center sm:flex-row sm:justify-between lg:px-8">
          <div>
            <p className="text-sm font-bold text-foreground">
              Miss Semi Fashion
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Confeccionamos prendas de calidad · Hecho en Colombia 🇨🇴
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/573108416620"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500/10 text-green-400 transition-all hover:bg-green-500/20 hover:scale-110"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-500/10 text-pink-400 transition-all hover:bg-pink-500/20 hover:scale-110"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 transition-all hover:bg-blue-500/20 hover:scale-110"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom Strip ── */}
      <div className="bg-foreground px-4 py-4 text-center text-xs text-background/70">
        &copy; {new Date().getFullYear()} Miss Semi Fashion. Todos los
        derechos reservados. Envíos CO / Internacionales.
      </div>
    </footer>
  );
}
