"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  Sparkles,
  Home,
  Flame,
  ArrowRight,
  Leaf,
  Star,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/amazon/Breadcrumbs";
import ProductGrid from "@/components/amazon/ProductGrid";
import type { Product } from "@/data/products";
import { useLiveFetch } from "@/hooks/useLiveFetch";

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" as const },
  }),
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

/* ─── Feature Badges Data ─── */
const features = [
  {
    icon: Heart,
    title: "Hecho con Amor",
    description: "Cada pieza elaborada con dedicación artesanal y pasión",
    color: "#c2703e",
  },
  {
    icon: Sparkles,
    title: "Materiales Premium",
    description: "Textiles de la más alta calidad para tu hogar",
    color: "#d4a574",
  },
  {
    icon: Home,
    title: "Transforma tu Espacio",
    description: "Dale vida y calidez a cada rincón de tu casa",
    color: "#fb923c",
  },
];

/* ─── Subcategory Links ─── */
const subcategories = [
  { name: "Cojines", icon: Package, href: "/categoria/hogar" },
  { name: "Textiles", icon: Leaf, href: "/categoria/hogar" },
  { name: "Decoración", icon: Flame, href: "/categoria/hogar" },
];

export default function HogarPage() {
  const { data: hogarProducts } = useLiveFetch<Product>("/api/products?category=hogar");

  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: "#0A0A0A" }}>
      {/* ── Breadcrumbs ── */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Hogar" }]} />
      </div>

      {/* ════════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden">
        {/* Background Image */}
        <div className="relative h-[420px] w-full sm:h-[480px] md:h-[520px]">
          <Image
            src="/images/hero-hogar.png"
            alt="Hogar - Decoración y Textiles"
            fill
            quality={100}
            className="object-cover"
            priority
          />

          {/* Warm gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(212,165,116,0.85) 0%, rgba(194,112,62,0.7) 40%, rgba(251,146,60,0.5) 100%)",
            }}
          />

          {/* Subtle warm texture pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 40%)",
            }}
          />

          {/* Hero Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
          >
            {/* Decorative star cluster */}
            <motion.div variants={fadeUp} custom={0} className="mb-4 flex items-center gap-2">
              {[...Array(3)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-white/80 text-white/80"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </motion.div>

            {/* Main Title */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-5xl font-black tracking-tight text-white drop-shadow-lg sm:text-6xl md:text-7xl lg:text-8xl"
              style={{ textShadow: "0 4px 24px rgba(0,0,0,0.2)" }}
            >
              HOGAR
            </motion.h1>

            {/* Decorative divider */}
            <motion.div
              variants={fadeUp}
              custom={2}
              className="my-4 flex items-center gap-3"
            >
              <span className="h-[2px] w-12 bg-white/60 sm:w-20" />
              <Flame className="h-5 w-5 text-white/80 sm:h-6 sm:w-6" />
              <span className="h-[2px] w-12 bg-white/60 sm:w-20" />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              custom={3}
              className="max-w-2xl text-base leading-relaxed text-white/95 sm:text-lg md:text-xl"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
            >
              Descubre nuestra colección de decoración y textiles premium.
              <br className="hidden sm:block" />
              Cada detalle diseñado para hacer de tu casa un hogar acogedor.
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={fadeUp} custom={4} className="mt-8">
              <Button
                size="lg"
                asChild
                className="rounded-full px-8 py-6 text-base font-semibold shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{
                  backgroundColor: "#c2703e",
                  color: "#ffffff",
                }}
              >
                <a href="#productos">
                  Explorar Colección
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Warm bottom wave */}
        <div className="absolute -bottom-1 left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="block w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z"
              fill="#0A0A0A"
            />
          </svg>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FEATURE BADGES
      ════════════════════════════════════════════ */}
      <section className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={scaleIn}
                transition={{ delay: index * 0.15 }}
                className="group relative overflow-hidden rounded-2xl border-2 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8"
                style={{
                  borderColor: "#2A2A2A",
                  backgroundColor: "#111111",
                }}
              >
                {/* Warm glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(ellipse at center, ${feature.color}10 0%, transparent 70%)`,
                  }}
                />

                <div className="relative z-10">
                  {/* Icon container */}
                  <div
                    className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 sm:h-16 sm:w-16"
                    style={{
                      backgroundColor: `${feature.color}18`,
                    }}
                  >
                    <Icon
                      className="h-7 w-7 sm:h-8 sm:w-8"
                      style={{ color: feature.color }}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="mb-2 text-base font-bold sm:text-lg"
                    style={{ color: feature.color }}
                  >
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-[#B3B3B3]">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════
          SUBCATEGORY QUICK ACCESS
      ════════════════════════════════════════════ */}
      <section className="mx-auto w-full max-w-7xl px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={0} className="mb-6 text-center sm:mb-8">
            <h2 className="text-2xl font-bold text-[#E5E5E5] sm:text-3xl">
              Explora por Categoría
            </h2>
            <p className="mt-2 text-sm text-[#888888] sm:text-base">
              Encuentra lo que necesitas para cada rincón
            </p>
          </motion.div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4 md:grid-cols-3">
            {subcategories.map((sub, index) => {
              const Icon = sub.icon;
              return (
                <motion.div key={sub.name} variants={scaleIn} transition={{ delay: index * 0.1 }}>
                  <Link
                    href={sub.href}
                    className="group flex flex-col items-center gap-3 rounded-xl border-2 border-[#2A2A2A] bg-[#111111]/70 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C6A962]/40 hover:shadow-lg sm:p-6"
                  >
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110 sm:h-14 sm:w-14"
                      style={{ backgroundColor: "#d4a57418" }}
                    >
                      <Icon className="h-6 w-6" style={{ color: "#c2703e" }} />
                    </div>
                    <span className="text-sm font-semibold text-[#E5E5E5] sm:text-base">
                      {sub.name}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════
          PRODUCTS SECTION
      ════════════════════════════════════════════ */}
      <section
        id="productos"
        className="mx-auto w-full max-w-7xl px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
        >
          {/* Section Header */}
          <motion.div variants={fadeUp} custom={0} className="mb-2">
            <div className="mb-6 flex items-center gap-4">
              <span className="h-[3px] w-10 rounded-full sm:w-14" style={{ backgroundColor: "#c2703e" }} />
              <h2 className="text-2xl font-bold text-[#E5E5E5] sm:text-3xl">
                Nuestra Colección Hogar
              </h2>
            </div>
            <p className="mb-8 text-sm text-[#888888] sm:text-base">
              Piezas seleccionadas con cuidado para crear ambientes únicos y acogedores
            </p>
          </motion.div>

          {/* Product Grid */}
          <motion.div variants={fadeUp} custom={1}>
            <ProductGrid
              products={hogarProducts}
              variant="grid"
              title=""
              subtitle=""
            />
          </motion.div>

          {/* View All CTA */}
          {hogarProducts.length > 0 && (
            <motion.div variants={fadeUp} custom={2} className="mt-10 flex justify-center">
              <Button
                variant="outline"
                size="lg"
                asChild
                className="rounded-full px-8 py-6 text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg sm:px-10"
                style={{
                  borderColor: "#c2703e",
                  color: "#c2703e",
                  backgroundColor: "transparent",
                }}
              >
                <Link href="/categoria/hogar">
                  Ver Toda la Colección
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════
          WARM BANNER - Cozy CTA
      ════════════════════════════════════════════ */}
      <section className="mx-auto w-full max-w-7xl px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="relative overflow-hidden rounded-3xl"
          style={{
            background: "linear-gradient(135deg, #c2703e 0%, #d4a574 50%, #fb923c 100%)",
          }}
        >
          {/* Subtle decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-white/30" />
            <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/20" />
          </div>

          <div className="relative flex flex-col items-center gap-6 px-6 py-12 text-center sm:px-12 sm:py-16 md:flex-row md:text-left md:gap-10">
            {/* Text content */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Haz de tu casa un refugio
              </h3>
              <p className="mt-3 max-w-lg text-base leading-relaxed text-white/90 sm:text-lg">
                Suscríbete y recibe inspiración de decoración, ofertas exclusivas y
                novedades antes que nadie. Transforma cada espacio con estilo y calidez.
              </p>
            </div>

            {/* CTA */}
            <div className="flex-shrink-0">
              <Button
                size="lg"
                className="rounded-full bg-white px-8 py-6 text-base font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{ color: "#c2703e" }}
              >
                <Heart className="mr-2 h-5 w-5" />
                Inspirarme
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════
          TRUST INDICATORS
      ════════════════════════════════════════════ */}
      <section className="mx-auto w-full max-w-7xl px-4 pt-16 pb-16 sm:px-6 sm:pt-20 sm:pb-20 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="grid grid-cols-2 gap-6 md:grid-cols-4"
        >
          {[
            { icon: Package, label: "Envío Gratis", sub: "En compras +$50.000" },
            { icon: Sparkles, label: "Calidad Garantizada", sub: "Materiales premium" },
            { icon: Heart, label: "Hecho a Mano", sub: "Artesanías únicas" },
            { icon: Leaf, label: "Eco-Friendly", sub: "Materiales naturales" },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                variants={scaleIn}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center gap-2 text-center"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ backgroundColor: "#d4a57420" }}
                >
                  <Icon className="h-6 w-6" style={{ color: "#c2703e" }} />
                </div>
                <span className="text-sm font-semibold text-[#E5E5E5]">{item.label}</span>
                <span className="text-xs text-[#888888]">{item.sub}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Bottom spacer */}
      <div className="h-4" />
    </div>
  );
}
