"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Package,
  CreditCard,
  Truck,
  Phone,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: TrendingUp,
    title: "Precios Especiales",
    description: "Precios mayoristas desde 3 prendas. Mejor margen de ganancia para tu negocio.",
  },
  {
    icon: CreditCard,
    title: "Facilidades de Pago",
    description: "Abonos disponibles. Pagos parciales para comodidad de tus compras.",
  },
  {
    icon: Truck,
    title: "Envios Nacionales",
    description: "Despachos a toda Colombia. Empaque cuidadoso y seguimiento de envio.",
  },
  {
    icon: Package,
    title: "Calidad Garantizada",
    description: "Licra colombiana premium, piel durazno y telas de primera calidad.",
  },
];

const steps = [
  { step: "1", text: "Contactanos por WhatsApp con tu pedido" },
  { step: "2", text: "Elige tus prendas, tallas y colores" },
  { step: "3", text: "Recibe cotizacion con precios mayorista" },
  { step: "4", text: "Realiza tu pago con abonos si lo deseas" },
  { step: "5", text: "Recibe tu pedido en la puerta de tu casa" },
];

export default function WholesaleSection() {
  return (
    <section
      id="mayorista"
      className="py-20 md:py-28 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/20 to-sky-brand/5" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-brand/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <Badge className="mb-4 px-4 py-1.5 text-xs font-semibold bg-primary text-primary-foreground border-0 gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Emprende con Nosotros
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Venta al <span className="gradient-text">Por Mayor</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Emprende con nosotros. Precios especiales desde 3 prendas.
            Abonos, envios nacionales e internacionales. Haz crecer tu negocio
            con Miss Semi Fashion.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Steps + CTA */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <ArrowRight className="w-5 h-5 text-primary" />
              Como funciona
            </h3>
            <div className="space-y-4">
              {steps.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    {item.step}
                  </span>
                  <p className="text-muted-foreground pt-1">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-2xl border border-primary/20 p-8 shadow-xl shadow-primary/5"
          >
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                Emprende Hoy Mismo
              </h3>
              <p className="text-muted-foreground mb-6">
                Contactanos y recibe precios especiales para tu negocio.
                Estamos para apoyarte en cada paso.
              </p>

              <div className="space-y-3 mb-6">
                {[
                  "310 841 6620 (WhatsApp principal)",
                  "313 793 2387 (WhatsApp alternativo)",
                ].map((phone) => (
                  <div
                    key={phone}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {phone}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  size="lg"
                  className="gap-2 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold shadow-lg shadow-green-600/25"
                  asChild
                >
                  <a
                    href="https://wa.me/573108416620?text=Hola%2C%20quiero%20info%20sobre%20ventas%20al%20por%20mayor"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp Mayorista
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-primary/30 text-primary hover:bg-primary/5 rounded-full font-semibold"
                  asChild
                >
                  <a href="tel:+573108416620">
                    <Phone className="w-4 h-4" />
                    Llamar Ahora
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
