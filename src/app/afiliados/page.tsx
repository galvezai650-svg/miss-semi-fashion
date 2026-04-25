"use client";

import { motion } from "framer-motion";
import { Handshake, MessageCircle, DollarSign, Users, Share2 } from "lucide-react";
import Breadcrumbs from "@/components/amazon/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AfiliadosPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: "Programa de Afiliados" },
            ]}
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
          <Handshake className="h-7 w-7 text-orange-500" />
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Programa de Afiliados
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
                  Gana dinero recomendando Miss Semi Fashion
                </h2>
                <p className="text-muted-foreground">
                  Unete a nuestro programa de afiliados y gana una comision por
                  cada venta que generes a traves de tu enlace personal. Es
                  facil, gratuito y sin compromisos.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="mb-3 text-lg font-semibold text-foreground">
                  Como funciona
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="text-center rounded-lg border p-4">
                    <Share2 className="mx-auto mb-2 h-8 w-8 text-orange-500" />
                    <p className="text-sm font-medium text-foreground">
                      Comparte tu enlace
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Con amigos y seguidores
                    </p>
                  </div>
                  <div className="text-center rounded-lg border p-4">
                    <Users className="mx-auto mb-2 h-8 w-8 text-blue-500" />
                    <p className="text-sm font-medium text-foreground">
                      Ellos compran
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Usando tu enlace unico
                    </p>
                  </div>
                  <div className="text-center rounded-lg border p-4">
                    <DollarSign className="mx-auto mb-2 h-8 w-8 text-green-500" />
                    <p className="text-sm font-medium text-foreground">
                      Gana comisiones
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Por cada venta realizada
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-3 text-lg font-semibold text-foreground">
                  Beneficios
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                    Comisiones competitivas por cada venta referida.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                    Panel de control para ver tus ganancias en tiempo real.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                    Materiales promocionales gratuitos para compartir.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                    Sin inversion inicial ni compromisos.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                    Pagos mensuales confiables y transparentes.
                  </li>
                </ul>
              </div>

              <div className="rounded-lg bg-orange-50 p-4">
                <p className="mb-4 text-sm text-foreground">
                  <strong>Quieres ser afiliado?</strong> Escribenos por WhatsApp
                  y te ayudaremos a comenzar. Es rapido y sencillo.
                </p>
                <a
                  href="https://wa.me/573108416620?text=Hola%2C%20me%20interesa%20el%20programa%20de%20afiliados"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button className="gap-2 bg-green-500 hover:bg-green-600">
                    <MessageCircle className="h-4 w-4" />
                    Unirme al Programa
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
