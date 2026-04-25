"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  Truck,
  CheckCircle2,
  ShoppingBag,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { products } from "@/data/products";
import Breadcrumbs from "@/components/amazon/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type OrderStatus = "Entregado" | "En camino" | "Procesando" | "Cancelado";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

interface MockOrder {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
  shipping: string;
}

const timeFilters = [
  { label: "Ultimos 3 meses", value: "3m" },
  { label: "Ultimos 6 meses", value: "6m" },
  { label: "2025", value: "2025" },
  { label: "2024", value: "2024" },
] as const;

// Look up real product data for images
function getProductImage(name: string): string | undefined {
  const found = products.find(
    (p) => p.name.toLowerCase().includes(name.toLowerCase().split(" ")[0])
  );
  return found?.image;
}

const mockOrders: MockOrder[] = [
  {
    id: "MSF-2026-001",
    date: "15 de abril de 2026",
    status: "Entregado",
    total: 157000,
    items: [
      {
        name: "Pijama Trio Dama",
        quantity: 1,
        price: 89000,
        image: getProductImage("Pijama Trio Dama"),
      },
      {
        name: "Blusa Perlitas",
        quantity: 1,
        price: 68000,
        image: getProductImage("Blusa Perlitas"),
      },
    ],
    shipping: "Chinchina, Caldas",
  },
  {
    id: "MSF-2026-002",
    date: "20 de abril de 2026",
    status: "En camino",
    total: 80000,
    items: [
      {
        name: "Vestido Deportivo Licra",
        quantity: 1,
        price: 80000,
        image: getProductImage("Vestido Deportivo Licra"),
      },
    ],
    shipping: "Bogota, Colombia",
  },
];

function getStatusBadge(status: OrderStatus) {
  switch (status) {
    case "Entregado":
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          {status}
        </Badge>
      );
    case "En camino":
      return (
        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
          <Truck className="mr-1 h-3 w-3" />
          {status}
        </Badge>
      );
    case "Procesando":
      return (
        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
          {status}
        </Badge>
      );
    case "Cancelado":
      return (
        <Badge variant="destructive" className="hover:bg-red-100">
          {status}
        </Badge>
      );
  }
}

export default function PedidosPage() {
  const [activeFilter, setActiveFilter] = useState("3m");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: "Tu Cuenta", href: "/cuenta" },
              { label: "Tus Pedidos" },
            ]}
          />
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Tus Pedidos
          </h1>
        </motion.div>

        {/* Time Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex flex-wrap gap-2"
        >
          {timeFilters.map((filter) => (
            <Button
              key={filter.value}
              variant={activeFilter === filter.value ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter.value)}
              className={
                activeFilter === filter.value
                  ? "bg-orange-500 hover:bg-orange-600"
                  : ""
              }
            >
              {filter.label}
            </Button>
          ))}
        </motion.div>

        {/* Orders List */}
        {mockOrders.length > 0 ? (
          <div className="space-y-5">
            {mockOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 + index * 0.1 }}
                className="rounded-lg border bg-white shadow-sm"
              >
                {/* Order Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-gray-50 px-5 py-3">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <div>
                      <span className="text-xs text-gray-500">Pedido</span>
                      <p className="text-sm font-bold text-gray-900">
                        #{order.id}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Fecha</span>
                      <p className="text-sm text-gray-700">{order.date}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Envio</span>
                      <p className="text-sm text-gray-700">{order.shipping}</p>
                    </div>
                  </div>
                  {getStatusBadge(order.status)}
                </div>

                {/* Order Items */}
                <div className="p-5">
                  <div className="space-y-3">
                    {order.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-center gap-3">
                        {item.image && (
                          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-gray-100">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Cantidad: {item.quantity}
                          </p>
                        </div>
                        <p className="shrink-0 text-sm font-semibold text-gray-900">
                          ${item.price.toLocaleString("es-CO")}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  {/* Order Footer */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Total:</span>
                      <span className="ml-1 text-lg font-bold text-gray-900">
                        ${order.total.toLocaleString("es-CO")}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-1.5">
                        <Truck className="h-3.5 w-3.5" />
                        Rastrear pedido
                      </Button>
                      <Button
                        size="sm"
                        className="gap-1.5 bg-orange-500 hover:bg-orange-600"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Comprar de nuevo
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-16 text-center"
          >
            <Package className="mx-auto mb-4 h-16 w-16 text-gray-300" />
            <h2 className="mb-2 text-xl font-semibold text-gray-700">
              No tienes pedidos
            </h2>
            <p className="mb-6 text-gray-500">
              Explora nuestros productos y realiza tu primera compra.
            </p>
            <Button
              className="bg-orange-500 hover:bg-orange-600"
              onClick={() => (window.location.href = "/")}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Empezar a comprar
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
