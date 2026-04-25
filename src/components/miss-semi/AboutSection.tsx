"use client";

import { Badge } from "@/components/ui/badge";
import { Users, Globe, Scissors, Ruler } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const stats = [
  { icon: Scissors, label: "Confeccion Artesanal", value: "Premium" },
  { icon: Users, label: "Seguidores", value: "73+" },
  { icon: Globe, label: "Envios", value: "Nacionales/Intl" },
  { icon: Ruler, label: "Tallas", value: "S - XL" },
];

export default function AboutSection() {
  return (
    <section id="nosotros" className="py-20 md:py-28 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-primary/10">
              <Image
                src="/images/about.png"
                alt="Taller de confeccion Miss Semi Fashion"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 md:bottom-6 md:right-[-2rem] bg-primary text-primary-foreground rounded-2xl p-4 shadow-xl animate-float">
              <div className="text-center">
                <span className="text-3xl font-bold block">20+</span>
                <span className="text-xs opacity-90">Publicaciones</span>
              </div>
            </div>
            {/* Decorative */}
            <div className="absolute -top-3 -left-3 w-24 h-24 bg-primary/10 rounded-2xl -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          >
            <Badge
              variant="secondary"
              className="mb-4 px-3 py-1.5 text-xs font-medium bg-primary/10 text-primary border-primary/20"
            >
              Sobre Nosotros
            </Badge>

            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Somos{" "}
              <span className="gradient-text">Miss Semi Fashion</span>
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Somos una marca colombiana apasionada por la confeccion de ropa
                femenina premium. Trabajamos con las mejores telas:{" "}
                <strong className="text-foreground">
                  licra colombiana, piel durazno
                </strong>{" "}
                y materiales de alta calidad que garantizan comodidad y estilo.
              </p>
              <p>
                Nuestra comunidad cuenta con{" "}
                <strong className="text-foreground">73 seguidores</strong> y
                mas de <strong className="text-foreground">20 publicaciones</strong>{" "}
                que reflejan nuestro compromiso con la moda. Realizamos ventas
                tanto nacionales como internacionales, llevando lo mejor de la
                confeccion colombiana al mundo.
              </p>
              <p>
                Ofrecemos tallas desde la <strong className="text-foreground">S hasta XL</strong>,
                asegurando que cada mujer encuentre su talla perfecta. Ya sea
                para uso personal o para emprender tu propio negocio, estamos
                aqui para ayudarte.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
