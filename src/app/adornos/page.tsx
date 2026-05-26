"use client";

import { motion } from "framer-motion";
import { Gem, Sparkles, Truck, Heart, Star, ShieldCheck } from "lucide-react";
import type { Product } from "@/data/products";
import ProductGrid from "@/components/amazon/ProductGrid";
import Breadcrumbs from "@/components/amazon/Breadcrumbs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useLiveFetch } from "@/hooks/useLiveFetch";

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── Shimmer particle data ─── */
const shimmerParticles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: `${10 + Math.random() * 80}%`,
  y: `${10 + Math.random() * 80}%`,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 4,
  duration: Math.random() * 2 + 2,
}));

/* ─── Feature cards ─── */
const features = [
  {
    icon: Gem,
    title: "Calidad Premium",
    description: "Materiales de primera seleccionados para ti",
  },
  {
    icon: Sparkles,
    title: "Diseños Únicos",
    description: "Piezas exclusivas que destacan tu estilo",
  },
  {
    icon: Truck,
    title: "Envío Gratis",
    description: "En compras superiores a $99.000 COP",
  },
];

export default function AdornosPage() {
  const { data: products } = useLiveFetch<Product>("/api/products?category=adornos");

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A0A0A" }}>
      {/* ════════════════════════════════════════════════
          BREADCRUMBS
      ════════════════════════════════════════════════ */}
      <div
        className="border-b"
        style={{ borderColor: "#2A2A2A" }}
      >
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Adornos" }]} />
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════════════ */}
      <section className="relative min-h-[520px] overflow-hidden md:min-h-[600px] lg:min-h-[640px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-adornos.png"
            alt="Colección Adornos - Miss Semi Fashion"
            fill
            quality={100}
            className="object-cover object-center"
            priority
          />
          {/* Dark charcoal overlay */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(26, 26, 26, 0.85)" }}
          />
          {/* Subtle gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/20" />
        </div>

        {/* Shimmer particles */}
        <div className="absolute inset-0 pointer-events-none">
          {shimmerParticles.map((p) => (
            <motion.span
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: p.x,
                top: p.y,
                width: p.size,
                height: p.size,
                backgroundColor: "rgba(198, 169, 98, 0.5)",
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto flex min-h-[520px] max-w-7xl flex-col items-center justify-center px-4 text-center md:min-h-[600px] lg:min-h-[640px]">
          {/* Decorative gold line top */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 120, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 h-[1px]"
            style={{
              background: "linear-gradient(90deg, transparent, #C6A962, transparent)",
            }}
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] sm:text-sm"
            style={{ color: "#C6A962" }}
          >
            <span
              className="inline-block h-[1px] w-8"
              style={{ backgroundColor: "rgba(198, 169, 98, 0.5)" }}
            />
            Colección Exclusiva
            <span
              className="inline-block h-[1px] w-8"
              style={{ backgroundColor: "rgba(198, 169, 98, 0.5)" }}
            />
          </motion.p>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-serif mb-6 text-5xl font-medium tracking-wide text-white sm:text-6xl md:text-7xl lg:text-8xl"
          >
            ADORNOS
          </motion.h1>

          {/* Gold gradient underline */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-6 h-[2px] w-28 origin-center rounded-full sm:w-36"
            style={{
              background:
                "linear-gradient(90deg, #A68B3C, #C6A962, #D4BA7A, #C6A962, #A68B3C)",
            }}
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mb-10 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base md:text-lg"
          >
            Descubre nuestra colección de accesorios y bisutería seleccionada
            para complementar tu estilo con elegancia y sofisticación.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.85 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="group px-8 text-sm font-medium tracking-wide uppercase sm:text-base"
              style={{ backgroundColor: "#C6A962", color: "#FFFFFF" }}
              onClick={() =>
                document
                  .getElementById("productos-adornos")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span className="relative z-10 flex items-center gap-2">
                <Gem className="h-4 w-4" />
                Ver Colección
              </span>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-transparent bg-transparent px-8 text-sm font-medium tracking-wide uppercase text-white backdrop-blur-sm transition-all hover:bg-white/5 sm:text-base"
              style={{ borderColor: "rgba(198, 169, 98, 0.5)" }}
              asChild
            >
              <Link href="/buscar?category=adornos">
                <Star className="mr-2 h-4 w-4" style={{ color: "#C6A962" }} />
                Más Vendidos
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          FEATURES SECTION
      ════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#111111" }}>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid grid-cols-1 gap-6 sm:grid-cols-3"
          >
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                custom={i}
                variants={fadeUp}
                className="group relative flex flex-col items-center rounded-lg border bg-[#151515]/60 p-6 text-center backdrop-blur-sm transition-all duration-300 sm:p-8"
                style={{
                  borderColor: "#2A2A2A",
                }}
                whileHover={{
                  borderColor: "rgba(198, 169, 98, 0.4)",
                  boxShadow: "0 4px 24px rgba(198, 169, 98, 0.08)",
                }}
              >
                {/* Icon container */}
                <div
                  className="mb-4 flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300"
                  style={{ backgroundColor: "rgba(198, 169, 98, 0.1)" }}
                >
                  <feat.icon
                    className="h-6 w-6 transition-colors duration-300"
                    style={{ color: "#C6A962" }}
                  />
                </div>

                <h3
                  className="font-serif mb-2 text-base font-medium"
                  style={{ color: "#E5E5E5" }}
                >
                  {feat.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#B3B3B3" }}>
                  {feat.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          PRODUCTS SECTION
      ════════════════════════════════════════════════ */}
      <section id="productos-adornos" className="scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex flex-col items-center text-center sm:mb-10"
          >
            <div className="mb-3 flex items-center gap-3">
              <span
                className="h-[1px] w-10"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #C6A962)",
                }}
              />
              <Sparkles
                className="h-4 w-4"
                style={{ color: "#C6A962" }}
              />
              <span
                className="h-[1px] w-10"
                style={{
                  background:
                    "linear-gradient(270deg, transparent, #C6A962)",
                }}
              />
            </div>
            <h2 className="font-serif text-2xl font-medium tracking-wide sm:text-3xl md:text-4xl">
              <span style={{ color: "#E5E5E5" }}>
                Nuestra Colección de{" "}
              </span>
              <span
                style={{
                  color: "#C6A962",
                }}
              >
                Adornos
              </span>
            </h2>
            <p
              className="mt-3 max-w-md text-sm leading-relaxed sm:text-base"
              style={{ color: "#888888" }}
            >
              Encuentra collares, aretes, bolsos y más. Cada pieza ha sido
              cuidadosamente seleccionada para ti.
            </p>
          </motion.div>

          {/* Product Grid */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <ProductGrid
              products={products}
              title=""
              variant="grid"
            />
          </motion.div>

          {/* Empty State */}
          {products.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center py-20 text-center"
            >
              <Gem className="mb-4 h-16 w-16" style={{ color: "#333333" }} />
              <h3 className="font-serif mb-2 text-lg font-medium" style={{ color: "#E5E5E5" }}>
                Próximamente
              </h3>
              <p className="text-sm" style={{ color: "#888888" }}>
                Estamos preparando una colección espectacular de adornos para ti.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          CTA BANNER
      ════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#1A1A1A" }}>
        {/* Subtle gold radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(198, 169, 98, 0.06), transparent 70%)",
          }}
        />

        {/* Subtle floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[1px] w-[1px] rounded-full"
              style={{
                left: `${15 + i * 14}%`,
                top: `${25 + (i % 3) * 20}%`,
                backgroundColor: "rgba(198, 169, 98, 0.35)",
              }}
              animate={{
                opacity: [0.2, 0.7, 0.2],
                scale: [0.8, 1.5, 0.8],
              }}
              transition={{
                duration: 3 + i * 0.5,
                delay: i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Heart
                className="mx-auto mb-5 h-8 w-8"
                style={{ color: "#C6A962" }}
              />
              <h2 className="font-serif mb-3 text-2xl font-medium text-white sm:text-3xl md:text-4xl">
                ¿Buscas el regalo{" "}
                <span style={{ color: "#C6A962" }}>perfecto</span>?
              </h2>
              <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed sm:text-base" style={{ color: "rgba(255,255,255,0.6)" }}>
                Sorprende a esa persona especial con nuestros adornos exclusivos.
                Calidad garantizada y envío discreto a toda Colombia.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  className="px-8 text-sm font-medium tracking-wide uppercase sm:text-base"
                  style={{ backgroundColor: "#C6A962", color: "#FFFFFF" }}
                  asChild
                >
                  <Link href="/carrito">
                    <Gem className="mr-2 h-4 w-4" />
                    Comprar Ahora
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-transparent bg-transparent px-8 text-sm font-medium tracking-wide uppercase text-white transition-all hover:bg-white/5 sm:text-base"
                  style={{ borderColor: "rgba(198, 169, 98, 0.4)" }}
                  asChild
                >
                  <Link href="/cuenta/deseos">
                    <Heart className="mr-2 h-4 w-4" style={{ color: "#C6A962" }} />
                    Mi Lista de Deseos
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          TRUST SECTION
      ════════════════════════════════════════════════ */}
      <section
        className="border-t"
        style={{ borderColor: "#2A2A2A", backgroundColor: "#111111" }}
      >
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 gap-6 md:grid-cols-4"
          >
            {[
              {
                icon: ShieldCheck,
                label: "Autenticidad",
                desc: "100% garantizado",
              },
              {
                icon: Truck,
                label: "Envío rápido",
                desc: "2-5 días hábiles",
              },
              {
                icon: Heart,
                label: "Satisfacción",
                desc: "30 días devolución",
              },
              {
                icon: Star,
                label: "Calidad",
                desc: "Materiales premium",
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                custom={i}
                variants={fadeUp}
                className="flex flex-col items-center text-center"
              >
                <div
                  className="mb-3 flex h-12 w-12 items-center justify-center rounded-full transition-colors"
                  style={{ backgroundColor: "rgba(198, 169, 98, 0.08)" }}
                >
                  <item.icon className="h-5 w-5" style={{ color: "#C6A962" }} />
                </div>
                <p className="text-sm font-medium" style={{ color: "#E5E5E5" }}>
                  {item.label}
                </p>
                <p className="text-xs" style={{ color: "#888888" }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
