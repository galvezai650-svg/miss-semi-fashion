"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Gem, Sparkles, Truck, Heart, Star } from "lucide-react";
import { getProductsByCategory } from "@/data/products";
import ProductGrid from "@/components/amazon/ProductGrid";
import Breadcrumbs from "@/components/amazon/Breadcrumbs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

/* ─── Shimmer particle data ─── */
const shimmerParticles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 100}%`,
  size: Math.random() * 4 + 2,
  delay: Math.random() * 4,
  duration: Math.random() * 2 + 2,
}));

/* ─── Feature badges ─── */
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

/* ─── Animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
  }),
};

export default function AdornosPage() {
  const products = useMemo(() => getProductsByCategory("adornos"), []);

  return (
    <div className="min-h-screen bg-background">
      {/* ════════════════════════════════════════════════
          BREADCRUMBS
      ════════════════════════════════════════════════ */}
      <div className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <Breadcrumbs items={[{ label: "Adornos" }]} />
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════════════ */}
      <section className="relative min-h-[480px] overflow-hidden md:min-h-[560px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-adornos.png"
            alt="Colección Adornos - Miss Semi Fashion"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Purple-Gold Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950/90 via-purple-900/80 to-black/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-purple-950/40" />
        </div>

        {/* Sparkle / Shimmer Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {shimmerParticles.map((p) => (
            <motion.span
              key={p.id}
              className="absolute rounded-full bg-yellow-300/70"
              style={{
                left: p.x,
                top: p.y,
                width: p.size,
                height: p.size,
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

        {/* Decorative corner gems */}
        <motion.div
          className="absolute top-8 right-8 hidden lg:flex items-center justify-center w-20 h-20"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative">
            <Gem className="w-14 h-14 text-yellow-400/30" />
            <Gem className="absolute inset-0 w-14 h-14 text-yellow-300/20 blur-sm" />
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-16 left-8 hidden lg:flex items-center justify-center w-16 h-16"
          animate={{ rotate: [0, -15, 15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative">
            <Sparkles className="w-10 h-10 text-purple-300/25" />
            <Sparkles className="absolute inset-0 w-10 h-10 text-purple-200/15 blur-sm" />
          </div>
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto flex min-h-[480px] max-w-7xl flex-col items-center justify-center px-4 text-center md:min-h-[560px]">
          {/* Decorative line top */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
          />

          {/* Subtitle above title */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.35em] text-purple-200/90"
          >
            <span className="inline-block h-px w-8 bg-yellow-400/60" />
            Colección Exclusiva
            <span className="inline-block h-px w-8 bg-yellow-400/60" />
          </motion.p>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-6 text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          >
            <span className="bg-gradient-to-b from-white via-purple-50 to-purple-200 bg-clip-text text-transparent">
              ADORNOS
            </span>
          </motion.h1>

          {/* Gold accent underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-6 h-1 w-32 origin-left rounded-full bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 shadow-lg shadow-yellow-400/30"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mb-8 max-w-xl text-base leading-relaxed text-purple-100/90 md:text-lg"
          >
            Descubre nuestra colección de accesorios y bisutería seleccionada para
            complementar tu estilo con elegancia y sofisticación.
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
              className="group relative overflow-hidden border border-yellow-400/40 bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700 px-8 font-semibold text-white shadow-lg shadow-purple-900/40 transition-all hover:shadow-xl hover:shadow-purple-800/50"
              onClick={() =>
                document
                  .getElementById("productos-adornos")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span className="relative z-10 flex items-center gap-2">
                <Gem className="h-4 w-4 text-yellow-300" />
                Ver Colección
              </span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-yellow-400/20 via-yellow-300/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-purple-400/30 bg-white/5 px-8 font-semibold text-white backdrop-blur-sm transition-all hover:border-yellow-400/50 hover:bg-white/10"
              asChild
            >
              <Link href="/buscar?category=adornos">
                <Star className="mr-2 h-4 w-4 text-yellow-300" />
                Más Vendidos
              </Link>
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-8"
          >
            {[
              { value: `${products.length}+`, label: "Productos" },
              { value: "4.6", label: "Rating Prom." },
              { value: "500+", label: "Clientes Felices" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xl font-bold text-yellow-300 md:text-2xl">
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-wider text-purple-300/70">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          FEATURE BADGES
      ════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-y border-purple-100/50 bg-gradient-to-b from-purple-50/80 via-background to-background">
        {/* Subtle shimmer bg */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.06),transparent_60%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-10 md:py-14">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                custom={i}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="group relative flex flex-col items-center rounded-2xl border border-purple-100/60 bg-white/70 p-6 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-yellow-300/60 hover:shadow-lg hover:shadow-purple-200/30"
              >
                {/* Gold glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-yellow-400/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Icon container */}
                <div className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-purple-50 shadow-md transition-all duration-300 group-hover:from-yellow-100 group-hover:to-yellow-50 group-hover:shadow-yellow-200/40">
                  <feat.icon className="h-6 w-6 text-purple-600 transition-colors duration-300 group-hover:text-yellow-600" />
                </div>

                <h3 className="mb-1 text-base font-bold text-foreground">
                  {feat.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          PRODUCTS SECTION
      ════════════════════════════════════════════════ */}
      <section id="productos-adornos" className="scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex flex-col items-center text-center"
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-yellow-400" />
              <Sparkles className="h-5 w-5 text-yellow-500" />
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Nuestra Colección de{" "}
              <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                Adornos
              </span>
            </h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
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
              <Gem className="mb-4 h-16 w-16 text-purple-200" />
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Próximamente
              </h3>
              <p className="text-sm text-muted-foreground">
                Estamos preparando una colección espectacular de adornos para ti.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          LUXURY CTA BANNER
      ════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.08),transparent_60%)]" />

        {/* Floating sparkles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-yellow-300/40"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
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

        <div className="relative mx-auto max-w-7xl px-4 py-14 md:py-20">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Heart className="mx-auto mb-4 h-10 w-10 text-yellow-400/80" />
              <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                ¿Buscas el regalo{" "}
                <span className="bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">
                  perfecto
                </span>
                ?
              </h2>
              <p className="mx-auto mb-8 max-w-lg text-purple-200/80">
                Sorprende a esa persona especial con nuestros adornos exclusivos.
                Calidad garantizada y envío discreto a toda Colombia.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-500 to-yellow-400 px-8 font-bold text-purple-950 shadow-lg shadow-yellow-500/25 transition-all hover:from-yellow-400 hover:to-yellow-300 hover:shadow-xl hover:shadow-yellow-400/30"
                  asChild
                >
                  <Link href="/carrito">
                    <Gem className="mr-2 h-5 w-5" />
                    Comprar Ahora
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-400/30 bg-white/5 px-8 font-semibold text-white backdrop-blur-sm transition-all hover:border-yellow-400/40 hover:bg-white/10"
                  asChild
                >
                  <Link href="/cuenta/deseos">
                    <Heart className="mr-2 h-5 w-5 text-pink-400" />
                    Mi Lista de Deseos
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          TRUST / GUARANTEE SECTION
      ════════════════════════════════════════════════ */}
      <section className="border-t border-purple-50 bg-gradient-to-b from-background to-purple-50/40">
        <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 gap-6 md:grid-cols-4"
          >
            {[
              {
                icon: Gem,
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
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100/80 shadow-sm transition-colors hover:bg-yellow-100">
                  <item.icon className="h-5 w-5 text-purple-600 transition-colors hover:text-yellow-600" />
                </div>
                <p className="text-sm font-semibold text-foreground">
                  {item.label}
                </p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
