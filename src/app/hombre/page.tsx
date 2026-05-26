"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Truck, Shield, Ruler, ChevronRight, ArrowRight } from "lucide-react";
import type { Product } from "@/data/products";
import Breadcrumbs from "@/components/amazon/Breadcrumbs";
import ProductGrid from "@/components/amazon/ProductGrid";
import { Button } from "@/components/ui/button";
import { useLiveFetch } from "@/hooks/useLiveFetch";

/* ── Animation Variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ── Feature Badges ── */
const features = [
  {
    icon: Truck,
    title: "Envío Gratis",
    desc: "En pedidos superiores a $50.000",
  },
  {
    icon: Shield,
    title: "Telas Premium",
    desc: "Algodón y lino de alta calidad",
  },
  {
    icon: Ruler,
    title: "Todas las Tallas",
    desc: "S, M, L, XL, XXL disponibles",
  },
];

/* ── Subcategories ── */
const subcategories = [
  { name: "Camisas", count: 1, href: "/buscar?q=camisa+hombre", img: "/images/hero-hombre.png" },
  { name: "Pantalones", count: 1, href: "/buscar?q=pantalon+hombre", img: "/images/hero-hombre.png" },
  { name: "Conjuntos", count: 1, href: "/buscar?q=conjunto+hombre", img: "/images/hero-hombre.png" },
];

/* ── Hero Stats ── */
const heroStats = [
  { value: "500+", label: "Clientes" },
  { value: "100%", label: "Premium" },
  { value: "24h", label: "Envío" },
];

export default function HombrePage() {
  const { data: hombreProducts } = useLiveFetch<Product>("/api/products?category=hombre");

  return (
    <main className="min-h-screen" style={{ background: "#0A0A0A" }}>
      {/* ════════════════════════════════════════════════════════════
          HERO SECTION
          ════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden"
        style={{ minHeight: "clamp(400px, 55vw, 580px)" }}
      >
        {/* Background Image */}
        <Image
          src="/images/hero-hombre.png"
          alt="Moda Hombre - Colección Caballero"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={100}
        />

        {/* Charcoal Overlay */}
        <div className="absolute inset-0" style={{ background: "rgba(26,26,26,0.85)" }} />

        {/* Subtle gold accent line at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: "linear-gradient(to right, transparent, #C6A962, transparent)" }} />

        {/* Hero Content — Left Aligned */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8" style={{ minHeight: "clamp(400px, 55vw, 580px)" }}>
          <div className="max-w-2xl">
            {/* Gold Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="mb-5"
            >
              <span
                className="inline-block text-[11px] font-medium uppercase tracking-[0.25em]"
                style={{ color: "#C6A962" }}
              >
                Colección Caballero
              </span>
            </motion.div>

            {/* Serif Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="font-serif leading-none"
              style={{ fontSize: "clamp(2.8rem, 7vw, 5rem)", color: "#FFFFFF" }}
            >
              Moda{" "}
              <span style={{ color: "#C6A962" }}>Hombre</span>
            </motion.h1>

            {/* Gold Decorative Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="mt-5 mb-5 h-px w-16 origin-left"
              style={{ background: "#C6A962" }}
            />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="max-w-lg text-sm sm:text-base leading-relaxed"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Descubre la nueva colección masculina. Diseños modernos con telas
              premium que combinan elegancia y comodidad para el hombre
              contemporáneo.
            </motion.p>

            {/* CTA + Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="mt-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8"
            >
              {/* CTA Button */}
              <div>
                <Button
                  asChild
                  className="rounded-none px-8 py-3 text-[12px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-300"
                  style={{ background: "#C6A962" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#B89A4D")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#C6A962")}
                >
                  <Link href="#productos">
                    Ver Colección
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Right Stats */}
              <div className="flex gap-8 sm:gap-10">
                {heroStats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.7 + i * 0.12,
                      duration: 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94] as const,
                    }}
                    className="text-center"
                  >
                    <p
                      className="font-serif text-2xl sm:text-3xl font-light"
                      style={{ color: "#C6A962" }}
                    >
                      {stat.value}
                    </p>
                    <p
                      className="mt-0.5 text-[10px] uppercase tracking-[0.2em]"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          BREADCRUMBS + FEATURES
          ════════════════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-5">
          <Breadcrumbs items={[{ label: "Hombre" }]} />
        </div>

        {/* Feature Badges */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-12"
        >
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              variants={fadeUp}
              custom={i}
              className="group relative flex items-center gap-4 bg-[#111111] px-6 py-5 transition-all duration-500"
              style={{ border: "1px solid #2A2A2A" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderTopColor = "#C6A962";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderTopColor = "#2A2A2A";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center transition-colors duration-300"
                style={{
                  background: "rgba(198,169,98,0.15)",
                  color: "#C6A962",
                }}
              >
                <feat.icon className="h-5 w-5" />
              </div>
              <div>
                <p
                  className="text-[13px] font-semibold uppercase tracking-wider"
                  style={{ color: "#E5E5E5" }}
                >
                  {feat.title}
                </p>
                <p className="mt-0.5 text-[13px]" style={{ color: "#B3B3B3" }}>
                  {feat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          SUBCATEGORIES
          ════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        >
          {/* Section Header with Gold Bar */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-6 w-1" style={{ background: "#C6A962" }} />
            <h2
              className="font-serif text-xl sm:text-2xl font-normal tracking-wide"
              style={{ color: "#E5E5E5" }}
            >
              Categorías
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {subcategories.map((sub, i) => (
              <motion.div
                key={sub.name}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
              >
                <Link href={sub.href} className="group block relative overflow-hidden">
                  {/* Image */}
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={sub.img}
                      alt={sub.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                      quality={100}
                    />
                    {/* Dark Overlay */}
                    <div
                      className="absolute inset-0 transition-opacity duration-500"
                      style={{ background: "rgba(26,26,26,0.55)" }}
                    />

                    {/* Gold border on hover */}
                    <div
                      className="absolute inset-0 border-2 opacity-0 transition-opacity duration-500"
                      style={{ borderColor: "#C6A962" }}
                    />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                      <h3
                        className="font-serif text-xl sm:text-2xl font-normal text-white tracking-wide transition-transform duration-500 group-hover:-translate-y-0.5"
                      >
                        {sub.name}
                      </h3>
                      <p
                        className="mt-1 text-[11px] uppercase tracking-[0.2em]"
                        style={{ color: "#C6A962" }}
                      >
                        {sub.count} producto{sub.count !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          PRODUCTS SECTION
          ════════════════════════════════════════════════════════════ */}
      <section
        id="productos"
        className="py-14"
        style={{ background: "#111111" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header with Gold Left Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="h-6 w-1" style={{ background: "#C6A962" }} />
              <h2
                className="font-serif text-xl sm:text-2xl font-normal tracking-wide"
                style={{ color: "#E5E5E5" }}
              >
                Nuestra Colección
              </h2>
            </div>
            <p className="ml-7 text-sm" style={{ color: "#B3B3B3" }}>
              {hombreProducts.length} producto
              {hombreProducts.length !== 1 ? "s" : ""} disponible
              {hombreProducts.length !== 1 ? "s" : ""} para hombre
            </p>
          </motion.div>

          {/* Product Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <ProductGrid
              products={hombreProducts}
              title="Lo Más Destacado"
              subtitle="Camisas, pantalones y conjuntos de alta calidad"
              variant="grid"
            />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          BANNER CTA
          ════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: "#1A1A1A" }}>
        {/* Subtle gold top accent */}
        <div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(to right, transparent, #C6A962, transparent)" }} />

        {/* Decorative corner accents */}
        <div className="absolute top-6 left-6 w-16 h-16 pointer-events-none" style={{ borderTop: "1px solid rgba(198,169,98,0.2)", borderLeft: "1px solid rgba(198,169,98,0.2)" }} />
        <div className="absolute bottom-6 right-6 w-16 h-16 pointer-events-none" style={{ borderBottom: "1px solid rgba(198,169,98,0.2)", borderRight: "1px solid rgba(198,169,98,0.2)" }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="flex flex-col items-center text-center"
          >
            {/* Gold Label */}
            <span
              className="mb-4 inline-block text-[11px] font-medium uppercase tracking-[0.25em]"
              style={{ color: "#C6A962" }}
            >
              Estilo que marca la diferencia
            </span>

            {/* Heading */}
            <h3
              className="font-serif leading-tight"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                color: "#FFFFFF",
              }}
            >
              Tu look dice{" "}
              <span style={{ color: "#C6A962" }}>todo</span> de ti
            </h3>

            {/* Decorative Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="mt-5 mb-5 h-px w-12 origin-center"
              style={{ background: "#C6A962" }}
            />

            {/* Description */}
            <p
              className="max-w-lg text-sm sm:text-base leading-relaxed"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Cada prenda está diseñada para el hombre que no sigue tendencias,
              las crea. Calidad premium con la confianza que mereces.
            </p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="mt-8"
            >
              <Button
                asChild
                className="rounded-none px-8 py-3 text-[12px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-300"
                style={{ background: "#C6A962" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#B89A4D")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#C6A962")}
              >
                <Link href="/buscar?q=hombre">
                  Explorar Todo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
