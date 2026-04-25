"use client";

import { motion } from "framer-motion";
import {
  CreditCard,
  Plus,
  Trash2,
  Star,
  LogIn,
  Banknote,
  Smartphone,
  Building2,
  Truck,
} from "lucide-react";
import Breadcrumbs from "@/components/amazon/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/stores/auth-store";
import Link from "next/link";
import { toast } from "sonner";

const paymentTypes = [
  {
    type: "contra-entrega" as const,
    label: "Contra Entrega",
    description: "Paga cuando recibas tu pedido",
    icon: Truck,
    color: "bg-green-100 text-green-600",
    borderHover: "hover:border-green-300",
  },
  {
    type: "nequi" as const,
    label: "Nequi",
    description: "Pago rapido desde Nequi",
    icon: Smartphone,
    color: "bg-purple-100 text-purple-600",
    borderHover: "hover:border-purple-300",
  },
  {
    type: "daviplata" as const,
    label: "Daviplata",
    description: "Pago con Daviplata",
    icon: Smartphone,
    color: "bg-red-100 text-red-600",
    borderHover: "hover:border-red-300",
  },
  {
    type: "transferencia" as const,
    label: "Transferencia Bancaria",
    description: "Transferencia directa al banco",
    icon: Building2,
    color: "bg-blue-100 text-blue-600",
    borderHover: "hover:border-blue-300",
  },
];

function getTypeLabel(type: string): string {
  switch (type) {
    case "contra-entrega":
      return "Contra Entrega";
    case "nequi":
      return "Nequi";
    case "daviplata":
      return "Daviplata";
    case "transferencia":
      return "Transferencia Bancaria";
    default:
      return type;
  }
}

function getTypeColor(type: string): string {
  switch (type) {
    case "contra-entrega":
      return "bg-green-100 text-green-600";
    case "nequi":
      return "bg-purple-100 text-purple-600";
    case "daviplata":
      return "bg-red-100 text-red-600";
    case "transferencia":
      return "bg-blue-100 text-blue-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

export default function PagosPage() {
  const { isLoggedIn, paymentMethods, addPaymentMethod, removePaymentMethod } =
    useAuthStore();

  function handleAddMethod(type: PaymentMethodsPageProps["type"]) {
    addPaymentMethod({ type, isDefault: paymentMethods.length === 0 });
    toast.success(`Metodo de pago agregado: ${getTypeLabel(type)}`);
  }

  function handleRemove(id: string) {
    removePaymentMethod(id);
    toast.success("Metodo de pago eliminado");
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="border-b bg-white">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <Breadcrumbs
              items={[
                { label: "Inicio", href: "/" },
                { label: "Tu Cuenta", href: "/cuenta" },
                { label: "Metodos de Pago" },
              ]}
            />
          </div>
        </div>
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <LogIn className="mx-auto mb-4 h-16 w-16 text-gray-300" />
          <h2 className="mb-2 text-xl font-semibold text-gray-700">
            Inicia sesion para ver tus metodos de pago
          </h2>
          <p className="mb-6 text-gray-500">
            Necesitas iniciar sesion para gestionar tus formas de pago.
          </p>
          <Link href="/cuenta">
            <Button className="bg-orange-500 hover:bg-orange-600">
              Ir a mi cuenta
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: "Tu Cuenta", href: "/cuenta" },
              { label: "Metodos de Pago" },
            ]}
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
          <CreditCard className="h-7 w-7 text-orange-500" />
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Tus Metodos de Pago
          </h1>
        </motion.div>

        {/* Add Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Plus className="h-5 w-5 text-orange-500" />
                Agregar metodo de pago
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {paymentTypes.map((pm) => {
                  const Icon = pm.icon;
                  return (
                    <button
                      key={pm.type}
                      onClick={() => handleAddMethod(pm.type)}
                      className={`flex items-center gap-3 rounded-lg border p-4 text-left transition-all ${pm.borderHover} hover:shadow-sm`}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${pm.color}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{pm.label}</p>
                        <p className="text-xs text-gray-500">
                          {pm.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Saved Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Metodos guardados
          </h2>
          {paymentMethods.length > 0 ? (
            <div className="space-y-3">
              {paymentMethods.map((method, index) => (
                <motion.div
                  key={method.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + index * 0.05 }}
                >
                  <Card
                    className={
                      method.isDefault ? "border-orange-300" : ""
                    }
                  >
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-lg ${getTypeColor(method.type)}`}
                        >
                          <Banknote className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900">
                              {getTypeLabel(method.type)}
                            </p>
                            {method.isDefault && (
                              <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                                <Star className="mr-1 h-3 w-3" />
                                Predeterminada
                              </Badge>
                            )}
                          </div>
                          {method.lastFour && (
                            <p className="text-xs text-gray-500">
                              **** {method.lastFour}
                            </p>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemove(method.id)}
                        className="text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        <Trash2 className="mr-1 h-3 w-3" />
                        Eliminar
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <CreditCard className="mb-3 h-12 w-12 text-gray-300" />
                <p className="mb-1 font-medium text-gray-600">
                  No tienes metodos de pago guardados
                </p>
                <p className="text-sm text-gray-400">
                  Agrega un metodo de pago usando las opciones de arriba
                </p>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}

type PaymentMethodsPageProps = {
  type: "contra-entrega" | "nequi" | "daviplata" | "transferencia";
};
