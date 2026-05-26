"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Sparkles, ShieldCheck, Palette, Droplets, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/amazon/Breadcrumbs";
import ProductGrid from "@/components/amazon/ProductGrid";
import type { Product } from "@/data/products";
import { useLiveFetch } from "@/hooks/useLiveFetch";

/* ─── Animation presets ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: i * 0.12,
    },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ─── Gold decorative divider ─── */
function GoldDivider() {
  return (
    <div className="mx-auto flex items-center gap-3">
      <div className="h-px w-12 bg-[#C6A962]/30 sm:w-20" />
      <div className="h-1.5 w-1.5 rotate-45 border border-[#C6A962]/50 bg-[#0A0A0A]" />
      <div className="h-px w-12 bg-[#C6A962]/30 sm:w-20" />
    </div>
  );
}

/* ─── Feature card ─── */
function FeatureCard({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="group relative bg-[#111111] p-6 text-center transition-shadow duration-300 hover:shadow-lg sm:p-8"
      style={{ border: "1px solid #2A2A2A" }}
    >
      {/* Gold top accent line */}
      <div className="absolute left-1/2 top-0 h-px w-10 -translate-x-1/2 bg-[#C6A962] opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:w-16" />

      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full sm:h-14 sm:w-14" style={{ backgroundColor: "#151515" }}>
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: "#C6A962" }} />
      </div>
      <h3 className="font-serif text-base font-medium tracking-wide" style={{ color: "#E5E5E5" }}>
        {title}
      </h3>
      <p className="mx-auto mt-2 max-w-[220px] text-sm leading-relaxed" style={{ color: "#888888" }}>
        {description}
      </p>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════
   NIÑOS PAGE — Luxury Edition
   ════════════════════════════════════════════════════════════════ */
export default function NinosPage() {
  const { data: products } = useLiveFetch<Product>("/api/products?category=ninos");

  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: "#0A0A0A" }}>
      {/* ── Breadcrumbs ── */}
      <div className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Niños" }]} />
      </div>

      {/* ── HERO SECTION ── */}
      <section className="relative w-full">
        <div className="relative h-[380px] w-full sm:h-[440px] md:h-[500px] lg:h-[540px]">
          <Image
            src="/images/hero-ninos.png"
            alt="Colección Infantil - Miss Semi Fashion"
            fill
            quality={100}
            className="object-cover"
            priority
          />

          {/* Warm cream overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/85 via-[#111111]/75 to-[#0A0A0A]/90" />

          {/* Subtle warm vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(198,169,98,0.05)_100%)]" />

          {/* Hero content */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center gap-5 px-6 text-center sm:gap-6 sm:px-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="tracking-[0.25em]"
            >
              <span
                className="inline-block border px-5 py-1.5 text-[11px] font-semibold uppercase sm:text-xs"
                style={{ borderColor: "#C6A962", color: "#C6A962" }}
              >
                COLECCIÓN INFANTIL
              </span>
            </motion.div>

            {/* Main title */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="font-serif text-5xl font-medium tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
              style={{ color: "#E5E5E5" }}
            >
              NIÑOS
            </motion.h1>

            {/* Gold decorative line */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="h-px w-16 bg-[#C6A962]/60 sm:w-24 md:w-32" />
              <div className="h-1.5 w-1.5 rotate-45 border border-[#C6A962] bg-transparent" />
              <div className="h-px w-16 bg-[#C6A962]/60 sm:w-24 md:w-32" />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="max-w-md text-sm leading-relaxed sm:text-base md:max-w-lg"
              style={{ color: "#B3B3B3" }}
            >
              Diseños exclusivos elaborados con telas premium para los más
              pequeños. Comodidad y elegancia en cada detalle.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
            >
              <Button
                asChild
                className="mt-1 border-[#C6A962] bg-[#C6A962] px-8 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all hover:bg-[#A68B3C] hover:border-[#A68B3C] sm:px-10 sm:text-sm"
              >
                <a href="#productos">
                  Ver Colección
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURES SECTION ── */}
      <section className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center sm:mb-12"
        >
          <h2
            className="font-serif text-2xl font-medium tracking-wide sm:text-3xl"
            style={{ color: "#E5E5E5" }}
          >
            Calidad que se siente
          </h2>
          <div className="mx-auto mt-3 w-16 sm:w-20">
            <GoldDivider />
          </div>
          <p className="mx-auto mt-3 max-w-sm text-sm" style={{ color: "#888888" }}>
            Cada prenda está pensada para el confort y la elegancia de los más pequeños
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={Droplets}
            title="Telas Suaves"
            description="Algodón premium suave al tacto, cuidadosamente seleccionado para piel sensible"
            index={0}
          />
          <FeatureCard
            icon={Palette}
            title="Diseño Elegante"
            description="Estampados refinados y cortes pensados para lucir con estilo natural"
            index={1}
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Resistente"
            description="Confección duradera que mantiene su forma y color lavado tras lavado"
            index={2}
          />
        </div>
      </section>

      {/* ── PRODUCTS SECTION ── */}
      <section
        id="productos"
        className="w-full py-12 sm:py-16"
        style={{ backgroundColor: "#111111" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center sm:mb-10"
          >
            <h2
              className="font-serif text-2xl font-medium tracking-wide sm:text-3xl"
              style={{ color: "#E5E5E5" }}
            >
              Colección Infantil
            </h2>
            <div className="mx-auto mt-3 w-16 sm:w-20">
              <GoldDivider />
            </div>
            <p className="mx-auto mt-3 max-w-md text-sm" style={{ color: "#888888" }}>
              Descubre nuestras prendas seleccionadas para los más pequeños de la familia
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <ProductGrid products={products} title="" variant="grid" />
          </motion.div>
        </div>
      </section>

      {/* ── BANNER CTA ── */}
      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={scaleIn}
          className="relative overflow-hidden px-8 py-12 text-center sm:px-12 sm:py-14"
          style={{ backgroundColor: "#111111", border: "1px solid #2A2A2A" }}
        >
          {/* Corner gold accents */}
          <div className="pointer-events-none absolute left-4 top-4 h-8 w-8 border-l border-t border-[#C6A962]/30 sm:left-6 sm:top-6 sm:h-12 sm:w-12" />
          <div className="pointer-events-none absolute bottom-4 right-4 h-8 w-8 border-b border-r border-[#C6A962]/30 sm:bottom-6 sm:right-6 sm:h-12 sm:w-12" />

          <div className="relative z-10">
            <Sparkles className="mx-auto mb-4 h-5 w-5" style={{ color: "#C6A962" }} />
            <h3
              className="font-serif text-xl font-medium tracking-wide sm:text-2xl md:text-3xl"
              style={{ color: "#E5E5E5" }}
            >
              Envío gratis en pedidos +$50.000
            </h3>
            <p
              className="mx-auto mt-3 max-w-md text-sm leading-relaxed"
              style={{ color: "#888888" }}
            >
              Recibe la colección infantil directamente en tu puerta, sin costos
              adicionales de envío.
            </p>
            <div className="mt-6">
              <Button
                asChild
                className="border-[#C6A962] bg-[#C6A962] px-8 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all hover:bg-[#A68B3C] hover:border-[#A68B3C] sm:px-10 sm:text-sm"
              >
                <Link href="/pedidos">
                  Hacer pedido
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── TRUST / RATING ── */}
      <section className="mx-auto w-full max-w-5xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-3 text-center"
        >
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
              >
                <Star className="h-5 w-5 fill-[#C6A962] text-[#C6A962] sm:h-6 sm:w-6" />
              </motion.div>
            ))}
          </div>
          <p className="text-sm font-medium" style={{ color: "#B3B3B3" }}>
            Miles de familias confían en Miss Semi Fashion
          </p>
          <p className="text-xs" style={{ color: "#888888" }}>
            4.8 ★ promedio en valoraciones
          </p>
        </motion.div>
      </section>

      {/* Bottom spacing */}
      <div className="h-4" />
    </div>
  );
}
