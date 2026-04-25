"use client";

import { motion } from "framer-motion";
import { Briefcase, MessageCircle } from "lucide-react";
import Breadcrumbs from "@/components/amazon/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function EmpleoPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <Breadcrumbs
            items={[{ label: "Inicio", href: "/" }, { label: "Empleo" }]}
          />
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-3"
        >
          <Briefcase className="h-7 w-7 text-orange-500" />
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Trabaja con Nosotros
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="space-y-6 p-6 md:p-8">
              <div>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  Unete al equipo Miss Semi Fashion
                </h2>
                <p className="text-muted-foreground">
                  En Miss Semi Fashion siempre estamos buscando personas
                  apasionadas por la moda, creativas y comprometidas con la
                  excelencia. Si te identificas con nuestra marca y quieres ser
                  parte de nuestro crecimiento, queremos conocerte.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-semibold text-foreground">
                  Perfil que buscamos
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                    Pasión por la moda y las tendencias.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                    Excelente actitud de servicio al cliente.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                    Creatividad y proactividad.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                    Compromiso y responsabilidad.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                    Disponibilidad para trabajar en equipo.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-semibold text-foreground">
                  Como aplicar
                </h3>
                <p className="text-muted-foreground">
                  Envia tu hoja de vida junto con una breve descripcion de por
                  que quieres ser parte de nuestro equipo a traves de WhatsApp.
                  Te responderemos lo antes posible.
                </p>
              </div>

              <div className="rounded-lg bg-orange-50 p-4">
                <p className="mb-4 text-sm text-foreground">
                  <strong>Nota:</strong> Actualmente estamos reclutando para
                  diversas posiciones. Aplica ahora y se parte de la familia
                  Miss Semi Fashion.
                </p>
                <a
                  href="https://wa.me/573108416620?text=Hola%2C%20me%20interesa%20trabajar%20con%20ustedes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button className="gap-2 bg-green-500 hover:bg-green-600">
                    <MessageCircle className="h-4 w-4" />
                    Enviar CV por WhatsApp
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
