"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  Truck,
  CheckCircle2,
  ShoppingBag,
  RotateCcw,
  X,
  MapPin,
  Clock,
} from "lucide-react";
import { useOrdersStore, type Order, type OrderStatus } from "@/stores/orders-store";
import { useCartStore } from "@/stores/cart-store";
import Breadcrumbs from "@/components/amazon/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const timeFilters = [
  { label: "Ultimos 3 meses", value: "3m" },
  { label: "Ultimos 6 meses", value: "6m" },
  { label: "2026", value: "2026" },
  { label: "2024", value: "2024" },
] as const;

const TRACKING_STEPS: { label: string; icon: React.ElementType }[] = [
  { label: "Orden confirmada", icon: CheckCircle2 },
  { label: "Preparando envio", icon: Package },
  { label: "En camino", icon: Truck },
  { label: "Entregado", icon: CheckCircle2 },
];

function getStatusBadge(status: OrderStatus) {
  switch (status) {
    case "Entregada":
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
    case "Confirmada":
      return (
        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
          {status}
        </Badge>
      );
    case "Preparando":
      return (
        <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
          {status}
        </Badge>
      );
    case "Cancelada":
      return (
        <Badge variant="destructive" className="hover:bg-red-100">
          {status}
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

function getStatusStepIndex(status: OrderStatus): number {
  switch (status) {
    case "Confirmada":
      return 0;
    case "Preparando":
      return 1;
    case "En camino":
      return 2;
    case "Entregada":
      return 3;
    case "Cancelada":
      return -1;
    default:
      return 0;
  }
}

function formatDate(isoDate: string): string {
  const d = new Date(isoDate);
  return d.toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getEstimatedDelivery(isoDate: string): string {
  const d = new Date(isoDate);
  d.setDate(d.getDate() + 5);
  return d.toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function filterOrdersByDate(orders: Order[], filterValue: string): Order[] {
  const now = new Date();
  switch (filterValue) {
    case "3m": {
      const threeMonthsAgo = new Date(now);
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      return orders.filter((o) => new Date(o.date) >= threeMonthsAgo);
    }
    case "6m": {
      const sixMonthsAgo = new Date(now);
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      return orders.filter((o) => new Date(o.date) >= sixMonthsAgo);
    }
    case "2026":
      return orders.filter((o) => new Date(o.date).getFullYear() === 2026);
    case "2024":
      return orders.filter((o) => new Date(o.date).getFullYear() === 2024);
    default:
      return orders;
  }
}

export default function PedidosPage() {
  const orders = useOrdersStore((s) => s.orders);
  const addItem = useCartStore((s) => s.addItem);

  const [activeFilter, setActiveFilter] = useState("3m");
  const [trackingOrder, setTrackingOrder] = useState<Order | null>(null);

  const filteredOrders = useMemo(
    () => filterOrdersByDate(orders, activeFilter),
    [orders, activeFilter]
  );

  function handleBuyAgain(order: Order) {
    order.items.forEach((item) => {
      addItem({
        productId: item.productId,
        name: item.name,
        image: item.image,
        price: item.price,
        size: item.size,
      });
    });
    toast.success("Productos agregados al carrito");
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="border-b bg-card">
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
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
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
        {filteredOrders.length > 0 ? (
          <div className="space-y-5">
            {filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 + index * 0.1 }}
                className="rounded-lg border bg-card shadow-sm"
              >
                {/* Order Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-muted px-5 py-3">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <div>
                      <span className="text-xs text-muted-foreground">Pedido</span>
                      <p className="text-sm font-bold text-foreground">
                        #{order.id}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Fecha</span>
                      <p className="text-sm text-foreground">
                        {formatDate(order.date)}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Envio</span>
                      <p className="text-sm text-foreground">
                        {order.shippingAddress}
                      </p>
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
                          <Link
                            href={`/producto/${item.productId}`}
                            className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted"
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                              quality={100}
                            />
                          </Link>
                        )}
                        <div className="min-w-0 flex-1">
                          <Link
                            href={`/producto/${item.productId}`}
                            className="truncate text-sm font-medium text-foreground hover:text-orange-600 hover:underline"
                          >
                            {item.name}
                          </Link>
                          <p className="text-xs text-muted-foreground">
                            Talla: {item.size} &middot; Cantidad: {item.quantity}
                          </p>
                        </div>
                        <p className="shrink-0 text-sm font-semibold text-foreground">
                          ${(item.price * item.quantity).toLocaleString("es-CO")}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  {/* Order Footer */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-sm text-muted-foreground">Total:</span>
                      <span className="ml-1 text-lg font-bold text-foreground">
                        ${order.total.toLocaleString("es-CO")}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5"
                        onClick={() => setTrackingOrder(order)}
                      >
                        <Truck className="h-3.5 w-3.5" />
                        Rastrear pedido
                      </Button>
                      <Button
                        size="sm"
                        className="gap-1.5 bg-orange-500 hover:bg-orange-600"
                        onClick={() => handleBuyAgain(order)}
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
            <Package className="mx-auto mb-4 h-16 w-16 text-muted-foreground/50" />
            <h2 className="mb-2 text-xl font-semibold text-foreground">
              No tienes pedidos
            </h2>
            <p className="mb-6 text-muted-foreground">
              {orders.length === 0
                ? "Explora nuestros productos y realiza tu primera compra."
                : "No hay pedidos en el periodo seleccionado."}
            </p>
            <Button
              asChild
              className="bg-orange-500 hover:bg-orange-600"
            >
              <Link href="/">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Empezar a comprar
              </Link>
            </Button>
          </motion.div>
        )}
      </div>

      {/* ── Tracking Dialog ── */}
      <Dialog
        open={!!trackingOrder}
        onOpenChange={(open) => {
          if (!open) setTrackingOrder(null);
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-orange-500" />
              Rastrear pedido #{trackingOrder?.id}
            </DialogTitle>
            <DialogDescription>
              Seguimiento en tiempo real de tu pedido
            </DialogDescription>
          </DialogHeader>

          {trackingOrder && (
            <div className="space-y-6">
              {/* Order Info */}
              <div className="flex flex-wrap items-center gap-4 rounded-lg bg-muted/30 p-4">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Fecha: {formatDate(trackingOrder.date)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {trackingOrder.shippingAddress}
                  </span>
                </div>
                {getStatusBadge(trackingOrder.status)}
              </div>

              {/* Estimated Delivery */}
              {trackingOrder.status !== "Cancelada" && (
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                  <p className="text-sm text-blue-800">
                    <strong>Entrega estimada:</strong>{" "}
                    {getEstimatedDelivery(trackingOrder.date)}
                  </p>
                </div>
              )}

              {/* Tracking Timeline */}
              {trackingOrder.status !== "Cancelada" ? (
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-foreground">
                    Estado del envio
                  </h4>
                  <div className="relative space-y-0">
                    {TRACKING_STEPS.map((step, i) => {
                      const currentStep = getStatusStepIndex(
                        trackingOrder.status
                      );
                      const isCompleted = i <= currentStep;
                      const isCurrent = i === currentStep;
                      const StepIcon = step.icon;

                      return (
                        <div key={step.label} className="flex items-start gap-4">
                          {/* Timeline line and circle */}
                          <div className="flex flex-col items-center">
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                                isCompleted
                                  ? isCurrent
                                    ? "border-orange-500 bg-orange-500 text-white"
                                    : "border-green-500 bg-green-500 text-white"
                                  : "border-muted-foreground/30 bg-card text-muted-foreground/50"
                              }`}
                            >
                              <StepIcon className="h-4 w-4" />
                            </div>
                            {i < TRACKING_STEPS.length - 1 && (
                              <div
                                className={`h-10 w-0.5 ${
                                  i < currentStep
                                    ? "bg-green-500"
                                    : "bg-muted-foreground/30"
                                }`}
                              />
                            )}
                          </div>

                          {/* Label */}
                          <div className="pt-1">
                            <p
                              className={`text-sm font-medium ${
                                isCompleted
                                  ? isCurrent
                                    ? "text-orange-700"
                                    : "text-green-700"
                                  : "text-muted-foreground/50"
                              }`}
                            >
                              {step.label}
                            </p>
                            {isCurrent && (
                              <p className="text-xs text-orange-600">
                                Estado actual
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center">
                  <p className="text-sm font-medium text-red-700">
                    Este pedido fue cancelado
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  onClick={() => {
                    handleBuyAgain(trackingOrder);
                    setTrackingOrder(null);
                  }}
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Comprar de nuevo
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5"
                  onClick={() => setTrackingOrder(null)}
                >
                  Cerrar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
