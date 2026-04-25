"use client";

import { motion } from "framer-motion";
import { Store, MessageCircle, DollarSign, Truck, Package } from "lucide-react";
import Breadcrumbs from "@/components/amazon/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function VenderPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: "Vende con Nosotros" },
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
          <Store className="h-7 w-7 text-orange-500" />
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Vende en Miss Semi Fashion
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
                <h2 className="mb-3 text-xl font-semibold text-gray-900">
                  Asociate como vendedor
                </h2>
                <p className="text-gray-600">
                  Quieres vender tus productos a traves de Miss Semi Fashion?
                  Ofrecemos una plataforma para que emprendedores y marcas
                  independientes lleguen a nuestros clientes. Beneficiate de
                  nuestra audiencia y infraestructura de ventas.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  Beneficios de vender con nosotros
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex items-start gap-3 rounded-lg border p-3">
                    <DollarSign className="h-5 w-5 shrink-0 text-green-500" />
                    <div>
                      <p className="font-medium text-gray-900">Comisiones justas</p>
                      <p className="text-sm text-gray-500">
                        Las mejores comisiones del mercado.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg border p-3">
                    <Package className="h-5 w-5 shrink-0 text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-900">Logistica</p>
                      <p className="text-sm text-gray-500">
                        Nos encargamos del envio.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg border p-3">
                    <Truck className="h-5 w-5 shrink-0 text-purple-500" />
                    <div>
                      <p className="font-medium text-gray-900">Alcance nacional</p>
                      <p className="text-sm text-gray-500">
                        Llega a clientes en toda Colombia.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg border p-3">
                    <Store className="h-5 w-5 shrink-0 text-orange-500" />
                    <div>
                      <p className="font-medium text-gray-900">Soporte</p>
                      <p className="text-sm text-gray-500">
                        Atencion personalizada constante.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  Como comenzar
                </h3>
                <ol className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600">
                      1
                    </span>
                    Contactanos por WhatsApp con informacion sobre tus productos.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600">
                      2
                    </span>
                    Envia fotos, descripciones y precios de referencia.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600">
                      3
                    </span>
                    Revisamos tu solicitud y respondemos en maximo 48 horas.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600">
                      4
                    </span>
                    Si eres aprobado, comienza a vender con nosotros.
                  </li>
                </ol>
              </div>

              <div className="rounded-lg bg-orange-50 p-4">
                <p className="mb-4 text-sm text-gray-700">
                  <strong>Interesado?</strong> Escribenos y cuéntanos sobre tus
                  productos. Estamos buscando marcas que compartan nuestra
                  pasion por la calidad.
                </p>
                <a
                  href="https://wa.me/573108416620?text=Hola%2C%20me%20interesa%20vender%20en%20Miss%20Semi%20Fashion"
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
