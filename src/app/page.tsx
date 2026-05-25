"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductGrid from "@/components/amazon/ProductGrid";
import type { Product } from "@/data/products";
import { useLiveFetch } from "@/hooks/useLiveFetch";

const categoryLinks = [
  { name: "Hombre", href: "/hombre", image: "/images/hero-hombre.png" },
  { name: "Lencería", href: "/lenceria", image: "/images/hero-lenceria.png" },
  { name: "Niños", href: "/ninos", image: "/images/hero-ninos.png" },
  { name: "Adornos", href: "/adornos", image: "/images/hero-adornos.png" },
  { name: "Hogar", href: "/hogar", image: "/images/hero-hogar.png" },
  { name: "Ofertas", href: "/ofertas", image: "/images/hero.png" },
];

const trustItems = [
  { icon: Truck, title: "Envío Gratis", desc: "En compras +$50.000" },
  { icon: ShieldCheck, title: "Calidad Premium", desc: "Telas colombianas" },
  { icon: RotateCcw, title: "Devoluciones", desc: "30 días para devolver" },
  { icon: Star, title: "Compra Segura", desc: "Pago protegido" },
];

const testimonials = [
  {
    name: "Laura M.",
    location: "Bogotá",
    text: "La mejor calidad en licra que he encontrado. Mis leggings no se transparentan y el diseño es hermoso.",
    rating: 5,
  },
  {
    name: "Carolina S.",
    location: "Medellín",
    text: "El pijama trio es súper cómodo y la tela es suavísima. Ya es mi tercer pedido y siempre cumpliendo.",
    rating: 5,
  },
  {
    name: "Andrea P.",
    location: "Cali",
    text: "El vestido deportivo es perfecto para mi rutina. Se ajusta genial y la tela respira. 100% recomendado.",
    rating: 5,
  },
];

/* ──────────────────────────────────────────────
   Animation Variants
   ────────────────────────────────────────────── */

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
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ──────────────────────────────────────────────
   Page Component
   ────────────────────────────────────────────── */

export default function HomePage() {
  const { data: bestSellers } = useLiveFetch<Product>("/api/products?bestSellers=true");
  const { data: deals } = useLiveFetch<Product>("/api/products?deals=true");

  return (
    <div className="flex flex-col" style={{ background: "transparent" }}>
      {/* ══════════════════════════════════════════
          1. HERO SECTION
          ══════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[520px] w-full sm:h-[580px] md:h-[640px] lg:h-[720px]">
          {/* Background Video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
            poster="/images/hero.png"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[#0A0A0A]/70" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="mx-auto w-full max-w-4xl px-6 text-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="flex flex-col items-center"
              >
                {/* Gold line decoration */}
                <motion.div
                  variants={fadeUp}
                  custom={0}
                  className="mb-6 h-[1px] w-12 bg-[#C6A962]"
                />

                {/* Subheading in gold */}
                <motion.p
                  variants={fadeUp}
                  custom={1}
                  className="mb-4 text-sm font-medium tracking-[0.3em] text-[#C6A962] uppercase sm:text-base"
                >
                  Moda Premium Colombia
                </motion.p>

                {/* Main heading */}
                <motion.h1
                  variants={fadeUp}
                  custom={2}
                  className="mb-5 font-serif text-4xl font-normal leading-tight tracking-[0.15em] text-white uppercase sm:text-5xl md:text-6xl lg:text-7xl"
                >
                  Miss Semi Fashion
                </motion.h1>

                {/* Description */}
                <motion.p
                  variants={fadeUp}
                  custom={3}
                  className="mx-auto mb-10 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg"
                >
                  Descubre nuestra colección exclusiva de prendas
                  confeccionadas en Colombia con las mejores telas y diseño.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  variants={fadeUp}
                  custom={4}
                  className="flex flex-col items-center gap-4 sm:flex-row"
                >
                  <Button
                    asChild
                    size="lg"
                    className="h-12 w-full rounded-none bg-[#C6A962] px-10 text-sm font-semibold tracking-wider text-[#0A0A0A] uppercase transition-all duration-300 hover:bg-[#D4AF37] sm:w-auto"
                  >
                    <Link href="/ofertas">
                      Comprar Ahora
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="h-12 w-full rounded-none border border-white/30 bg-transparent px-10 text-sm font-semibold tracking-wider text-white uppercase transition-all duration-300 hover:border-[#C6A962] hover:bg-white/5 sm:w-auto"
                  >
                    <Link href="/ofertas">
                      Ver Colecciones
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute inset-x-0 bottom-8 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ChevronRight className="h-6 w-6 rotate-90 text-[#C6A962]/60" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. CATEGORY NAVIGATION
          ══════════════════════════════════════════ */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
        >
          {/* Section heading */}
          <motion.div variants={fadeUp} custom={0} className="mb-10 text-center">
            <h2 className="font-serif text-2xl font-normal tracking-wide text-[#E5E5E5] sm:text-3xl">
              Explora Categorías
            </h2>
            <div className="mx-auto mt-4 h-[1px] w-10 bg-[#C6A962]" />
          </motion.div>

          {/* Category grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
            {categoryLinks.map((cat, i) => (
              <motion.div key={cat.name} variants={fadeUp} custom={i + 1}>
                <Link href={cat.href} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden border border-[#2A2A2A]">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16.66vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-[#0A0A0A]/50 transition-all duration-500 group-hover:bg-[#0A0A0A]/30" />

                    {/* Centered text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-serif text-lg font-normal tracking-wider text-white uppercase sm:text-xl">
                        {cat.name}
                      </span>
                    </div>

                    {/* Gold underline on hover */}
                    <div className="absolute inset-x-0 bottom-6 flex justify-center">
                      <div className="h-[1px] w-0 bg-[#C6A962] transition-all duration-500 group-hover:w-8" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          3. TRUST BAR
          ══════════════════════════════════════════ */}
      <section className="border-y border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 py-8 md:grid-cols-4 md:gap-0 md:divide-x md:divide-[#2A2A2A]">
            {trustItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex items-center gap-3 md:px-6 md:first:pl-0 md:last:pr-0"
              >
                <item.icon className="h-5 w-5 shrink-0 text-[#C6A962]" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-medium tracking-wide text-[#E5E5E5]">
                    {item.title}
                  </p>
                  <p className="text-xs text-[#666]">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. BEST SELLERS
          ══════════════════════════════════════════ */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
          custom={0}
        >
          <ProductGrid
            products={bestSellers}
            title="Más Vendidos"
            subtitle="Las favoritas de nuestras clientas"
            viewAllHref="/ofertas"
            variant="scroll"
          />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          5. ELEGANT BANNER
          ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-black/40 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col items-center gap-10 py-16 md:flex-row md:py-20 lg:py-24"
          >
            {/* Left content */}
            <div className="flex-1 text-center md:text-left">
              {/* Gold decorative line */}
              <div className="mb-6 h-[1px] w-10 bg-[#C6A962] md:ml-0" />

              <p className="mb-3 text-xs font-medium tracking-[0.3em] text-[#C6A962] uppercase sm:text-sm">
                Nueva Colección
              </p>

              <h2 className="mb-5 font-serif text-3xl font-normal tracking-wide text-white sm:text-4xl lg:text-5xl">
                Colección 2024
              </h2>

              <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-[#888] sm:text-base md:mx-0">
                Prendas diseñadas con pasión y confeccionadas con las mejores
                telas colombianas. Descubre la nueva temporada con estilo y
                sofisticación.
              </p>

              <Button
                asChild
                className="h-11 rounded-none bg-[#C6A962] px-8 text-sm font-semibold tracking-wider text-[#0A0A0A] uppercase transition-all duration-300 hover:bg-[#D4AF37]"
              >
                <Link href="/ofertas">
                  Descubrir
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Right image */}
            <div className="relative w-full max-w-sm shrink-0 md:max-w-md">
              <div className="relative aspect-[3/4] overflow-hidden border border-[#2A2A2A]">
                <Image
                  src="/images/hero.png"
                  alt="Colección 2024"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[#0A0A0A]/10" />
              </div>
              {/* Gold accent line at bottom */}
              <div className="absolute -bottom-0 left-1/2 h-[2px] w-16 -translate-x-1/2 bg-[#C6A962] md:left-0 md:translate-x-0" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. DEALS
          ══════════════════════════════════════════ */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
          custom={0}
        >
          <ProductGrid
            products={deals}
            title="Ofertas Especiales"
            subtitle="Precios exclusivos por tiempo limitado"
            viewAllHref="/ofertas"
            variant="scroll"
          />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          7. TESTIMONIALS
          ══════════════════════════════════════════ */}
      <section className="bg-black/40 backdrop-blur-xl py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
          >
            {/* Section heading */}
            <motion.div variants={fadeUp} custom={0} className="mb-12 text-center">
              <h2 className="font-serif text-2xl font-normal tracking-wide text-[#E5E5E5] sm:text-3xl">
                Lo que dicen nuestras clientas
              </h2>
              <div className="mx-auto mt-4 h-[1px] w-10 bg-[#C6A962]" />
            </motion.div>

            {/* Testimonial cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={testimonial.name}
                  variants={fadeUp}
                  custom={i + 1}
                  className="relative border border-white/10 bg-black/50 backdrop-blur-md p-8 transition-all duration-500 hover:border-[#C6A962]/30"
                >
                  {/* Gold quote mark */}
                  <span className="mb-5 block font-serif text-4xl leading-none text-[#C6A962]">
                    &ldquo;
                  </span>

                  {/* Text */}
                  <p className="mb-6 text-sm leading-relaxed text-[#999]">
                    {testimonial.text}
                  </p>

                  {/* Divider */}
                  <div className="mb-5 h-[1px] w-full bg-[#2A2A2A]" />

                  {/* Rating */}
                  <div className="mb-3 flex gap-0.5">
                    {Array.from({ length: testimonial.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="h-3.5 w-3.5 fill-[#C6A962] text-[#C6A962]"
                      />
                    ))}
                  </div>

                  {/* Name & Location */}
                  <p className="text-sm font-medium tracking-wide text-[#E5E5E5]">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-[#666]">{testimonial.location}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          8. CTA SECTION — WHATSAPP
          ══════════════════════════════════════════ */}
      <section className="py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mx-auto max-w-xl px-4 text-center sm:px-6"
        >
          {/* Gold line */}
          <div className="mx-auto mb-6 h-[1px] w-10 bg-[#C6A962]" />

          <h2 className="mb-3 font-serif text-2xl font-normal tracking-wide text-[#E5E5E5] sm:text-3xl">
            ¿Necesitas ayuda?
          </h2>

          <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-[#666]">
            Nuestro equipo está listo para asesorarte en la elección perfecta.
            Escríbenos y recibe atención personalizada.
          </p>

          <Button
            asChild
            size="lg"
            className="h-12 rounded-none bg-[#25D366] px-10 text-sm font-semibold tracking-wider text-white uppercase transition-all duration-300 hover:bg-[#1EBE57]"
          >
            <a
              href="https://wa.me/573108416620?text=Hola%2C%20necesito%20ayuda%20con%20mi%20pedido"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Escríbenos por WhatsApp
            </a>
          </Button>
        </motion.div>
      </section>

      {/* Bottom spacer */}
      <div className="h-4" />
    </div>
  );
}
