"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  HelpCircle,
  Search,
  MessageCircle,
  Phone,
  Instagram,
} from "lucide-react";
import Breadcrumbs from "@/components/amazon/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
  {
    question: "Como realizar un pedido?",
    answer:
      "Puedes hacerlo por WhatsApp, directamente en la web, o llamando a nuestros numeros de contacto. Simplemente selecciona las prendas que deseas, elige tu talla y procede al pago.",
  },
  {
    question: "Metodos de pago",
    answer:
      "Aceptamos contra entrega, Nequi, Daviplata, transferencias bancarias y pagos con abonos (hasta 3 cuotas). Todos los metodos son seguros y faciles de usar.",
  },
  {
    question: "Tiempos de envio",
    answer:
      "1-3 dias habiles para ciudades principales. 3-5 dias habiles para otras ciudades. Los envios se realizan por servicio de transporte a toda Colombia.",
  },
  {
    question: "Politica de devoluciones",
    answer:
      "Tienes 7 dias desde la entrega para solicitar una devolucion. La prenda debe estar sin uso, con etiquetas y en su empaque original. Contactanos por WhatsApp para iniciar el proceso.",
  },
  {
    question: "Como rastrear mi pedido?",
    answer:
      "Contactanos por WhatsApp con tu numero de orden y te brindaremos la informacion de rastreo y el estado actual de tu envio.",
  },
  {
    question: "Ofrecen descuentos por mayoreo?",
    answer:
      "Si, desde 3 prendas por referencia ya obtienes precios especiales. Ademas ofrecemos abonos hasta en 3 cuotas sin intereses para pedidos al por mayor.",
  },
  {
    question: "Que tallas manejan?",
    answer:
      "Manejamos tallas S, M, L, XL en todas nuestras prendas. Algunas referencias tambien estan disponibles en talla XS y XXL. Consulta la guia de tallas para mas detalles.",
  },
  {
    question: "Hacen envios internacionales?",
    answer:
      "Si, realizamos envios internacionales. Consulta los costos y tiempos de entrega por WhatsApp segun tu pais de destino.",
  },
];

export default function AyudaPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqCategories.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <Breadcrumbs
            items={[{ label: "Inicio", href: "/" }, { label: "Centro de Ayuda" }]}
          />
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-3"
        >
          <HelpCircle className="h-7 w-7 text-orange-500" />
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Centro de Ayuda
          </h1>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar en el centro de ayuda..."
              className="pl-10"
            />
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Preguntas frecuentes</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredFaqs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((item, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                      <AccordionTrigger className="text-left">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="py-8 text-center">
                  <Search className="mx-auto mb-3 h-10 w-10 text-muted-foreground/50" />
                  <p className="text-muted-foreground">
                    No se encontraron resultados para &quot;{searchQuery}&quot;
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Options */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-pink-50">
            <CardHeader>
              <CardTitle className="text-lg">Necesitas mas ayuda?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                <a
                  href="https://wa.me/573108416620"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border bg-card p-4 transition-all hover:border-green-300 hover:shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">WhatsApp</p>
                    <p className="text-sm text-muted-foreground">310 841 6620</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/573137932387"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border bg-card p-4 transition-all hover:border-green-300 hover:shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <Phone className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Telefono</p>
                    <p className="text-sm text-muted-foreground">313 793 2387</p>
                  </div>
                </a>

                <a
                  href="https://instagram.com/misssemifashion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border bg-card p-4 transition-all hover:border-pink-300 hover:shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100">
                    <Instagram className="h-5 w-5 text-pink-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Instagram</p>
                    <p className="text-sm text-muted-foreground">@misssemifashion</p>
                  </div>
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Nuestra ubicacion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d416416.0366719646!2d-74.32156005!3d4.57086815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9bfd2da6cb29%3A0x239d635520a23a43!2sCaldas%2C%20Colombia!5e0!3m2!1ses!2s!4v1700000000000!5m2!1ses!2s"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicacion Miss Semi Fashion"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
