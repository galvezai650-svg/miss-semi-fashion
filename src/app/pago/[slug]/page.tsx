"use client";

import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { CreditCard, MessageCircle } from "lucide-react";
import Breadcrumbs from "@/components/amazon/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface PaymentInfo {
  title: string;
  description: string;
  details: string[];
  whatsappMessage: string;
}

const paymentPages: Record<string, PaymentInfo> = {
  "contra-entrega": {
    title: "Pago Contra Entrega",
    description:
      "La forma mas facil y segura de pagar. Realiza el pago directamente cuando recibas tu pedido en la puerta de tu casa.",
    details: [
      "Paga en efectivo cuando recibas tu pedido.",
      "No necesitas adelantos ni pagos en linea.",
      "Ideal si prefieres ver tu producto antes de pagar.",
      "El transportador entregara tu pedido y recibira el pago.",
      "Ten el valor exacto listo para agilizar la entrega.",
    ],
    whatsappMessage:
      "Hola%2C%20tengo%20una%20pregunta%20sobre%20pago%20contra%20entrega",
  },
  abonos: {
    title: "Pagos con Abonos",
    description:
      "Facilitamos tu compra permitiendote pagar en cuotas. Con nuestro sistema de abonos puedes obtener tus prendas y pagar poco a poco.",
    details: [
      "Paga hasta en 3 cuotas sin intereses.",
      "La primera cuota al hacer el pedido.",
      "Las cuotas restantes segun lo acordado.",
      "Ideal para compras al por mayor.",
      "Comuniquese por WhatsApp para coordinar los abonos.",
    ],
    whatsappMessage:
      "Hola%2C%20me%20interesa%20comprar%20con%20abonos",
  },
  transferencias: {
    title: "Transferencias Bancarias",
    description:
      "Realiza tu pago directamente a nuestra cuenta bancaria. Es rapido, seguro y sin comisiones adicionales.",
    details: [
      "Transferencia directa a cuenta bancaria.",
      "Enviamos los datos bancarios por WhatsApp al confirmar el pedido.",
      "Sin comisiones adicionales por transferencia.",
      "El pago se confirma en minutos.",
      "Aviso inmediato una vez realizado el pago para agilizar el envio.",
    ],
    whatsappMessage:
      "Hola%2C%20necesito%20los%20datos%20bancarios%20para%20hacer%20una%20transferencia",
  },
  "nequi-daviplata": {
    title: "Nequi / Daviplata",
    description:
      "Pago instantaneo desde tu billetera digital. Rapido y sin complicaciones, directamente desde tu celular.",
    details: [
      "Pago inmediato desde Nequi o Daviplata.",
      "Enviamos el numero al que debes hacer la consignacion.",
      "Sin necesidad de acudir a un banco.",
      "Confirmacion instantanea del pago.",
      "Ideal para pagos rapidos y desde cualquier lugar.",
    ],
    whatsappMessage:
      "Hola%2C%20quiero%20pagar%20con%20Nequi%20o%20Daviplata",
  },
};

export default function PagoSlugPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const pageData = paymentPages[slug];

  if (!pageData) {
    // Redirect to ayuda if slug not found
    if (typeof window !== "undefined") {
      router.push("/ayuda");
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: pageData.title },
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
          <CreditCard className="h-7 w-7 text-orange-500" />
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            {pageData.title}
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
                <p className="text-lg text-muted-foreground">{pageData.description}</p>
              </div>

              <Separator />

              <div>
                <h3 className="mb-3 text-lg font-semibold text-foreground">
                  Caracteristicas
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  {pageData.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div className="rounded-lg bg-orange-50 p-4">
                <p className="mb-4 text-sm text-foreground">
                  <strong>¿Tienes preguntas sobre este metodo de pago?</strong>{" "}
                  Escribenos por WhatsApp y con gusto te ayudaremos.
                </p>
                <a
                  href={`https://wa.me/573108416620?text=${pageData.whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button className="gap-2 bg-green-500 hover:bg-green-600">
                    <MessageCircle className="h-4 w-4" />
                    Consultar por WhatsApp
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
