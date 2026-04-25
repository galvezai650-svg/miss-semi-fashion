"use client";

import { motion } from "framer-motion";
import {
  Heart,
  Truck,
  Users,
  Ruler,
  Sparkles,
  ShieldCheck,
  Gem,
  MessageCircle,
} from "lucide-react";
import Breadcrumbs from "@/components/amazon/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const stats = [
  {
    icon: Sparkles,
    value: "Premium",
    label: "Confeccion",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: Users,
    value: "73+",
    label: "Seguidores",
    color: "bg-pink-100 text-pink-600",
  },
  {
    icon: Truck,
    value: "Nacional/Intl",
    label: "Envios",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Ruler,
    value: "S - XL",
    label: "Tallas",
    color: "bg-purple-100 text-purple-600",
  },
];

const values = [
  {
    icon: Gem,
    title: "Calidad",
    description:
      "Cada prenda es confeccionada con materiales de primera calidad, garantizando durabilidad, comodidad y un acabado impecable.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: ShieldCheck,
    title: "Confianza",
    description:
      "Mas de 73 clientes satisfechos nos respaldan. Cumplimos con lo prometido: entregas puntuales y productos excepcionales.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Sparkles,
    title: "Estilo",
    description:
      "Diseños modernos y a la vanguardia de las tendencias de moda colombiana. Siempre frescas, siempre unicas.",
    color: "bg-purple-100 text-purple-600",
  },
];

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <Breadcrumbs
            items={[{ label: "Inicio", href: "/" }, { label: "Conocenos" }]}
          />
        </div>
      </div>

      {/* Hero */}
      <section className="relative">
        <div className="relative h-[400px] w-full overflow-hidden bg-gradient-to-r from-pink-600 to-orange-500 md:h-[500px]">
          <Image
            src="/images/about.png"
            alt="Miss Semi Fashion"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center px-4"
            >
              <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
                Sobre Miss Semi Fashion
              </h1>
              <p className="mx-auto max-w-xl text-lg text-white/90">
                Moda colombiana con calidad premium, estilo unico y pasion por
                hacer que cada mujer se sienta especial.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-pink-100 to-orange-100">
              <Image
                src="/images/about.png"
                alt="Nuestra historia"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
              Nuestra Historia
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Miss Semi Fashion nacio de la pasion por la moda colombiana y el
                deseo de ofrecer prendas de calidad a precios accesibles. Lo que
                comenzo como un pequeno emprendimiento hoy se ha convertido en
                una marca reconocida con mas de 73 clientes satisfechos.
              </p>
              <p>
                Nuestra mision es vestir a la mujer colombiana con estilo,
                comodidad y confianza. Cada una de nuestras prendas es
                cuidadosamente seleccionada y confeccionada con los mas altos
                estandares de calidad.
              </p>
              <p>
                Creemos que la moda es una forma de expresion y que cada mujer
                merece sentirse hermosa y segura. Por eso trabajamos
                incansablemente para traerte las ultimas tendencias con la mejor
                relacion calidad-precio del mercado.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-card py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div
                    className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full ${stat.color}`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
            Nuestros Valores
          </h2>
          <p className="text-muted-foreground">Lo que nos define como marca</p>
        </motion.div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center transition-shadow hover:shadow-lg">
                  <CardContent className="pt-6">
                    <div
                      className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full ${value.color}`}
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-pink-600 to-orange-500 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Heart className="mx-auto mb-4 h-10 w-10 text-white/80" />
            <h2 className="mb-4 text-3xl font-bold text-white">
              Quieres conocer mas?
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-white/90">
              Escribenos por WhatsApp y con gusto te atenderemos. Estamos para
              ayudarte con cualquier consulta.
            </p>
            <a
              href="https://wa.me/573108416620"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="gap-2 bg-white text-pink-600 hover:bg-white/90"
              >
                <MessageCircle className="h-5 w-5" />
                Contactanos por WhatsApp
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
