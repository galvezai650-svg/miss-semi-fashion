"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Truck, Award, Ruler, ChevronRight, Shield } from "lucide-react";
import { getProductsByCategory } from "@/data/products";
import Breadcrumbs from "@/components/amazon/Breadcrumbs";
import ProductGrid from "@/components/amazon/ProductGrid";
import { Button } from "@/components/ui/button";

const hombreProducts = getProductsByCategory("hombre");

/* ── Animation Variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ── Feature Badges ── */
const features = [
  {
    icon: Truck,
    title: "Envío Gratis",
    desc: "En pedidos superiores a $50.000",
  },
  {
    icon: Award,
    title: "Telas Premium",
    desc: "Algodón y lino de alta calidad",
  },
  {
    icon: Ruler,
    title: "Todas las Tallas",
    desc: "S, M, L, XL, XXL disponibles",
  },
];

/* ── Category Subcategories ── */
const subcategories = [
  { name: "Camisas", count: 1, href: "/buscar?q=camisa+hombre" },
  { name: "Pantalones", count: 1, href: "/buscar?q=pantalon+hombre" },
  { name: "Conjuntos", count: 1, href: "/buscar?q=conjunto+hombre" },
];

export default function HombrePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* ════════════════════════════════════════════════════════════
          HERO SECTION
          ════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden" style={{ height: "clamp(320px, 50vw, 520px)" }}>
        {/* Background Image */}
        <Image
          src="/images/hero-hombre.png"
          alt="Moda Hombre - Miss Semi Fashion"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />

        {/* Dark Navy Overlay with Geometric Pattern */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(15,23,42,0.92) 0%, rgba(30,41,59,0.85) 40%, rgba(51,65,85,0.78) 100%)",
          }}
        />

        {/* Geometric Accent Lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-20 -right-20 w-[500px] h-[500px] border border-[#3b82f6]/10"
            style={{ transform: "rotate(45deg)" }}
          />
          <div
            className="absolute -top-10 -right-10 w-[400px] h-[400px] border border-[#3b82f6]/5"
            style={{ transform: "rotate(45deg)" }}
          />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#3b82f6]/40 to-transparent" />
          <div className="absolute top-8 left-0 w-24 h-px bg-[#3b82f6]/30" />
          <div className="absolute bottom-8 right-0 w-24 h-px bg-[#3b82f6]/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Top Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-none border border-[#3b82f6]/30 bg-[#3b82f6]/10 px-4 py-1.5">
              <Shield className="h-4 w-4 text-[#3b82f6]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3b82f6]">
                Colección 2024
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="font-black uppercase tracking-[0.15em] text-white drop-shadow-lg"
            style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", lineHeight: 1 }}
          >
            Moda
            <span className="block mt-1" style={{ color: "#3b82f6" }}>
              Hombre
            </span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mt-4 mb-5 h-px w-32 bg-gradient-to-r from-transparent via-[#3b82f6] to-transparent origin-center"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-xl text-sm sm:text-base text-slate-300 leading-relaxed"
          >
            Descubre la nueva colección masculina. Diseños modernos con telas premium
            que combinan elegancia y comodidad para el hombre contemporáneo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-6 flex gap-3"
          >
            <Button
              asChild
              className="rounded-none bg-[#3b82f6] px-8 py-2.5 font-bold uppercase tracking-wider text-white hover:bg-[#2563eb]"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            >
              <Link href="#productos">
                Ver Colección
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-none border-slate-500 bg-transparent px-8 py-2.5 font-bold uppercase tracking-wider text-white hover:bg-white/10"
            >
              <Link href="#categorias">Categorías</Link>
            </Button>
          </motion.div>
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
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-3 sm:grid-cols-3 mb-8"
        >
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              variants={fadeUp}
              custom={i}
              className="group relative flex items-center gap-4 border border-slate-200 bg-slate-50 px-5 py-4 transition-all duration-300 hover:border-[#3b82f6]/30 hover:bg-[#3b82f6]/5 hover:shadow-lg hover:shadow-[#3b82f6]/5"
            >
              {/* Left accent bar on hover */}
              <div className="absolute left-0 top-0 h-full w-1 bg-[#3b82f6] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />
              <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#1e293b] text-[#3b82f6] transition-colors group-hover:bg-[#3b82f6] group-hover:text-white">
                <feat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-[#1e293b] tracking-wide uppercase">
                  {feat.title}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{feat.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          SUBCATEGORY QUICK LINKS
          ════════════════════════════════════════════════════════════ */}
      <section id="categorias" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-6 w-1 bg-[#3b82f6]" />
            <h2 className="text-lg font-bold uppercase tracking-wider text-[#1e293b]">
              Categorías
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {subcategories.map((sub, i) => (
              <motion.div
                key={sub.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Link
                  href={sub.href}
                  className="group relative flex items-center justify-between border border-slate-200 bg-white px-5 py-4 transition-all duration-300 hover:border-[#1e293b] hover:bg-[#1e293b] hover:text-white"
                >
                  <div>
                    <p className="font-bold text-sm uppercase tracking-wide">{sub.name}</p>
                    <p className="text-xs text-slate-400 group-hover:text-slate-300 mt-0.5">
                      {sub.count} producto{sub.count !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-[#3b82f6] transition-colors" />
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 h-0 w-0 border-t-[20px] border-t-[#3b82f6] border-l-[20px] border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          PRODUCTS SECTION
          ════════════════════════════════════════════════════════════ */}
      <section id="productos" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="h-6 w-1 bg-[#3b82f6]" />
            <h2 className="text-lg font-bold uppercase tracking-wider text-[#1e293b]">
              Nuestra Colección
            </h2>
          </div>
          <p className="text-sm text-slate-500 ml-7">
            {hombreProducts.length} producto{hombreProducts.length !== 1 ? "s" : ""} disponible{hombreProducts.length !== 1 ? "s" : ""} para hombre
          </p>
        </motion.div>

        {/* Product Grid - Masculine Wrapper */}
        <div className="relative">
          {/* Geometric corner accents */}
          <div className="absolute -top-3 -left-3 h-8 w-8 border-t-2 border-l-2 border-[#1e293b]/20" />
          <div className="absolute -top-3 -right-3 h-8 w-8 border-t-2 border-r-2 border-[#1e293b]/20" />
          <div className="absolute -bottom-3 -left-3 h-8 w-8 border-b-2 border-l-2 border-[#1e293b]/20" />
          <div className="absolute -bottom-3 -right-3 h-8 w-8 border-b-2 border-r-2 border-[#1e293b]/20" />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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
          STYLE BANNER CTA
          ════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: "#0f172a" }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #3b82f6 0px, #3b82f6 1px, transparent 1px, transparent 30px), repeating-linear-gradient(-45deg, #3b82f6 0px, #3b82f6 1px, transparent 1px, transparent 30px)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
          >
            {/* Left text */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#3b82f6] mb-3">
                Estilo que marca la diferencia
              </p>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-wide text-white leading-tight">
                Tu look dice
                <span className="text-[#3b82f6]"> todo</span> de ti
              </h3>
              <p className="mt-4 text-slate-400 text-sm sm:text-base max-w-md leading-relaxed">
                Cada prenda está diseñada para el hombre que no sigue tendencias,
                las crea. Calidad premium con la confianza que mereces.
              </p>
              <div className="mt-6 flex gap-3 justify-center md:justify-start">
                <Button
                  asChild
                  className="rounded-none bg-[#3b82f6] px-7 py-2.5 font-bold uppercase tracking-wider text-white hover:bg-[#2563eb]"
                >
                  <Link href="/buscar?q=hombre">
                    Explorar Todo
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right stats */}
            <div className="grid grid-cols-3 gap-6 text-center">
              {[
                { value: "500+", label: "Clientes felices" },
                { value: "100%", label: "Telas premium" },
                { value: "24h", label: "Envío rápido" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                >
                  <p className="text-2xl sm:text-3xl font-black text-[#3b82f6]">
                    {stat.value}
                  </p>
                  <p className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#1e293b] via-[#3b82f6] to-[#1e293b]" />
      </section>
    </main>
  );
}
