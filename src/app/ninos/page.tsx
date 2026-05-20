"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Star,
  Sparkles,
  Heart,
  ShieldCheck,
  Palette,
  Droplets,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/amazon/Breadcrumbs";
import ProductGrid from "@/components/amazon/ProductGrid";
import { getProductsByCategory } from "@/data/products";

/* ─── Animation presets ─── */
const bounceIn = {
  hidden: { opacity: 0, scale: 0.5, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      delay: i * 0.1,
    },
  }),
};

const floatUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 18,
      delay: i * 0.15,
    },
  }),
};

const wiggleHover = {
  scale: 1.05,
  rotate: [0, -3, 3, -3, 0],
  transition: { duration: 0.5 },
};

/* ─── Decorative floating shapes ─── */
function FloatingShapes() {
  const shapes = [
    { emoji: "⭐", top: "8%", left: "5%", size: 28, delay: 0 },
    { emoji: "🎈", top: "15%", right: "8%", size: 32, delay: 1.5 },
    { emoji: "🌈", bottom: "20%", left: "10%", size: 24, delay: 0.8 },
    { emoji: "🦋", top: "40%", right: "5%", size: 22, delay: 2 },
    { emoji: "🎨", bottom: "10%", right: "12%", size: 26, delay: 1 },
    { emoji: "✨", top: "25%", left: "25%", size: 20, delay: 0.5 },
    { emoji: "🌟", top: "60%", left: "3%", size: 24, delay: 1.8 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {shapes.map((shape, i) => (
        <motion.span
          key={i}
          className="absolute select-none"
          style={{
            top: shape.top,
            left: shape.left,
            right: shape.right,
            bottom: shape.bottom,
            fontSize: shape.size,
          }}
          animate={{
            y: [0, -15, 0, 10, 0],
            rotate: [0, 10, -10, 5, 0],
            opacity: [0.7, 1, 0.8, 1, 0.7],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        >
          {shape.emoji}
        </motion.span>
      ))}
    </div>
  );
}

/* ─── Feature badge ─── */
function FeatureBadge({
  icon: Icon,
  title,
  description,
  color,
  index,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  index: number;
}) {
  return (
    <motion.div
      custom={index}
      variants={bounceIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={wiggleHover}
      className="group relative flex flex-col items-center gap-3 rounded-3xl border-2 border-transparent bg-white p-6 text-center shadow-md transition-colors sm:flex-row sm:text-left"
      style={
        {
          "--hover-color": color,
        } as React.CSSProperties
      }
    >
      {/* Icon wrapper */}
      <div
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg"
        style={{ backgroundColor: color }}
      >
        <Icon className="h-7 w-7" />
      </div>
      <div>
        <h3 className="text-base font-bold text-gray-800">{title}</h3>
        <p className="mt-0.5 text-sm text-gray-500">{description}</p>
      </div>
      {/* Decorative corner dot */}
      <div
        className="absolute -right-1 -top-1 h-4 w-4 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
        style={{ backgroundColor: color }}
      />
    </motion.div>
  );
}

/* ─── Section divider wave ─── */
function WaveDivider({ color = "#eab308", flip = false }) {
  return (
    <div className={`w-full ${flip ? "rotate-180" : ""}`}>
      <svg
        viewBox="0 0 1440 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0 30C240 60 480 0 720 30C960 60 1200 0 1440 30V60H0V30Z"
          fill={color}
          opacity="0.15"
        />
        <path
          d="M0 40C360 10 720 55 1080 20C1260 5 1380 35 1440 40V60H0V40Z"
          fill={color}
          opacity="0.08"
        />
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   NIÑOS PAGE
   ════════════════════════════════════════════════════════════════ */
export default function NinosPage() {
  const products = useMemo(() => getProductsByCategory("ninos"), []);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-b from-yellow-50/40 via-green-50/30 to-sky-50/40">
      {/* ── Breadcrumbs ── */}
      <div className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Niños" }]} />
      </div>

      {/* ── HERO SECTION ── */}
      <section className="relative w-full">
        {/* Background image */}
        <div className="relative h-[320px] w-full sm:h-[380px] md:h-[440px] lg:h-[480px]">
          <Image
            src="/images/hero-ninos.png"
            alt="Ropa para Niños - Miss Semi Fashion"
            fill
            className="object-cover"
            priority
          />
          {/* Colorful gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/80 via-green-400/70 to-sky-400/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

          {/* Floating decorations */}
          <FloatingShapes />

          {/* Hero content */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 px-4 text-center">
            {/* Fun badge */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
              className="rounded-full border-2 border-white/40 bg-white/20 px-5 py-1.5 backdrop-blur-sm"
            >
              <span className="flex items-center gap-2 text-sm font-semibold text-white sm:text-base">
                <Sparkles className="h-4 w-4" />
                Diversión &amp; Comodidad
                <Sparkles className="h-4 w-4" />
              </span>
            </motion.div>

            {/* Main title */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 12,
                delay: 0.4,
              }}
              className="text-6xl font-black tracking-tight text-white drop-shadow-lg sm:text-7xl md:text-8xl lg:text-9xl"
            >
              <span className="inline-block" style={{ textShadow: "3px 4px 0 rgba(0,0,0,0.15)" }}>
                NIÑOS
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="max-w-lg text-base font-medium text-white/90 sm:text-lg md:text-xl"
            >
              Ropa divertida, colorida y súper cómoda para los más pequeños de la casa.
              ¡Diseños que los encantarán!
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <Button
                asChild
                size="lg"
                className="mt-2 rounded-full bg-white px-8 text-base font-bold text-yellow-600 shadow-lg transition-all hover:bg-yellow-50 hover:shadow-xl"
              >
                <a href="#productos">
                  Ver Colección
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <WaveDivider color="#eab308" />

      {/* ── FEATURES SECTION ── */}
      <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h2 className="text-2xl font-black text-gray-800 sm:text-3xl">
            <span className="text-yellow-500">¿Por qué</span> elegirnos?
          </h2>
          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Todo lo que necesitan los peques, pensado con cariño
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureBadge
            icon={Droplets}
            title="Telas Suaves"
            description="Algodón premium suave al tacto, ideal para piel sensible"
            color="#22c55e"
            index={0}
          />
          <FeatureBadge
            icon={Palette}
            title="Divertido Diseño"
            description="Estampados coloridos y creativos que encantan a los niños"
            color="#eab308"
            index={1}
          />
          <FeatureBadge
            icon={ShieldCheck}
            title="Resistente al Lavado"
            description="Mantiene colores y forma lavado tras lavado"
            color="#38bdf8"
            index={2}
          />
        </div>
      </section>

      <WaveDivider color="#22c55e" flip />

      {/* ── PRODUCTS SECTION ── */}
      <section id="productos" className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h2 className="text-2xl font-black text-gray-800 sm:text-3xl">
            Nuestra{" "}
            <span
              className="inline-block bg-gradient-to-r from-yellow-400 via-green-400 to-sky-400 bg-clip-text text-transparent"
            >
              Colección
            </span>
          </h2>
          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Descubre las mejores prendas para niños
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, type: "spring", stiffness: 180, damping: 20 }}
        >
          <ProductGrid
            products={products}
            title=""
            variant="grid"
          />
        </motion.div>
      </section>

      {/* ── FUN BANNER ── */}
      <section className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <motion.div
          custom={0}
          variants={floatUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={wiggleHover}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-yellow-400 via-green-400 to-sky-400 p-8 text-center shadow-xl sm:p-12"
        >
          {/* Background decorative circles */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
            <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/10" />
            <div className="absolute left-1/3 top-1/4 h-20 w-20 rounded-full bg-white/5" />
          </div>

          <div className="relative z-10">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="mb-4 inline-block text-4xl sm:text-5xl"
            >
              🎉
            </motion.div>
            <h3 className="text-xl font-black text-white sm:text-2xl md:text-3xl">
              ¡Envío gratis en pedidos +$50.000!
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-white/80 sm:text-base">
              Sorprende a los peques con ropa increíble y recíbela en la puerta de tu casa
              sin costo adicional.
            </p>
            <Button
              asChild
              className="mt-6 rounded-full bg-white px-8 font-bold text-yellow-600 shadow-md transition-all hover:bg-yellow-50 hover:shadow-lg"
            >
              <Link href="/pedidos">
                Hacer pedido
                <Heart className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="mx-auto w-full max-w-5xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-3 text-center"
        >
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: i * 0.1 }}
              >
                <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              </motion.div>
            ))}
          </div>
          <p className="text-sm font-medium text-gray-500 sm:text-base">
            Miles de familias confían en Miss Semi Fashion
          </p>
          <p className="text-xs text-gray-400">4.8 ★ promedio en valoraciones</p>
        </motion.div>
      </section>

      {/* Bottom spacing */}
      <div className="h-4" />
    </div>
  );
}
