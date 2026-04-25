"use client";

import { motion } from "framer-motion";
import {
  Truck,
  DollarSign,
  Globe,
  Award,
  MessageCircle,
  Phone,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Breadcrumbs from "@/components/amazon/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const benefits = [
  {
    icon: DollarSign,
    title: "Precios especiales",
    description: "Descuentos exclusivos por volumen para emprendedores y comerciantes.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: CreditCard,
    title: "Facilidades de pago",
    description: "Abonos hasta en 3 cuotas sin intereses para facilitar tu inversion.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Globe,
    title: "Envios nacionales",
    description: "Envios a toda Colombia por servicio de transporte confiable.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Award,
    title: "Calidad garantizada",
    description: "Prendas de primera calidad con confeccion premium colombiana.",
    color: "bg-orange-100 text-orange-600",
  },
];

const steps = [
  {
    number: "01",
    title: "Contactanos",
    description: "Escribenos por WhatsApp o llamanos para conocer el catalogo.",
  },
  {
    number: "02",
    title: "Elige tus prendas",
    description: "Selecciona las referencias, tallas y colores que deseas.",
  },
  {
    number: "03",
    title: "Minimo 3 prendas",
    description: "El pedido minimo es de 3 prendas por referencia.",
  },
  {
    number: "04",
    title: "Confirma tu pedido",
    description: "Verifica los detalles y confirma tu orden de compra.",
  },
  {
    number: "05",
    title: "Recibe y vende",
    description: "Recibe tu pedido en 1-3 dias habiles y comienza a vender.",
  },
];

const faqItems = [
  {
    question: "Cual es el minimo de prendas?",
    answer: "El pedido minimo es de 3 prendas por referencia. Puedes mezclar tallas y colores dentro de la misma referencia.",
  },
  {
    question: "Ofrecen abonos?",
    answer: "Si, puedes pagar hasta en 3 cuotas sin intereses. La primera al hacer el pedido y las restantes segun lo acordado.",
  },
  {
    question: "Hacen envios?",
    answer: "Si, realizamos envios a toda Colombia por servicio de transporte. Los tiempos de entrega son de 1 a 3 dias habiles dependiendo de la ciudad.",
  },
  {
    question: "Como hago un pedido?",
    answer: "Contactanos por WhatsApp con las referencias deseadas, tallas y cantidades. Te enviaremos la cotizacion y los datos de pago.",
  },
];

export default function MayoristaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: "Venta al Por Mayor" },
            ]}
          />
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-500 to-pink-500">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="mb-4 text-3xl font-bold text-white md:text-5xl">
              Emprende con Nosotros
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90 md:text-xl">
              Conviertete en distribuidor de Miss Semi Fashion. Ofrecemos los
              mejores precios por mayor con calidad premium colombiana para que
              tu negocio crezca.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/573108416620"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="gap-2 bg-white text-green-600 hover:bg-white/90"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp: 310 841 6620
                </Button>
              </a>
              <a
                href="https://wa.me/573137932387"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-white text-white hover:bg-white/10"
                >
                  <Phone className="h-5 w-5" />
                  WhatsApp: 313 793 2387
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
            Beneficios de comprar al por mayor
          </h2>
          <p className="text-gray-500">
            Todo lo que necesitas para hacer crecer tu negocio
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center transition-shadow hover:shadow-lg">
                  <CardContent className="pt-6">
                    <div
                      className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full ${benefit.color}`}
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mb-2 font-semibold text-gray-900">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
              Como funciona
            </h2>
            <p className="text-gray-500">
              Compra al por mayor en 5 simples pasos
            </p>
          </motion.div>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 text-lg font-bold text-orange-600">
                  {step.number}
                </div>
                <div className="pt-1">
                  <h3 className="font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-500">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="overflow-hidden border-orange-200 bg-gradient-to-r from-orange-50 to-pink-50">
            <CardContent className="p-8 text-center md:p-12">
              <MessageCircle className="mx-auto mb-4 h-12 w-12 text-orange-500" />
              <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
                Contactanos hoy
              </h2>
              <p className="mx-auto mb-8 max-w-lg text-gray-500">
                Estamos listos para ayudarte a hacer crecer tu negocio. Escribenos
                y recibe una cotizacion personalizada.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://wa.me/573108416620?text=Hola%2C%20me%20interesa%20comprar%20al%20por%20mayor"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="gap-2 bg-green-500 hover:bg-green-600"
                  >
                    <Phone className="h-5 w-5" />
                    310 841 6620
                  </Button>
                </a>
                <a
                  href="https://wa.me/573137932387?text=Hola%2C%20me%20interesa%20comprar%20al%20por%20mayor"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="gap-2 bg-green-500 hover:bg-green-600"
                  >
                    <Phone className="h-5 w-5" />
                    313 793 2387
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
              Preguntas frecuentes
            </h2>
          </motion.div>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-500">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}

function CreditCard(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}
