"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBestSellers, getDeals } from "@/data/products";
import { categories } from "@/data/categories";
import ProductGrid from "@/components/amazon/ProductGrid";

const bestSellers = getBestSellers();
const deals = getDeals();

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ── Hero Banner ── */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative w-full"
      >
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-gradient-to-r from-rose-900 via-rose-700 to-pink-600">
          <Image
            src="/images/hero.png"
            alt="Miss Semi Fashion - Confeccionamos prendas de calidad para ti"
            fill
            priority
            className="object-cover mix-blend-overlay opacity-60"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/30 px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="max-w-3xl text-3xl font-extrabold tracking-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl"
            >
              Confeccionamos prendas de calidad para ti
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="max-w-xl text-sm text-white/90 sm:text-base md:text-lg"
            >
              Pijamas, blusas, vestidos deportivos y más — hechos en Colombia con amor.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Button
                asChild
                size="lg"
                className="mt-2 bg-amber-500 text-base font-bold text-white hover:bg-amber-600"
              >
                <Link href="/categoria/deportivo">
                  Comprar Ahora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ── Categories Grid ── */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
          variants={fadeInUp}
          className="mb-6 text-2xl font-bold text-foreground sm:text-3xl"
        >
          Explora por Categoría
        </motion.h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={i + 1}
              variants={fadeInUp}
            >
              <Link href={`/categoria/${cat.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <h3 className="text-lg font-bold text-white drop-shadow">
                        {cat.name}
                      </h3>
                      <p className="text-sm text-white/80">
                        {cat.productCount} producto{cat.productCount !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Best Sellers ── */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          custom={0}
          variants={fadeInUp}
        >
          <ProductGrid
            products={bestSellers}
            title="Más vendidos"
            viewAllHref="/ofertas"
          />
        </motion.div>
      </section>

      {/* ── Deals ── */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          custom={0}
          variants={fadeInUp}
        >
          <ProductGrid
            products={deals}
            title="Ofertas del día"
            viewAllHref="/ofertas"
          />
        </motion.div>
      </section>

      {/* ── Mayorista / Wholesale Banner ── */}
      <section className="relative w-full">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
          variants={fadeInUp}
          className="relative overflow-hidden bg-gradient-to-r from-green-700 via-emerald-600 to-teal-500"
        >
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <Sparkles className="h-6 w-6 text-yellow-300" />
                <h2 className="text-2xl font-extrabold text-white sm:text-3xl md:text-4xl">
                  Emprende con nosotros
                </h2>
              </div>
              <p className="max-w-xl text-sm text-white/90 sm:text-base md:text-lg">
                ¿Quieres vender ropa de calidad? Ofrecemos precios mayoristas
                exclusivos con pedidos desde 6 unidades. Confeccionamos prendas
                en licra colombiana, algodón y más. ¡Gana dinero con Miss Semi
                Fashion!
              </p>
              <div className="flex flex-col items-center gap-3 sm:flex-row md:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="bg-green-500 text-base font-bold text-white hover:bg-green-400"
                >
                  <a
                    href="https://wa.me/573108416620?text=Hola%2C%20me%20interesa%20comprar%20al%20mayor"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Contacta por WhatsApp
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/40 bg-white/10 text-base font-semibold text-white backdrop-blur hover:bg-white/20 hover:text-white"
                >
                  <Link href="/mayorista">
                    Ver Mayorista
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden flex-shrink-0 md:block">
              <Image
                src="/images/hero.png"
                alt="Ventas al mayor"
                width={300}
                height={300}
                className="rounded-2xl opacity-80 mix-blend-luminosity"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Bottom spacer */}
      <div className="h-8" />
    </div>
  );
}
