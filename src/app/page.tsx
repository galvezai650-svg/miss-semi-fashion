"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MessageCircle,
  Sparkles,
  Truck,
  ShieldCheck,
  RotateCcw,
  CreditCard,
  TrendingUp,
  ChevronRight,
  Star,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getBestSellers, getDeals } from "@/data/products";
import { categories } from "@/data/categories";
import ProductGrid from "@/components/amazon/ProductGrid";

const bestSellers = getBestSellers();
const deals = getDeals();

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const trustBadges = [
  {
    icon: Truck,
    title: "Envío Gratis",
    desc: "En compras +$50.000",
  },
  {
    icon: ShieldCheck,
    title: "Calidad Premium",
    desc: "Telas colombianas",
  },
  {
    icon: RotateCcw,
    title: "Devoluciones",
    desc: "30 días para devolver",
  },
  {
    icon: CreditCard,
    title: "Pago Seguro",
    desc: "Múltiples métodos",
  },
];

const featuredCollections = [
  {
    title: "Pijamas",
    description: "Descanso con estilo",
    image: "/images/cat-pijamas.png",
    href: "/categoria/pijamas",
    gradient: "from-pink-600/80 to-rose-400/80",
  },
  {
    title: "Blusas",
    description: "Elegancia en cada detalle",
    image: "/images/cat-blusas.png",
    href: "/categoria/blusas",
    gradient: "from-purple-600/80 to-violet-400/80",
  },
  {
    title: "Deportivo",
    description: "Rendimiento y confort",
    image: "/images/cat-deportivo.png",
    href: "/categoria/deportivo",
    gradient: "from-emerald-600/80 to-teal-400/80",
  },
  {
    title: "Pantalones",
    description: "Versatilidad total",
    image: "/images/cat-pantalones.png",
    href: "/categoria/pantalones",
    gradient: "from-amber-600/80 to-orange-400/80",
  },
];

const testimonials = [
  {
    name: "Laura M.",
    location: "Bogotá",
    text: "La mejor calidad en licra que he encontrado. Mis leggings no se transparentan y el diseño es hermoso.",
    rating: 5,
    product: "Leggings Premium",
  },
  {
    name: "Carolina S.",
    location: "Medellín",
    text: "El pijama trio es súper cómodo y la tela es suavísima. Ya es mi tercer pedido y siempre cumpliendo.",
    rating: 5,
    product: "Pijama Trio Dama",
  },
  {
    name: "Andrea P.",
    location: "Cali",
    text: "El vestido deportivo es perfecto para mi rutina. Se ajusta genial y la tela respira. 100% recomendado.",
    rating: 5,
    product: "Vestido Deportivo Licra",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ══════════════════════════════════════════
          HERO BANNER
          ══════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[420px] w-full sm:h-[480px] md:h-[520px] lg:h-[560px]">
          {/* Animated gradient background */}
          <div className="hero-gradient absolute inset-0 bg-gradient-to-br from-rose-900 via-pink-800 to-purple-900" />

          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-pink-400/30 blur-3xl" />
            <div className="absolute right-[15%] top-[40%] h-48 w-48 rounded-full bg-purple-400/30 blur-3xl" />
            <div className="absolute bottom-[10%] left-[30%] h-56 w-56 rounded-full bg-rose-400/20 blur-3xl" />
          </div>

          {/* Hero image */}
          <Image
            src="/images/hero.png"
            alt="Miss Semi Fashion"
            fill
            priority
            className="object-cover mix-blend-overlay opacity-50"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="max-w-xl"
              >
                <Badge className="mb-4 border-0 bg-white/15 px-3 py-1 text-sm font-medium text-white backdrop-blur-md">
                  <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                  Nueva Colección 2024
                </Badge>

                <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl">
                  Confeccionamos
                  <span className="mt-1 block text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-amber-200">
                    prendas de calidad
                  </span>
                  <span className="mt-1 block text-white/90">para ti</span>
                </h1>

                <p className="mb-6 max-w-md text-base text-white/75 sm:text-lg">
                  Pijamas, blusas, vestidos deportivos y más — hechos en
                  Colombia con amor y las mejores telas.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="h-12 rounded-xl bg-white px-6 text-base font-bold text-rose-900 shadow-xl shadow-black/20 transition-all hover:bg-white/90 hover:shadow-2xl"
                  >
                    <Link href="/categoria/deportivo">
                      Comprar Ahora
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-12 rounded-xl border-white/30 bg-white/10 px-6 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white"
                  >
                    <Link href="/ofertas">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Ver Ofertas
                    </Link>
                  </Button>
                </div>

                {/* Social proof */}
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/50 bg-gradient-to-br from-pink-400 to-rose-500 text-[10px] font-bold text-white"
                      >
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-white/70">
                    <span className="font-semibold text-white">+2,500</span>{" "}
                    clientas felices
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TRUST BADGES
          ══════════════════════════════════════════ */}
      <section className="relative z-10 -mt-6">
        <div className="mx-auto max-w-5xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="grid grid-cols-2 gap-3 rounded-2xl border border-border/50 bg-card p-4 shadow-xl shadow-black/5 sm:gap-0 sm:p-2 md:grid-cols-4 md:divide-x md:divide-border"
          >
            {trustBadges.map((badge, i) => (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-3 px-4 py-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <badge.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">
                    {badge.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {badge.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURED COLLECTIONS
          ══════════════════════════════════════════ */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.div variants={fadeInUp} custom={0} className="mb-6">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Explora Colecciones
            </h2>
            <p className="mt-1 text-muted-foreground">
              Encuentra el estilo perfecto para cada momento
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
            {featuredCollections.map((col, i) => (
              <motion.div
                key={col.title}
                variants={fadeInUp}
                custom={i + 1}
              >
                <Link href={col.href} className="group block">
                  <div className="relative overflow-hidden rounded-2xl aspect-[3/4]">
                    <Image
                      src={col.image}
                      alt={col.title}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${col.gradient} transition-opacity duration-300 group-hover:opacity-90`}
                    />
                    {/* Decorative pattern overlay */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,white_1px,transparent_1px),radial-gradient(circle_at_70%_60%,white_1px,transparent_1px),radial-gradient(circle_at_50%_80%,white_1px,transparent_1px)] bg-[length:20px_20px]" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <h3 className="text-xl font-bold text-white drop-shadow-lg sm:text-2xl">
                        {col.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-white/80">
                        {col.description}
                      </p>
                      <div className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-white transition-all group-hover:gap-2.5">
                        Explorar
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="section-divider" />
      </div>

      {/* ══════════════════════════════════════════
          BEST SELLERS
          ══════════════════════════════════════════ */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          custom={0}
          variants={fadeInUp}
        >
          <ProductGrid
            products={bestSellers}
            title="Más Vendidos"
            subtitle="Las favoritas de nuestras clientas"
            viewAllHref="/ofertas"
          />
        </motion.div>
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="section-divider" />
      </div>

      {/* ══════════════════════════════════════════
          DEALS OF THE DAY
          ══════════════════════════════════════════ */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          custom={0}
          variants={fadeInUp}
        >
          <ProductGrid
            products={deals}
            title="Ofertas del Día"
            subtitle="Precios especiales por tiempo limitado"
            viewAllHref="/ofertas"
          />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          PROMO BANNER
          ══════════════════════════════════════════ */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Gradient bg */}
          <div className="hero-gradient bg-gradient-to-r from-emerald-700 via-green-600 to-teal-500" />

          {/* Decorative circles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-16 left-1/3 h-48 w-48 rounded-full bg-white/5 blur-2xl" />
          </div>

          <div className="relative flex flex-col items-center gap-6 px-6 py-12 text-center md:flex-row md:px-12 md:text-left">
            <div className="flex-1 space-y-4">
              <Badge className="border-0 bg-white/15 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                Programa Mayorista
              </Badge>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Emprende con nosotros
              </h2>
              <p className="max-w-xl text-base text-white/80 sm:text-lg">
                ¿Quieres vender ropa de calidad? Precios exclusivos con pedidos
                desde 6 unidades. Confeccionamos prendas en licra colombiana,
                algodón y más.
              </p>
              <div className="flex flex-col items-center gap-3 sm:flex-row md:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-xl bg-white px-6 text-base font-bold text-green-700 shadow-xl shadow-black/20 transition-all hover:bg-white/90"
                >
                  <a
                    href="https://wa.me/573108416620?text=Hola%2C%20me%20interesa%20comprar%20al%20mayor"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    WhatsApp
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-xl border-white/30 bg-white/10 px-6 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white"
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
                width={280}
                height={280}
                className="rounded-3xl opacity-60 mix-blend-luminosity drop-shadow-2xl"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS
          ══════════════════════════════════════════ */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.div variants={fadeInUp} custom={0} className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Lo que dicen nuestras clientas
            </h2>
            <p className="mt-1 text-muted-foreground">
              Miles de mujeres confían en Miss Semi Fashion
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                variants={fadeInUp}
                custom={i + 1}
                className="group relative rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
              >
                {/* Quote mark */}
                <div className="absolute -top-3 left-6 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-xs font-bold">&quot;</span>
                </div>

                <div className="mb-4 flex items-center gap-3 pt-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-sm font-bold text-primary-foreground">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.location} · {testimonial.product}
                    </p>
                  </div>
                </div>

                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          CTA BANNER
          ══════════════════════════════════════════ */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-card border border-border/50 p-8 text-center sm:p-12"
        >
          {/* Decorative bg */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-primary/5 blur-3xl" />
          </div>

          <div className="relative">
            <div className="mb-3 flex items-center justify-center gap-2 text-primary">
              <Clock className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Atención personalizada
              </span>
            </div>
            <h2 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl">
              ¿Tienes dudas o necesitas ayuda?
            </h2>
            <p className="mx-auto mb-6 max-w-lg text-muted-foreground">
              Nuestro equipo está listo para ayudarte a elegir la talla perfecta
              o resolver cualquier pregunta sobre nuestros productos.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-xl bg-green-500 px-8 text-base font-bold text-white shadow-lg shadow-green-500/25 transition-all hover:bg-green-600 hover:shadow-xl hover:shadow-green-500/30"
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
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-xl px-8 text-base font-semibold"
              >
                <Link href="/ayuda">Centro de Ayuda</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Bottom spacer */}
      <div className="h-4" />
    </div>
  );
}
