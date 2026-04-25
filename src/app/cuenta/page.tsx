"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  Shield,
  MapPin,
  CreditCard,
  Heart,
  Headphones,
  LogIn,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import Breadcrumbs from "@/components/amazon/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface AccountCard {
  icon: React.ElementType;
  title: string;
  description: string;
  href?: string;
  external?: string;
  accent?: string;
}

const accountCards: AccountCard[] = [
  {
    icon: Package,
    title: "Tus Pedidos",
    description: "Rastrea, devuelve o compra de nuevo",
    href: "/pedidos",
    accent: "bg-blue-100 text-blue-600",
  },
  {
    icon: Shield,
    title: "Seguridad de tu cuenta",
    description: "Editar nombre, email y contrasena",
    accent: "bg-green-100 text-green-600",
  },
  {
    icon: MapPin,
    title: "Direcciones",
    description: "Edita direcciones de envio y facturacion",
    accent: "bg-purple-100 text-purple-600",
  },
  {
    icon: CreditCard,
    title: "Metodos de pago",
    description: "Administra tus formas de pago",
    accent: "bg-orange-100 text-orange-600",
  },
  {
    icon: Heart,
    title: "Lista de Deseos",
    description: "Crea y administra tu lista de deseos",
    accent: "bg-pink-100 text-pink-600",
  },
  {
    icon: Headphones,
    title: "Atencion al Cliente",
    description: "Navega por la ayuda y contactanos",
    external: "https://wa.me/573108416620",
    accent: "bg-amber-100 text-amber-600",
  },
];

export default function CuentaPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    // No real auth - just a demo
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <Breadcrumbs
            items={[{ label: "Inicio", href: "/" }, { label: "Tu Cuenta" }]}
          />
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Hola, Identificate
          </h1>
        </motion.div>

        {/* Login Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10 rounded-lg border bg-white p-6 shadow-sm md:p-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <LogIn className="h-5 w-5 text-orange-500" />
            <h2 className="text-lg font-bold text-gray-900">Iniciar sesion</h2>
          </div>

          <form onSubmit={handleLogin} className="max-w-sm space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="login-password">Contrasena</Label>
              <div className="relative">
                <Input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tu contrasena"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              Iniciar sesion
            </Button>

            <div className="text-center text-sm">
              <span className="text-gray-500">No tienes cuenta? </span>
              <a
                href="https://wa.me/573108416620"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-orange-600 hover:text-orange-700 hover:underline"
              >
                Crear cuenta nueva
              </a>
            </div>
          </form>

          {/* Demo Disclaimer */}
          <div className="mt-6 rounded-lg bg-amber-50 border border-amber-200 p-3">
            <p className="text-sm text-amber-800">
              <strong>Nota:</strong> Esta es una demo. Contacta por WhatsApp
              para pedidos reales.
            </p>
          </div>
        </motion.div>

        {/* Account Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {accountCards.map((card, index) => {
            const Icon = card.icon;
            const cardContent = (
              <div className="group flex items-start gap-4 rounded-lg border bg-white p-5 shadow-sm transition-all hover:border-orange-300 hover:shadow-md">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${card.accent}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-orange-600">
                    {card.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-gray-500">
                    {card.description}
                  </p>
                </div>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-gray-300 transition-transform group-hover:translate-x-0.5 group-hover:text-orange-400" />
              </div>
            );

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 + index * 0.06 }}
              >
                {card.href ? (
                  <Link href={card.href}>{cardContent}</Link>
                ) : card.external ? (
                  <a
                    href={card.external}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {cardContent}
                  </a>
                ) : (
                  cardContent
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
