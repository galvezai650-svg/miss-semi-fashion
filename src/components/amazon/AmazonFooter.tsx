"use client";

import Link from "next/link";
import { ArrowUp, Instagram, Facebook, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const footerSections = [
  {
    title: "Tienda",
    links: [
      { label: "Hombre", href: "/hombre" },
      { label: "Lencería", href: "/lenceria" },
      { label: "Niños", href: "/ninos" },
      { label: "Adornos", href: "/adornos" },
      { label: "Hogar", href: "/hogar" },
      { label: "Ofertas", href: "/ofertas" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre nosotros", href: "/nosotros" },
      { label: "Blog", href: "/blog" },
      { label: "Empleo", href: "/empleo" },
      { label: "Prensa", href: "/prensa" },
      { label: "Vende con nosotros", href: "/vender" },
    ],
  },
  {
    title: "Soporte",
    links: [
      { label: "Centro de ayuda", href: "/ayuda" },
      { label: "Devoluciones", href: "/devoluciones" },
      { label: "Garantía", href: "/garantia" },
      { label: "Mis Pedidos", href: "/pedidos" },
      { label: "WhatsApp", href: "/ayuda" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Contra entrega", href: "/pago/contra-entrega" },
      { label: "Afiliados", href: "/afiliados" },
      { label: "Mayorista", href: "/mayorista" },
    ],
  },
];

export default function AmazonFooter() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="w-full border-t border-[#E8E5DE] bg-[#1A1A1A] text-[#CCC]">
      {/* ── Newsletter Section ── */}
      <div className="border-b border-[#333]">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-14 text-center md:flex-row md:text-left">
          <div className="flex-1">
            <h3 className="font-serif text-xl font-medium text-white md:text-2xl">
              Únete al mundo Miss Semi Fashion
            </h3>
            <p className="mt-2 text-sm text-[#999]">
              Recibe ofertas exclusivas, novedades y estilo directo en tu
              bandeja.
            </p>
          </div>
          <div className="flex w-full gap-2 md:max-w-sm">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="h-11 flex-1 rounded-none border border-[#444] bg-[#2A2A2A] px-4 text-sm text-white placeholder:text-[#666] focus:border-[#C6A962] focus:outline-none"
            />
            <Button className="h-11 rounded-none bg-[#C6A962] px-6 font-medium text-[#1A1A1A] hover:bg-[#D4AF37]">
              Suscribir
            </Button>
          </div>
        </div>
      </div>

      {/* ── Main Footer Content ── */}
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 lg:gap-16">
          {/* Brand Column */}
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.png"
                alt="Miss Semi Fashion"
                width={140}
                height={42}
                className="h-8 w-auto opacity-90"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[#888]">
              Confeccionamos prendas de calidad premium. Moda para toda la
              familia, hecha en Colombia con amor y las mejores telas.
            </p>
            {/* Social */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://wa.me/573108416620"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#444] text-[#888] transition-all hover:border-[#C6A962] hover:text-[#C6A962]"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#444] text-[#888] transition-all hover:border-[#C6A962] hover:text-[#C6A962]"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#444] text-[#888] transition-all hover:border-[#C6A962] hover:text-[#C6A962]"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Link Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-5 text-xs font-semibold tracking-[0.2em] text-[#C6A962] uppercase">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-[#888] transition-colors hover:text-white"
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

      {/* ── Bottom Bar ── */}
      <div className="border-t border-[#333]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
          <p className="text-[12px] text-[#666]">
            &copy; {new Date().getFullYear()} Miss Semi Fashion. Todos los
            derechos reservados.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[12px] tracking-[0.1em] text-[#888] transition-colors hover:text-[#C6A962] uppercase"
          >
            Volver arriba
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
