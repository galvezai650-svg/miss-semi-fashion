"use client";

import { motion } from "framer-motion";
import { RotateCcw, MessageCircle } from "lucide-react";
import Breadcrumbs from "@/components/amazon/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function DevolucionesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <Breadcrumbs
            items={[{ label: "Inicio", href: "/" }, { label: "Devoluciones" }]}
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
          <RotateCcw className="h-7 w-7 text-orange-500" />
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Politica de Devoluciones
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
                  Plazo para devoluciones
                </h2>
                <p className="text-muted-foreground">
                  Tienes un plazo de <strong>7 dias calendario</strong> contados
                  a partir de la fecha de entrega para solicitar una devolucion o
                  cambio de tu pedido.
                </p>
              </div>

              <Separator />

              <div>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  Condiciones para devolucion
                </h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                    La prenda debe estar sin uso, sin lavar y sin alteraciones.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                    Debe conservar todas las etiquetas originales.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                    El empaque original debe estar en buen estado.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                    No se aceptan devoluciones de prendas en promocion o
                    liquidacion.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                    Los costos de envio para la devolucion corren por cuenta del
                    cliente.
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  Como solicitar una devolucion
                </h2>
                <ol className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600">
                      1
                    </span>
                    Contactanos por WhatsApp con tu numero de orden y motivo de
                    la devolucion.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600">
                      2
                    </span>
                    Envia fotos de la prenda mostrando su estado.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600">
                      3
                    </span>
                    Espera la aprobacion y sigue las instrucciones de envio.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600">
                      4
                    </span>
                    Una vez recibida y verificada, procesaremos tu reembolso o
                    cambio.
                  </li>
                </ol>
              </div>

              <Separator />

              <div>
                <h2 className="mb-3 text-xl font-semibold text-foreground">
                  Reembolso
                </h2>
                <p className="text-muted-foreground">
                  El reembolso se realizara por el mismo medio de pago utilizado
                  en la compra. El tiempo de procesamiento puede ser de 3 a 5
                  dias habiles.
                </p>
              </div>

              <Separator />

              <div className="rounded-lg bg-orange-50 p-4">
                <p className="mb-4 text-sm text-foreground">
                  <strong>Nota:</strong> Para cualquier consulta sobre
                  devoluciones, no dudes en contactarnos. Estamos para
                  ayudarte.
                </p>
                <a
                  href="https://wa.me/573108416620?text=Hola%2C%20quiero%20iniciar%20una%20devolucion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button className="gap-2 bg-green-500 hover:bg-green-600">
                    <MessageCircle className="h-4 w-4" />
                    Iniciar Devolucion por WhatsApp
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
