"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Truck, Sparkles, ShieldCheck } from "lucide-react";
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
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" as const } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" as const },
  }),
};

/* ─── Feature badges data ─── */
const features = [
  {
    icon: Truck,
    title: "Envío Discreto",
    description: "Paquetes sin marcas, tu privacidad es prioridad",
  },
  {
    icon: Sparkles,
    title: "Telas Suaves",
    description: "Materiales premium que acarician tu piel",
  },
  {
    icon: ShieldCheck,
    title: "Calidad Premium",
    description: "Confección artesanal con acabados impecables",
  },
];

/* ─── Subcategory data ─── */
const subcategories = [
  {
    name: "Conjuntos Íntimos",
    image: "/images/hero-lenceria.png",
    href: "/buscar?q=conjunto+íntimo",
  },
  {
    name: "Bralettes",
    image: "/images/hero-lenceria.png",
    href: "/buscar?q=bralette",
  },
  {
    name: "Pijamas Sensuales",
    image: "/images/hero-lenceria.png",
    href: "/buscar?q=babydoll",
  },
];

export default function LenceriaPage() {
  const { data: products } = useLiveFetch<Product>("/api/products?category=lenceria");

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      {/* ── Breadcrumbs ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Lencería" }]} />
      </div>

      {/* ════════════════════════════════════════════════════════════════
          HERO SECTION — Romantic Luxury
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Background image with warm gold-toned overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-lenceria.png"
            alt="Lencería Miss Semi Fashion"
            fill
            quality={100}
            className="object-cover object-center"
            priority
          />
          {/* Gold-toned overlay — warm & luxurious */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#C6A962]/50 via-[#151515]/80 to-[#C6A962]/30" />
          {/* Bottom fade to page bg */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent" />
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
              <span className="h-px w-10 bg-white/25 sm:w-16" />
              <span className="text-[11px] font-medium tracking-[0.3em] text-white/80 uppercase sm:text-xs">
                Miss Semi Fashion
              </span>
              <span className="h-px w-10 bg-white/25 sm:w-16" />
            </motion.div>

            {/* Main serif title */}
            <motion.h1
              variants={fadeUp}
              custom={0}
              className="font-serif text-5xl font-normal tracking-[0.12em] text-white sm:text-6xl md:text-7xl lg:text-8xl"
              style={{ textShadow: "0 2px 30px rgba(0,0,0,0.8), 0 0 40px rgba(198,169,98,0.3)" }}
            >
              LENCERÍA
            </motion.h1>

            {/* Elegant description */}
            <motion.p
              variants={fadeUp}
              custom={1}
              className="max-w-xl text-base font-light leading-relaxed text-white/85 sm:text-lg md:text-xl"
            >
              Descubre nuestra colección de lencería diseñada para realzar tu
              sensualidad con elegancia y comodidad. Piezas que celebran la
              feminidad en cada detalle.
            </motion.p>

            {/* CTA — Gold luxury button */}
            <motion.div variants={fadeUp} custom={2}>
              <Button
                asChild
                size="lg"
                className="min-w-[200px] rounded-none border border-[#C6A962] bg-[#C6A962] px-10 text-[13px] font-medium tracking-[0.15em] text-white uppercase shadow-sm transition-all duration-300 hover:bg-[#B89A50] hover:shadow-md hover:shadow-[#C6A962]/20 sm:min-w-[220px] sm:text-sm"
              >
                <a href="#coleccion">Ver Colección</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom scallop / wave divider into page background */}
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
          FEATURE BADGES — Cream Cards with Gold Icon Circles
         ════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
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
                className="group relative overflow-hidden rounded-sm border border-[#2A2A2A] bg-[#111111] p-6 transition-all duration-300 hover:border-[#C6A962]/50 hover:shadow-md hover:shadow-[#C6A962]/8"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Gold circle icon */}
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#C6A962]/30 bg-[#C6A962]/10 transition-all duration-300 group-hover:border-[#C6A962]/60 group-hover:bg-[#C6A962]/20">
                    <Icon
                      className="h-6 w-6 text-[#C6A962]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-sm font-semibold tracking-wide text-[#E5E5E5] sm:text-base">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#888888] sm:text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          PRODUCT COLLECTION — Centered Header with Gold Heart Divider
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
            Cada pieza ha sido cuidadosamente seleccionada para ofrecerte
            confort, estilo y esa confianza que mereces.
          </p>
        </motion.div>

        {/* Product grid */}
        <motion.div variants={fadeUp} custom={1}>
          <ProductGrid products={products} variant="grid" />
        </motion.div>
      </motion.section>

      {/* ════════════════════════════════════════════════════════════════
          CTA BANNER — Gold Gradient with White Text
         ════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" as const }}
          className="relative overflow-hidden rounded-sm"
        >
          {/* Gold gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#C6A962] via-[#D4AF37] to-[#C6A962]" />

          {/* Subtle geometric pattern overlay */}
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
                  id="diamond-pattern"
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
              <rect width="100%" height="100%" fill="url(#diamond-pattern)" />
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
              <Heart
                className="mx-auto mb-6 h-10 w-10 text-white/90 sm:h-12 sm:w-12"
                fill="currentColor"
                strokeWidth={0}
              />
            </motion.div>

            <h3 className="font-serif text-3xl font-normal tracking-widest text-white sm:text-4xl md:text-5xl">
              Siéntete Especial
            </h3>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">
              Regálate o sorprende a esa persona especial con nuestra colección
              exclusiva. Porque cada mujer merece sentirse hermosa.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 min-w-[200px] rounded-none bg-white px-10 text-[13px] font-medium tracking-[0.15em] text-[#0A0A0A] uppercase transition-all duration-300 hover:bg-white/90 hover:shadow-lg sm:min-w-[220px] sm:text-sm"
            >
              <Link href="/">Explorar Todo</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SUBCATEGORY CARDS — Elegant Image Cards
         ════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="font-serif mb-8 text-center text-2xl font-normal tracking-wide text-[#E5E5E5] sm:text-3xl"
          >
            Explora por Categoría
          </motion.h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
            {subcategories.map((cat, i) => (
              <motion.div
                key={cat.name}
                custom={i + 1}
                variants={scaleIn}
              >
                <Link
                  href={cat.href}
                  className="group relative block overflow-hidden rounded-sm border border-[#2A2A2A] transition-all duration-500 hover:border-[#C6A962]/50 hover:shadow-lg hover:shadow-[#C6A962]/10"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      quality={100}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Elegant overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/60 via-[#1A1A1A]/15 to-transparent transition-all duration-500 group-hover:from-[#1A1A1A]/70" />
                    {/* Category name */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                      <span className="text-sm font-medium tracking-[0.1em] text-white drop-shadow-md sm:text-base">
                        {cat.name}
                      </span>
                      {/* Gold underline that appears on hover */}
                      <span className="h-px w-0 bg-[#C6A962] transition-all duration-500 group-hover:w-12" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
