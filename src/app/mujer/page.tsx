"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Truck, Sparkles, ShieldCheck, Heart, Star, Crown } from "lucide-react";
import type { Product } from "@/data/products";
import ProductGrid from "@/components/amazon/ProductGrid";
import Breadcrumbs from "@/components/amazon/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { useLiveFetch } from "@/hooks/useLiveFetch";

/* ─── Animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
  }),
};

/* ─── Feature badges data ─── */
const features = [
  {
    icon: Crown,
    title: "Estilo Exclusivo",
    description: "Diseños únicos que resaltan tu personalidad y elegancia",
  },
  {
    icon: Sparkles,
    title: "Telas Premium",
    description: "Materiales de primera calidad para máxima comodidad",
  },
  {
    icon: Truck,
    title: "Envío Gratis",
    description: "Envío gratuito a todo Colombia en compras +$50.000",
  },
  {
    icon: ShieldCheck,
    title: "Compra Segura",
    description: "Garantía total y devoluciones sin complicaciones",
  },
];

/* ─── Subcategory data ─── */
const subcategories = [
  {
    name: "Blusas",
    description: "Diseños elegantes y casuales",
    href: "/buscar?q=blusa",
    emoji: "👚",
  },
  {
    name: "Pijamas",
    description: "Confort para descansar",
    href: "/buscar?q=pijama",
    emoji: "🌙",
  },
  {
    name: "Vestidos",
    description: "Para toda ocasión",
    href: "/buscar?q=vestido",
    emoji: "👗",
  },
  {
    name: "Pantalones",
    description: "Estilo y comodidad",
    href: "/buscar?q=pantalon",
    emoji: "👖",
  },
  {
    name: "Ropa Deportiva",
    description: "Activa y moderna",
    href: "/buscar?q=deportivo",
    emoji: "🏃‍♀️",
  },
  {
    name: "Lencería",
    description: "Sensual y elegante",
    href: "/lenceria",
    emoji: "✨",
  },
];

export default function MujerPage() {
  const { data: products } = useLiveFetch<Product[]>("/api/products?category=blusas");

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      {/* ── Breadcrumbs ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Mujer" }]} />
      </div>

      {/* ════════════════════════════════════════════════════════════════
          HERO SECTION — Elegant Rose & Gold Luxury
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Gradient background with decorative elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A0A0A] via-[#0A0A0A] to-[#0A0A15]" />
          {/* Decorative gold circles */}
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#C6A962]/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-rose-500/5 blur-3xl" />
          <div className="absolute right-1/4 top-1/3 h-48 w-48 rounded-full bg-[#C6A962]/3 blur-2xl" />
          {/* Subtle shimmer pattern */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #C6A962 1px, transparent 1px), radial-gradient(circle at 75% 75%, #C6A962 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Hero content */}
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-28 md:py-36 lg:py-44">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            className="flex flex-col items-center gap-6"
          >
            {/* Brand line */}
            <motion.div variants={fadeIn} className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#C6A962]/40 sm:w-16" />
              <span className="text-[11px] font-medium tracking-[0.3em] text-[#C6A962]/80 uppercase sm:text-xs">
                Colección Exclusiva
              </span>
              <span className="h-px w-10 bg-[#C6A962]/40 sm:w-16" />
            </motion.div>

            {/* Crown icon */}
            <motion.div variants={fadeIn}>
              <Crown className="h-10 w-10 text-[#C6A962]" strokeWidth={1.2} />
            </motion.div>

            {/* Main serif title */}
            <motion.h1
              variants={fadeUp}
              custom={0}
              className="font-serif text-5xl font-normal tracking-[0.12em] text-white sm:text-6xl md:text-7xl lg:text-8xl"
              style={{ textShadow: "0 2px 30px rgba(0,0,0,0.8), 0 0 40px rgba(198,169,98,0.3)" }}
            >
              MUJER
            </motion.h1>

            {/* Elegant description */}
            <motion.p
              variants={fadeUp}
              custom={1}
              className="max-w-xl text-base font-light leading-relaxed text-[#B3B3B3] sm:text-lg md:text-xl"
            >
              Descubre nuestra colección diseñada para la mujer moderna.
              Piezas que combinan elegancia, confort y estilo colombiano
              en cada detalle.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={fadeUp} custom={2} className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="min-w-[200px] rounded-none border border-[#C6A962] bg-[#C6A962] px-10 text-[13px] font-medium tracking-[0.15em] text-[#0A0A0A] uppercase shadow-sm transition-all duration-300 hover:bg-[#D4AF37] hover:shadow-md hover:shadow-[#C6A962]/20 sm:min-w-[220px] sm:text-sm"
              >
                <a href="#coleccion">Ver Colección</a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="min-w-[200px] rounded-none border-[#C6A962]/40 bg-transparent px-10 text-[13px] font-medium tracking-[0.15em] text-[#C6A962] uppercase transition-all duration-300 hover:border-[#C6A962] hover:bg-[#C6A962]/10 sm:min-w-[220px] sm:text-sm"
              >
                <Link href="/buscar?q=mujer">Explorar Todo</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom wave divider */}
        <div className="absolute -bottom-1 left-0 right-0 z-10">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,30 C240,55 480,5 720,30 C960,55 1200,5 1440,30 L1440,60 L0,60 Z"
              fill="#0A0A0A"
            />
          </svg>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          FEATURE BADGES
         ════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={scaleIn}
                className="group relative overflow-hidden rounded-sm border border-[#2A2A2A] bg-[#111111] p-5 transition-all duration-300 hover:border-[#C6A962]/50 hover:shadow-md hover:shadow-[#C6A962]/8 sm:p-6"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[#C6A962]/30 bg-[#C6A962]/10 transition-all duration-300 group-hover:border-[#C6A962]/60 group-hover:bg-[#C6A962]/20 sm:mb-4 sm:h-14 sm:w-14">
                    <Icon
                      className="h-5 w-5 text-[#C6A962] sm:h-6 sm:w-6"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-xs font-semibold tracking-wide text-[#E5E5E5] sm:text-sm">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#888888] sm:mt-1.5 sm:text-xs">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SUBCATEGORIES — Grid of categories
         ════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.div variants={fadeUp} custom={0} className="mb-8 text-center">
            <div className="mx-auto mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-[#2A2A2A] sm:w-16" />
              <Star
                className="h-4 w-4 text-[#C6A962]"
                fill="currentColor"
                strokeWidth={0}
              />
              <span className="h-px w-10 bg-[#2A2A2A] sm:w-16" />
            </div>
            <h2 className="font-serif text-2xl font-normal tracking-wide text-[#E5E5E5] sm:text-3xl">
              Explora por Categoría
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-[#888888]">
              Encuentra exactamente lo que buscas en nuestras colecciones
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-6">
            {subcategories.map((cat, i) => (
              <motion.div
                key={cat.name}
                custom={i + 1}
                variants={scaleIn}
              >
                <Link
                  href={cat.href}
                  className="group relative flex flex-col items-center overflow-hidden rounded-lg border border-[#2A2A2A] bg-[#111111] p-4 transition-all duration-300 hover:border-[#C6A962]/50 hover:bg-[#151515] hover:shadow-md hover:shadow-[#C6A962]/5 sm:p-6"
                >
                  {/* Icon circle */}
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-[#C6A962]/20 bg-[#C6A962]/5 transition-all duration-300 group-hover:border-[#C6A962]/50 group-hover:bg-[#C6A962]/10 sm:mb-4 sm:h-16 sm:w-16">
                    <span className="text-xl sm:text-2xl">{cat.emoji}</span>
                  </div>
                  <h3 className="text-center text-xs font-semibold tracking-wide text-[#E5E5E5] sm:text-sm">
                    {cat.name}
                  </h3>
                  <p className="mt-1 text-center text-[10px] text-[#666] sm:text-xs">
                    {cat.description}
                  </p>
                  {/* Gold underline on hover */}
                  <span className="mt-3 h-px w-0 bg-[#C6A962] transition-all duration-500 group-hover:w-8" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          PRODUCT COLLECTION
         ════════════════════════════════════════════════════════════════ */}
      <motion.section
        id="coleccion"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* Section header */}
        <motion.div variants={fadeUp} custom={0} className="mb-10 text-center">
          <div className="mx-auto mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#2A2A2A] sm:w-16" />
            <Heart
              className="h-5 w-5 text-[#C6A962]"
              fill="currentColor"
              strokeWidth={0}
            />
            <span className="h-px w-10 bg-[#2A2A2A] sm:w-16" />
          </div>
          <h2 className="font-serif text-2xl font-normal tracking-wide text-[#E5E5E5] sm:text-3xl md:text-4xl">
            Nuestra Colección
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-[#888888] sm:text-base">
            Cada pieza ha sido seleccionada para ofrecerte estilo, calidad y
            esa confianza que mereces.
          </p>
        </motion.div>

        {/* Product grid */}
        <motion.div variants={fadeUp} custom={1}>
          <ProductGrid products={products || []} variant="grid" />
        </motion.div>

        {/* Empty state */}
        {(!products || products.length === 0) && (
          <motion.div
            variants={fadeUp}
            custom={1}
            className="flex flex-col items-center gap-4 py-16"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#2A2A2A] bg-[#111111]">
              <Heart className="h-8 w-8 text-[#333]" />
            </div>
            <p className="text-sm text-[#888888]">
              Pronto agregaremos productos a esta sección
            </p>
            <Button
              asChild
              variant="outline"
              className="border-[#C6A962]/40 text-[#C6A962] hover:bg-[#C6A962]/10 hover:border-[#C6A962]"
            >
              <Link href="/">Explorar Todo el Catálogo</Link>
            </Button>
          </motion.div>
        )}
      </motion.section>

      {/* ════════════════════════════════════════════════════════════════
          CTA BANNER — Gold Gradient
         ════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-sm"
        >
          {/* Gold gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#C6A962] via-[#D4AF37] to-[#C6A962]" />
          {/* Diamond pattern overlay */}
          <div className="absolute inset-0 opacity-[0.06]">
            <svg
              className="h-full w-full"
              width="100%"
              height="100%"
              viewBox="0 0 200 200"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern
                  id="diamond-mujer"
                  x="0"
                  y="0"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M20 0 L40 20 L20 40 L0 20 Z"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#diamond-mujer)" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col items-center px-6 py-14 text-center sm:px-12 sm:py-20">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 12,
                delay: 0.2,
              }}
            >
              <Crown className="mx-auto mb-6 h-10 w-10 text-white/90 sm:h-12 sm:w-12" strokeWidth={1.2} />
            </motion.div>

            <h3 className="font-serif text-3xl font-normal tracking-widest text-white sm:text-4xl md:text-5xl">
              Eres Única
            </h3>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">
              Cada mujer es especial. Por eso diseñamos prendas que resaltan tu
              belleza natural. Encuentra tu estilo en Miss Semi Fashion.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="min-w-[200px] rounded-none bg-white px-10 text-[13px] font-medium tracking-[0.15em] text-[#0A0A0A] uppercase transition-all duration-300 hover:bg-white/90 hover:shadow-lg sm:min-w-[220px] sm:text-sm"
              >
                <Link href="/buscar?q=mujer">Comprar Ahora</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="min-w-[200px] rounded-none border-2 border-white/30 bg-transparent px-10 text-[13px] font-medium tracking-[0.15em] text-white uppercase transition-all duration-300 hover:bg-white/10 hover:border-white/60 sm:min-w-[220px] sm:text-sm"
              >
                <Link href="/ofertas">Ver Ofertas</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          TRUST SECTION
         ════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="overflow-hidden rounded-sm border border-[#2A2A2A] bg-[#111111]"
        >
          <div className="grid grid-cols-1 divide-y divide-[#2A2A2A] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="flex flex-col items-center gap-2 p-6 text-center sm:p-8">
              <Truck className="h-6 w-6 text-[#C6A962]" strokeWidth={1.5} />
              <h4 className="text-sm font-semibold text-[#E5E5E5]">Envío Gratis</h4>
              <p className="text-xs text-[#888888]">En compras mayores a $50.000</p>
            </div>
            <div className="flex flex-col items-center gap-2 p-6 text-center sm:p-8">
              <ShieldCheck className="h-6 w-6 text-[#C6A962]" strokeWidth={1.5} />
              <h4 className="text-sm font-semibold text-[#E5E5E5]">Garantía Total</h4>
              <p className="text-xs text-[#888888]">30 días por defectos</p>
            </div>
            <div className="flex flex-col items-center gap-2 p-6 text-center sm:p-8">
              <Sparkles className="h-6 w-6 text-[#C6A962]" strokeWidth={1.5} />
              <h4 className="text-sm font-semibold text-[#E5E5E5]">Calidad Colombiana</h4>
              <p className="text-xs text-[#888888]">Hecho con amor en Colombia</p>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
