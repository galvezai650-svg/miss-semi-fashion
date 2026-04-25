"use client";

import { motion } from "framer-motion";
import { ShieldCheck, MessageCircle } from "lucide-react";
import Breadcrumbs from "@/components/amazon/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function GarantiaPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <Breadcrumbs
            items={[{ label: "Inicio", href: "/" }, { label: "Garantia" }]}
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
          <ShieldCheck className="h-7 w-7 text-orange-500" />
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Garantia de Calidad
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="space-y-6 p-6 md:p-8">
              <div className="rounded-lg bg-green-50 p-4">
                <p className="text-green-800">
                  <strong>Miss Semi Fashion</strong> garantiza la calidad de
                  todas sus prendas. Si recibes un producto con defectos de
                  fabrica, lo reemplazamos sin costo adicional.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  Que cubre nuestra garantia
                </h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    Defectos de fabrica en costuras, tejidos o acabados.
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    Diferencia significativa entre el producto recibido y lo
                    publicado en la tienda.
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    Productos que lleguen danados por transporte.
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    Talla incorrecta enviada por error nuestro.
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  Que NO cubre nuestra garantia
                </h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-400" />
                    Danos causados por uso indebido, lavado inadecuado o maltrato.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-400" />
                    Desgaste normal por el uso regular de la prenda.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-400" />
                    Alteraciones realizadas por terceros o por el cliente.
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  Plazo de garantia
                </h2>
                <p className="text-muted-foreground">
                  La garantia aplica durante los primeros <strong>15 dias
                  calendario</strong> despues de la entrega del producto. Durante
                  este periodo, reporta cualquier inconveniente y lo resolveremos
                  a tu satisfaccion.
                </p>
              </div>

              <Separator />

              <div>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  Como hacer valer la garantia
                </h2>
                <ol className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600">
                      1
                    </span>
                    Contactanos por WhatsApp con tu numero de orden y una foto del
                    defecto.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600">
                      2
                    </span>
                    Nuestro equipo evaluara el caso y te confirmara si aplica la
                    garantia.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600">
                      3
                    </span>
                    Si aplica, procederemos con el reemplazo o reembolso segun tu
                    preferencia.
                  </li>
                </ol>
              </div>

              <div className="rounded-lg bg-orange-50 p-4">
                <p className="mb-4 text-sm text-foreground">
                  <strong>Tu satisfaccion es nuestra prioridad.</strong> Si tienes
                  algun problema con tu pedido, comunicate con nosotros de
                  inmediato.
                </p>
                <a
                  href="https://wa.me/573108416620?text=Hola%2C%20tengo%20un%20problema%20con%20mi%20pedido"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button className="gap-2 bg-green-500 hover:bg-green-600">
                    <MessageCircle className="h-4 w-4" />
                    Contactar por WhatsApp
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
