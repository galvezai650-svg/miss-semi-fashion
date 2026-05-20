"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Truck, Sparkles, ShieldCheck } from "lucide-react";
import { getProductsByCategory } from "@/data/products";
import ProductGrid from "@/components/amazon/ProductGrid";
import Breadcrumbs from "@/components/amazon/Breadcrumbs";
import { Button } from "@/components/ui/button";

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

export default function LenceriaPage() {
  const products = useMemo(() => getProductsByCategory("lenceria"), []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fff5f7] via-[#fef7f9] to-background">
      {/* ── Breadcrumbs ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Lencería" }]} />
      </div>

      {/* ════════════════════════════════════════════════════════════════
          HERO SECTION
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Background image with romantic pink gradient overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-lenceria.png"
            alt="Lencería Miss Semi Fashion"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fce7f3]/90 via-[#f43f5e]/70 to-[#fce7f3]/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fce7f3]/60 via-transparent to-transparent" />
        </div>

        {/* Decorative floating hearts */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
          aria-hidden
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-white/20"
              style={{
                left: `${15 + i * 15}%`,
                top: `${10 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -18, 0],
                rotate: [0, 8, -4, 0],
                opacity: [0.15, 0.3, 0.15],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.6,
              }}
            >
              <Heart
                className="h-6 w-6 sm:h-8 sm:w-8"
                fill="currentColor"
                strokeWidth={0}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Hero content */}
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-28 md:py-36 lg:py-40">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            className="flex flex-col items-center gap-6"
          >
            {/* Decorative diamond */}
            <motion.div variants={fadeIn} className="flex items-center gap-3">
              <span className="h-px w-10 bg-white/50 sm:w-16" />
              <span className="text-xs font-medium tracking-[0.3em] text-white/80 uppercase sm:text-sm">
                Miss Semi Fashion
              </span>
              <span className="h-px w-10 bg-white/50 sm:w-16" />
            </motion.div>

            {/* Main title */}
            <motion.h1
              variants={fadeUp}
              custom={0}
              className="text-5xl font-extralight tracking-[0.15em] text-white drop-shadow-lg sm:text-6xl md:text-7xl lg:text-8xl"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              LENCIERÍA
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              custom={1}
              className="max-w-xl text-base font-light leading-relaxed text-white/90 sm:text-lg md:text-xl"
            >
              Descubre nuestra colección de lencería diseñada para realzar tu
              sensualidad con elegancia y comodidad. Piezas que celebran la
              feminidad en cada detalle.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={fadeUp}
              custom={2}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <Button
                asChild
                size="lg"
                className="min-w-[180px] rounded-full border-2 border-white/30 bg-white/20 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-white/30 hover:shadow-lg hover:shadow-rose-500/10 sm:text-lg"
              >
                <a href="#coleccion">
                  Ver Colección
                </a>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="rounded-full text-base font-light text-white/90 transition-all hover:bg-white/10 hover:text-white sm:text-lg"
              >
                <Link href="/ofertas">Ofertas Especiales</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom wave divider */}
        <div className="absolute -bottom-1 left-0 right-0 z-10">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
              fill="#fef7f9"
            />
          </svg>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          FEATURE BADGES
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
                className="group relative overflow-hidden rounded-2xl border border-rose-100 bg-gradient-to-br from-white via-[#fff5f7] to-[#fce7f3]/50 p-6 shadow-sm shadow-rose-100/50 transition-all duration-300 hover:border-rose-200 hover:shadow-md hover:shadow-rose-200/30"
              >
                {/* Subtle heart watermark */}
                <Heart
                  className="absolute -right-4 -top-4 h-24 w-24 text-rose-100/50 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
                  fill="currentColor"
                  strokeWidth={0}
                />

                <div className="relative flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 shadow-md shadow-rose-200/50">
                    <Icon className="h-6 w-6 text-white" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-rose-900 sm:text-base">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-rose-700/70 sm:text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          COLLECTION INTRO
         ════════════════════════════════════════════════════════════════ */}
      <motion.section
        id="coleccion"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* Section header */}
        <motion.div variants={fadeUp} custom={0} className="mb-10 text-center">
          <div className="mx-auto mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-rose-200 sm:w-14" />
            <Heart
              className="h-5 w-5 text-rose-400"
              fill="currentColor"
              strokeWidth={0}
            />
            <span className="h-px w-8 bg-rose-200 sm:w-14" />
          </div>
          <h2 className="text-2xl font-light tracking-wide text-rose-900 sm:text-3xl md:text-4xl">
            Nuestra Colección
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-rose-600/80 sm:text-base">
            Cada pieza ha sido cuidadosamente seleccionada para ofrecerte
            confort, estilo y esa confianza que mereces.
          </p>
        </motion.div>

        {/* Product grid */}
        <motion.div variants={fadeUp} custom={1}>
          <ProductGrid
            products={products}
            variant="grid"
          />
        </motion.div>
      </motion.section>

      {/* ════════════════════════════════════════════════════════════════
          ROMANTIC BANNER / CTA
         ════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600" />

          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg
              className="h-full w-full"
              width="100%"
              height="100%"
              viewBox="0 0 200 200"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern
                  id="hearts-pattern"
                  x="0"
                  y="0"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M20 35 C20 35 10 25 10 18 C10 13 14 10 18 10 C20 10 20 12 20 12 C20 12 20 10 22 10 C26 10 30 13 30 18 C30 25 20 35 20 35Z"
                    fill="white"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hearts-pattern)" />
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

            <h3
              className="text-3xl font-extralight tracking-widest text-white sm:text-4xl md:text-5xl"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Siéntete Especial
            </h3>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">
              Regálate o sorprende a esa persona especial con nuestra colección
              exclusiva. Porque cada mujer merece sentirse hermosa.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 min-w-[200px] rounded-full border-2 border-white/40 bg-white/20 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-white/30 hover:shadow-lg hover:shadow-rose-900/20 sm:text-lg"
            >
              <Link href="/">Explorar Todo</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SUBCATEGORY QUICK LINKS
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
            className="mb-8 text-center text-2xl font-light tracking-wide text-rose-900 sm:text-3xl"
          >
            Explora por Categoría
          </motion.h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
            {[
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
            ].map((cat, i) => (
              <motion.div
                key={cat.name}
                custom={i + 1}
                variants={scaleIn}
              >
                <Link
                  href={cat.href}
                  className="group relative block overflow-hidden rounded-2xl border border-rose-100 shadow-sm transition-all duration-300 hover:border-rose-300 hover:shadow-lg hover:shadow-rose-200/30"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-rose-900/70 via-rose-900/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-base font-medium tracking-wide text-white drop-shadow-md sm:text-lg">
                        {cat.name}
                      </span>
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
