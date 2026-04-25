"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerSections = [
  {
    title: "Conocenos",
    links: [
      { label: "Sobre nosotros", href: "/nosotros" },
      { label: "Empleo", href: "/empleo" },
      { label: "Prensa", href: "/prensa" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Gana dinero",
    links: [
      { label: "Vende en Miss Semi", href: "/vender" },
      { label: "Programa Mayorista", href: "/mayorista" },
      { label: "Afiliados", href: "/afiliados" },
    ],
  },
  {
    title: "Metodos de pago",
    links: [
      { label: "Pago contra entrega", href: "/pago/contra-entrega" },
      { label: "Abonos", href: "/pago/abonos" },
      { label: "Transferencias", href: "/pago/transferencias" },
      { label: "Nequi/Daviplata", href: "/pago/nequi-daviplata" },
    ],
  },
  {
    title: "Necesitas ayuda?",
    links: [
      { label: "Centro de ayuda", href: "/ayuda" },
      { label: "Devoluciones", href: "/devoluciones" },
      { label: "Contacto WhatsApp", href: "#contacto" },
      { label: "Garantia", href: "/garantia" },
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

      {/* ── Link Grid ── */}
      <div className="bg-secondary/30">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 sm:grid-cols-2 md:grid-cols-4">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-3 text-sm font-bold">{section.title}</h3>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-muted-foreground transition-colors hover:underline hover:text-foreground"
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

      {/* ── Bottom Strip ── */}
      <div className="bg-foreground px-4 py-4 text-center text-xs text-background/80">
        &copy; {new Date().getFullYear()} Miss Semi Fashion. Todos los derechos
        reservados. Envios CO/Internacionales.
      </div>
    </footer>
  );
}
