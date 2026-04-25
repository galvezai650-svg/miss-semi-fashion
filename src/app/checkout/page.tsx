"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Package,
  CreditCard,
  ClipboardCheck,
  Truck,
  MapPin,
  User,
  Phone,
  Mail,
  FileText,
  MessageSquare,
  CircleCheck,
  Loader2,
} from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import Breadcrumbs from "@/components/amazon/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const CITIES = [
  "Chinchina",
  "Manizales",
  "Pereira",
  "Armenia",
  "Medellin",
  "Bogota",
  "Cali",
] as const;

const PAYMENT_METHODS = [
  {
    value: "contra-entrega",
    label: "Contra entrega (Efectivo)",
    desc: "Pagas cuando recibes tu pedido",
  },
  {
    value: "nequi",
    label: "Nequi / Daviplata",
    desc: "Transferencia instantanea",
  },
  {
    value: "transferencia",
    label: "Transferencia bancaria",
    desc: "Pago directo a cuenta bancaria",
  },
  {
    value: "abono-parcial",
    label: "Abono parcial",
    desc: "Abono parcial y saldo contra entrega",
  },
] as const;

interface ShippingForm {
  fullName: string;
  documentId: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  neighborhood: string;
  postalCode: string;
  specialInstructions: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("contra-entrega");
  const [form, setForm] = useState<ShippingForm>({
    fullName: "",
    documentId: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    neighborhood: "",
    postalCode: "",
    specialInstructions: "",
  });

  function updateForm(field: keyof ShippingForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 1500);
  }

  const cartTotal = totalPrice();
  const shipping = 0;
  const total = cartTotal + shipping;

  // Empty cart state
  if (items.length === 0 && !showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="border-b bg-white">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <Breadcrumbs
              items={[
                { label: "Inicio", href: "/" },
                { label: "Carrito", href: "/carrito" },
                { label: "Proceder al pago" },
              ]}
            />
          </div>
        </div>
        <div className="py-20 text-center">
          <Package className="mx-auto mb-4 h-16 w-16 text-gray-300" />
          <h2 className="mb-2 text-xl font-semibold text-gray-700">
            Tu carrito esta vacio
          </h2>
          <p className="mb-6 text-gray-500">
            Agrega productos antes de proceder al pago.
          </p>
          <Button onClick={() => router.push("/")}>Ver productos</Button>
        </div>
      </div>
    );
  }

  const steps = [
    { icon: Truck, label: "Envio", active: true },
    { icon: CreditCard, label: "Pago", active: false },
    { icon: ClipboardCheck, label: "Confirmacion", active: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: "Carrito", href: "/carrito" },
              { label: "Proceder al pago" },
            ]}
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-0">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                        step.active
                          ? "bg-orange-500 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {i + 1}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        step.active
                          ? "text-orange-700"
                          : "text-gray-400"
                      }`}
                    >
                      <Icon className="mr-1 inline h-4 w-4" />
                      {step.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="mx-3 h-0.5 w-12 bg-gray-300" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!showSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-6 lg:flex-row"
            >
              {/* Left Column - Form */}
              <div className="flex-1 lg:max-w-[66%]">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Shipping Address */}
                  <div className="rounded-lg border bg-white p-6 shadow-sm">
                    <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                      <MapPin className="h-5 w-5 text-orange-500" />
                      Direccion de envio
                    </h2>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="fullName">
                          <User className="mr-1 inline h-3.5 w-3.5" />
                          Nombre completo *
                        </Label>
                        <Input
                          id="fullName"
                          value={form.fullName}
                          onChange={(e) =>
                            updateForm("fullName", e.target.value)
                          }
                          placeholder="Maria Garcia"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="documentId">
                          <FileText className="mr-1 inline h-3.5 w-3.5" />
                          Documento de identidad *
                        </Label>
                        <Input
                          id="documentId"
                          value={form.documentId}
                          onChange={(e) =>
                            updateForm("documentId", e.target.value)
                          }
                          placeholder="1234567890"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="phone">
                          <Phone className="mr-1 inline h-3.5 w-3.5" />
                          Telefono *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={form.phone}
                          onChange={(e) => updateForm("phone", e.target.value)}
                          placeholder="310 123 4567"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="email">
                          <Mail className="mr-1 inline h-3.5 w-3.5" />
                          Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={(e) => updateForm("email", e.target.value)}
                          placeholder="maria@ejemplo.com"
                          required
                        />
                      </div>

                      <div className="space-y-1.5 sm:col-span-2">
                        <Label htmlFor="address">Direccion *</Label>
                        <Input
                          id="address"
                          value={form.address}
                          onChange={(e) => updateForm("address", e.target.value)}
                          placeholder="Calle 5 #12-34, Apto 301"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="city">Ciudad *</Label>
                        <Select
                          value={form.city}
                          onValueChange={(v) => updateForm("city", v)}
                        >
                          <SelectTrigger id="city">
                            <SelectValue placeholder="Selecciona tu ciudad" />
                          </SelectTrigger>
                          <SelectContent>
                            {CITIES.map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="neighborhood">Barrio</Label>
                        <Input
                          id="neighborhood"
                          value={form.neighborhood}
                          onChange={(e) =>
                            updateForm("neighborhood", e.target.value)
                          }
                          placeholder="Centro"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="postalCode">Codigo postal</Label>
                        <Input
                          id="postalCode"
                          value={form.postalCode}
                          onChange={(e) =>
                            updateForm("postalCode", e.target.value)
                          }
                          placeholder="170001"
                        />
                      </div>

                      <div className="space-y-1.5 sm:col-span-2">
                        <Label htmlFor="instructions">
                          <MessageSquare className="mr-1 inline h-3.5 w-3.5" />
                          Instrucciones especiales
                        </Label>
                        <Textarea
                          id="instructions"
                          value={form.specialInstructions}
                          onChange={(e) =>
                            updateForm(
                              "specialInstructions",
                              e.target.value
                            )
                          }
                          placeholder="Casa verde con porton negro, junto al parque..."
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="rounded-lg border bg-white p-6 shadow-sm">
                    <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                      <CreditCard className="h-5 w-5 text-orange-500" />
                      Metodo de pago
                    </h2>

                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="space-y-3"
                    >
                      {PAYMENT_METHODS.map((method) => (
                        <label
                          key={method.value}
                          className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                            paymentMethod === method.value
                              ? "border-orange-500 bg-orange-50"
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          <RadioGroupItem
                            value={method.value}
                            className="mt-0.5"
                          />
                          <div>
                            <p className="font-medium text-gray-900">
                              {method.label}
                            </p>
                            <p className="text-sm text-gray-500">
                              {method.desc}
                            </p>
                          </div>
                        </label>
                      ))}
                    </RadioGroup>

                    {paymentMethod === "abono-parcial" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4"
                      >
                        <p className="text-sm text-amber-800">
                          Para realizar un abono parcial, por favor contactanos
                          por WhatsApp. Te guiaremos con los datos de la cuenta
                          y el monto del abono.
                        </p>
                        <a
                          href="https://wa.me/573108416620"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-block text-sm font-medium text-green-600 underline hover:text-green-700"
                        >
                          Contactar por WhatsApp
                        </a>
                      </motion.div>
                    )}
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-orange-500 text-base hover:bg-orange-600 lg:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      "Continuar"
                    )}
                  </Button>
                </form>
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:w-[34%]">
                <div className="sticky top-4 rounded-lg border bg-white p-6 shadow-sm">
                  <h2 className="mb-4 text-lg font-bold text-gray-900">
                    Resumen del pedido
                  </h2>

                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={`${item.productId}-${item.size}`} className="flex gap-3">
                        {item.image && (
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-gray-100">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Cantidad: {item.quantity}
                          </p>
                        </div>
                        <p className="shrink-0 text-sm font-semibold text-gray-900">
                          ${(item.price * item.quantity).toLocaleString("es-CO")}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">
                        ${cartTotal.toLocaleString("es-CO")}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Envio</span>
                      <span className="font-medium text-green-600">GRATIS</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total del pedido:</span>
                      <span className="text-orange-600">
                        ${total.toLocaleString("es-CO")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Success State */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto max-w-md rounded-lg border bg-white p-10 text-center shadow-lg"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                <CircleCheck className="mx-auto mb-4 h-20 w-20 text-green-500" />
              </motion.div>
              <h2 className="mb-2 text-2xl font-bold text-gray-900">
                Pedido realizado con exito!
              </h2>
              <p className="mb-2 text-gray-600">
                Tu orden ha sido registrada correctamente.
              </p>
              <p className="mb-6 text-sm text-gray-500">
                Te contactaremos por WhatsApp para confirmar los detalles del
                envio y pago.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    clearCart();
                    setShowSuccess(false);
                    router.push("/pedidos");
                  }}
                >
                  Ver mis pedidos
                </Button>
                <Button
                  onClick={() => {
                    clearCart();
                    setShowSuccess(false);
                    router.push("/");
                  }}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  Seguir comprando
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
