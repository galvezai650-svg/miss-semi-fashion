"use client";

import { motion } from "framer-motion";
import { Newspaper, MessageCircle, Mail, Instagram } from "lucide-react";
import Breadcrumbs from "@/components/amazon/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function PrensaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <Breadcrumbs
            items={[{ label: "Inicio", href: "/" }, { label: "Prensa" }]}
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
          <Newspaper className="h-7 w-7 text-orange-500" />
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Prensa y Medios
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <Card>
            <CardContent className="p-6 md:p-8">
              <div>
                <h2 className="mb-3 text-xl font-semibold text-gray-900">
                  Miss Semi Fashion en los Medios
                </h2>
                <p className="mb-4 text-gray-600">
                  Miss Semi Fashion es una marca colombiana de moda femenina que
                  se ha destacado por ofrecer prendas de calidad premium a
                  precios accesibles. Con mas de 73 clientes satisfechos y una
                  presencia creciente en redes sociales, nuestra marca sigue
                  expandiendose en el mercado nacional.
                </p>
                <p className="mb-4 text-gray-600">
                  Especializada en pijamas, vestidos deportivos, blusas y
                  prendas casuales, Miss Semi Fashion combina estilo colombiano
                  con comodidad y tendencias actuales. Nuestras colecciones estan
                  disenadas para mujeres que buscan lucir bien sin sacrificar la
                  comodidad.
                </p>
                <p className="text-gray-600">
                  Si eres periodista, blogger o influencer y deseas conocer mas
                  sobre nuestra marca, colaborar o realizar entrevistas, no dudes
                  en contactarnos.
                </p>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  Contacto de prensa
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                      <MessageCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">WhatsApp</p>
                      <p className="font-medium text-gray-900">310 841 6620</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100">
                      <Instagram className="h-5 w-5 text-pink-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Instagram</p>
                      <a
                        href="https://instagram.com/misssemifashion"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-gray-900 hover:text-orange-600"
                      >
                        @misssemifashion
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="rounded-lg bg-orange-50 p-4">
                <p className="mb-4 text-sm text-gray-700">
                  <strong>Nota para medios:</strong> Proporcionamos imagenes de
                  alta calidad, muestras de productos y acceso a entrevistas con
                  el equipo creativo.
                </p>
                <a
                  href="https://wa.me/573108416620?text=Hola%2C%20soy%20de%20prensa%20y%20me%20gustaria%20hablar%20sobre%20Miss%20Semi%20Fashion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button className="gap-2 bg-green-500 hover:bg-green-600">
                    <MessageCircle className="h-4 w-4" />
                    Contactar Departamento de Prensa
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
