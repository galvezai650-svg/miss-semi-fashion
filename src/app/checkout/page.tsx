"use client";

import { useState, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  CheckCircle2,
  Banknote,
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
  ShoppingCart,
  LogIn,
  Eye,
  EyeOff,
  Shield,
  Lock,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { useAuthStore } from "@/stores/auth-store";
import { useOrdersStore, type Order } from "@/stores/orders-store";
import { COLOMBIA_LOCATIONS } from "@/data/colombia-locations";
import Breadcrumbs from "@/components/amazon/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Link from "next/link";

// Colombian departments and municipalities loaded from data file

interface ShippingForm {
  fullName: string;
  documentId: string;
  phone: string;
  email: string;
  address: string;
  department: string;
  municipality: string;
  neighborhood: string;
  postalCode: string;
  specialInstructions: string;
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const buyNow = searchParams.get("buyNow") === "true";

  const { items, totalPrice, clearCart } = useCartStore();
  const addOrder = useOrdersStore((s) => s.addOrder);
  const { currentUser, isLoggedIn, login } = useAuthStore();

  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [orderId, setOrderId] = useState("");

  const [form, setForm] = useState<ShippingForm>(() => ({
    fullName: currentUser?.name || "",
    documentId: currentUser?.document || "",
    phone: currentUser?.phone || "",
    email: currentUser?.email || "",
    address: "",
    department: "",
    municipality: "",
    neighborhood: "",
    postalCode: "",
    specialInstructions: "",
  }));

  const [mode, setMode] = useState<"anonymous" | "login">("anonymous");

  // Login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const result = login(loginEmail, loginPassword);
    if (result.success) {
      toast.success("Sesión iniciada correctamente");
      setMode("anonymous");
    } else {
      setLoginError(result.error || "Error al iniciar sesión");
    }
  }

  // Get municipalities for selected department
  const selectedDepartment = COLOMBIA_LOCATIONS.find(
    (d) => d.code === form.department
  );
  const municipalities = selectedDepartment?.municipalities || [];

  const hasFormStarted =
    form.fullName ||
    form.documentId ||
    form.phone ||
    form.email ||
    form.address ||
    form.department ||
    form.municipality;

  const computedStep = useMemo(() => {
    if (showSuccess) return 3;
    if (hasFormStarted) return 2;
    return 1;
  }, [showSuccess, hasFormStarted]);

  const activeStep = computedStep;

  function updateForm(field: keyof ShippingForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (!showSuccess && hasFormStarted) {
      setCurrentStep(2);
    }
  }

  function validateForm(): boolean {
    if (!form.fullName.trim()) {
      toast.error("Por favor ingresa tu nombre completo");
      return false;
    }
    if (!form.documentId.trim()) {
      toast.error("Por favor ingresa tu documento de identidad");
      return false;
    }
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 7) {
      toast.error("Por favor ingresa un teléfono válido (mínimo 7 dígitos)");
      return false;
    }
    if (!form.email.trim() || !form.email.includes("@")) {
      toast.error("Por favor ingresa un email válido");
      return false;
    }
    if (!form.address.trim()) {
      toast.error("Por favor ingresa tu dirección");
      return false;
    }
    if (!form.department) {
      toast.error("Por favor selecciona tu departamento");
      return false;
    }
    if (!form.municipality) {
      toast.error("Por favor selecciona tu municipio/ciudad");
      return false;
    }
    return true;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const orderItems = items.map((item) => ({
      productId: item.productId,
      name: item.name,
      image: item.image,
      price: item.price,
      size: item.size,
      quantity: item.quantity,
    }));

    const cartTotal = totalPrice();

    // Send order to DB + WhatsApp
    fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: form.fullName,
        customerPhone: form.phone,
        customerEmail: form.email,
        customerDoc: form.documentId,
        address: form.address,
        department: selectedDepartment?.name || form.department,
        municipality: form.municipality,
        neighborhood: form.neighborhood,
        instructions: form.specialInstructions,
        items: orderItems,
        total: cartTotal,
        paymentMethod: "contra-entrega",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Save to local Zustand store too
          const newOrderId = data.orderId;
          const order: Order = {
            id: newOrderId,
            date: new Date().toISOString(),
            status: "Confirmada",
            total: cartTotal,
            items: orderItems,
            shippingAddress: `${form.address}, ${form.neighborhood ? form.neighborhood + ", " : ""}${form.municipality}, ${selectedDepartment?.name || form.department}`,
            paymentMethod: "contra-entrega",
            email: form.email,
            phone: form.phone,
          };

          addOrder(order);
          clearCart();
          setOrderId(newOrderId);
          setShowSuccess(true);
          setCurrentStep(3);

          // Open WhatsApp
          if (data.whatsappUrl) {
            window.open(data.whatsappUrl, "_blank");
          }
        } else {
          toast.error(data.error || "Error al procesar el pedido");
        }
        setIsSubmitting(false);
      })
      .catch((err) => {
        console.error("Order error:", err);
        toast.error("Error de conexión. Intenta de nuevo.");
        setIsSubmitting(false);
      });
  }

  const cartTotal = totalPrice();
  const shipping = 0;
  const total = cartTotal + shipping;

  // Empty cart states
  if (items.length === 0 && !showSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b border-white/5 bg-card/50 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <Breadcrumbs
              items={[
                { label: "Inicio", href: "/" },
                { label: buyNow ? "Proceder al pago" : "Carrito", href: buyNow ? undefined : "/carrito" },
                { label: "Proceder al pago" },
              ].filter((item) => item.href !== undefined || item.label === "Proceder al pago")}
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-24">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-6 rounded-full bg-gradient-to-br from-rose-brand/20 to-transparent p-8"
          >
            <ShoppingCart className="h-16 w-16 text-rose-brand/60" />
          </motion.div>
          <h2 className="mb-2 text-xl font-semibold text-foreground">
            Tu carrito está vacío
          </h2>
          <p className="mb-6 text-muted-foreground">
            Agrega productos antes de proceder al pago.
          </p>
          <Button
            asChild
            className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-rose-brand text-white hover:shadow-lg hover:shadow-rose-brand/25"
          >
            <Link href="/">
              <Sparkles className="mr-2 h-4 w-4" />
              Explorar productos
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const steps = [
    { icon: User, label: "Datos", step: 1 },
    { icon: MapPin, label: "Envío", step: 2 },
    { icon: ClipboardCheck, label: "Confirmación", step: 3 },
  ];

  return (
    <div className="relative min-h-screen bg-background">
      {/* Subtle top gradient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-rose-brand/[0.06] via-transparent to-transparent" />

      {/* Breadcrumbs */}
      <div className="relative border-b border-white/5 bg-card/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: "Carrito", href: "/carrito" },
              { label: "Finalizar compra" },
            ]}
          />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8">
        {/* ── Premium Step Indicator ── */}
        <div className="mb-10">
          <div className="flex items-center justify-center">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = activeStep >= step.step;
              const isCurrent = activeStep === step.step;
              return (
                <div key={step.label} className="flex items-center">
                  <motion.div
                    className="flex items-center gap-3"
                    initial={false}
                    animate={isActive ? "active" : "inactive"}
                  >
                    <div
                      className={`relative flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition-all duration-500 ${
                        isActive
                          ? isCurrent
                            ? "bg-gradient-to-br from-orange-500 to-rose-brand text-white shadow-lg shadow-rose-brand/30"
                            : "bg-rose-brand/20 text-rose-brand ring-1 ring-rose-brand/30"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {activeStep > step.step ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <span>{i + 1}</span>
                      )}
                      {isCurrent && (
                        <motion.div
                          layoutId="stepPulse"
                          className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-500 to-rose-brand"
                          style={{ zIndex: -1 }}
                          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </div>
                    <div className="hidden sm:block">
                      <span
                        className={`text-sm font-semibold tracking-wide transition-colors ${
                          isActive ? "text-rose-brand" : "text-muted-foreground/40"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  </motion.div>
                  {i < steps.length - 1 && (
                    <div className="mx-4 flex items-center">
                      <div className="relative h-[2px] w-16 overflow-hidden rounded-full bg-muted lg:w-24">
                        <motion.div
                          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-orange-500 to-rose-brand"
                          initial={{ width: "0%" }}
                          animate={{
                            width: activeStep > step.step ? "100%" : "0%",
                          }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                      </div>
                    </div>
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
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-8 lg:flex-row"
            >
              {/* ── Left Column ── */}
              <motion.div
                className="flex-1 lg:max-w-[66%]"
                variants={stagger}
                initial="initial"
                animate="animate"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* ── Login / Anonymous Toggle ── */}
                  {!isLoggedIn && (
                    <motion.div
                      variants={fadeUp}
                      className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-card via-card to-rose-brand/[0.03] p-6 shadow-lg shadow-black/10"
                    >
                      {/* Decorative corner */}
                      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-rose-brand/10 to-transparent blur-2xl" />

                      <div className="relative">
                        <div className="mb-4 flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5">
                            <LogIn className="h-5 w-5 text-rose-brand" />
                          </div>
                          <div>
                            <h2 className="text-lg font-bold text-foreground">
                              Inicia sesión o compra como invitado
                            </h2>
                            <p className="text-xs text-muted-foreground">
                              Tu compra está protegida de cualquier forma
                            </p>
                          </div>
                        </div>

                        {mode === "login" ? (
                          <div className="rounded-xl border border-white/5 bg-background/50 p-4">
                            <form onSubmit={handleLoginSubmit} className="space-y-3">
                              <div className="space-y-1.5">
                                <Label htmlFor="loginEmail" className="text-sm font-medium">
                                  Email
                                </Label>
                                <Input
                                  id="loginEmail"
                                  type="email"
                                  value={loginEmail}
                                  onChange={(e) => setLoginEmail(e.target.value)}
                                  placeholder="tu@email.com"
                                  required
                                  className="border-white/[0.06] bg-card/50"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <Label htmlFor="loginPassword" className="text-sm font-medium">
                                  Contraseña
                                </Label>
                                <div className="relative">
                                  <Input
                                    id="loginPassword"
                                    type={showPassword ? "text" : "password"}
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    placeholder="Tu contraseña"
                                    required
                                    className="border-white/[0.06] bg-card/50 pr-10"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                                  >
                                    {showPassword ? (
                                      <EyeOff className="h-4 w-4" />
                                    ) : (
                                      <Eye className="h-4 w-4" />
                                    )}
                                  </button>
                                </div>
                              </div>
                              {loginError && (
                                <motion.p
                                  initial={{ opacity: 0, y: -4 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400"
                                >
                                  {loginError}
                                </motion.p>
                              )}
                              <div className="flex gap-2 pt-1">
                                <Button
                                  type="submit"
                                  size="sm"
                                  className="bg-gradient-to-r from-orange-500 to-rose-brand text-white hover:shadow-lg hover:shadow-rose-brand/20"
                                >
                                  Iniciar sesión
                                </Button>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="text-muted-foreground hover:text-foreground"
                                  onClick={() => setMode("anonymous")}
                                >
                                  Continuar como invitado
                                </Button>
                              </div>
                            </form>
                            <p className="mt-3 text-xs text-muted-foreground">
                              ¿No tienes cuenta?{" "}
                              <Link
                                href="/cuenta"
                                className="text-rose-brand font-medium hover:underline"
                              >
                                Créala aquí
                              </Link>
                            </p>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 rounded-xl border border-green-500/10 bg-green-500/5 p-4">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-500/10">
                                <ChevronRight className="h-4 w-4 text-green-400" />
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Continúa como invitado. Puedes{" "}
                                <button
                                  type="button"
                                  onClick={() => setMode("login")}
                                  className="text-rose-brand font-semibold hover:underline"
                                >
                                  iniciar sesión
                                </button>{" "}
                                para que tus datos se llenen automáticamente.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* ── Logged in user badge ── */}
                  {isLoggedIn && currentUser && (
                    <motion.div
                      variants={fadeUp}
                      className="flex items-center gap-3 rounded-2xl border border-green-500/15 bg-gradient-to-r from-green-500/5 to-emerald-500/5 p-4"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/10">
                        <CheckCircle2 className="h-5 w-5 text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {currentUser.name}
                        </p>
                        <p className="text-xs text-green-400/80">
                          Sesión activa · Datos precargados
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* ── Shipping Address ── */}
                  <motion.div
                    variants={fadeUp}
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-card via-card to-card shadow-lg shadow-black/10"
                  >
                    {/* Decorative elements */}
                    <div className="absolute -left-12 top-0 h-40 w-40 rounded-full bg-gradient-to-br from-orange-500/[0.06] to-transparent blur-3xl" />
                    <div className="absolute -right-8 bottom-0 h-32 w-32 rounded-full bg-gradient-to-tl from-rose-brand/[0.04] to-transparent blur-3xl" />

                    <div className="relative p-6 lg:p-8">
                      {/* Section header */}
                      <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-rose-brand/10">
                          <MapPin className="h-5 w-5 text-orange-400" />
                        </div>
                        <div>
                          <h2 className="text-lg font-bold text-foreground">
                            Dirección de envío
                          </h2>
                          <p className="text-xs text-muted-foreground">
                            ¿Dónde recibes tu pedido?
                          </p>
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        {/* Personal info section */}
                        <div className="space-y-1.5">
                          <Label htmlFor="fullName" className="text-sm font-medium text-foreground/80">
                            <User className="mr-1.5 inline h-3.5 w-3.5 text-muted-foreground" />
                            Nombre completo *
                          </Label>
                          <Input
                            id="fullName"
                            value={form.fullName}
                            onChange={(e) => updateForm("fullName", e.target.value)}
                            placeholder="María García"
                            required
                            className="border-white/[0.06] bg-background/50 transition-all focus:border-rose-brand/30 focus:shadow-[0_0_0_3px_rgba(225,100,120,0.08)]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="documentId" className="text-sm font-medium text-foreground/80">
                            <FileText className="mr-1.5 inline h-3.5 w-3.5 text-muted-foreground" />
                            Documento de identidad *
                          </Label>
                          <Input
                            id="documentId"
                            value={form.documentId}
                            onChange={(e) => updateForm("documentId", e.target.value)}
                            placeholder="1234567890"
                            required
                            className="border-white/[0.06] bg-background/50 transition-all focus:border-rose-brand/30 focus:shadow-[0_0_0_3px_rgba(225,100,120,0.08)]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="phone" className="text-sm font-medium text-foreground/80">
                            <Phone className="mr-1.5 inline h-3.5 w-3.5 text-muted-foreground" />
                            Teléfono *
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={form.phone}
                            onChange={(e) => updateForm("phone", e.target.value)}
                            placeholder="310 123 4567"
                            required
                            className="border-white/[0.06] bg-background/50 transition-all focus:border-rose-brand/30 focus:shadow-[0_0_0_3px_rgba(225,100,120,0.08)]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="email" className="text-sm font-medium text-foreground/80">
                            <Mail className="mr-1.5 inline h-3.5 w-3.5 text-muted-foreground" />
                            Email *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={form.email}
                            onChange={(e) => updateForm("email", e.target.value)}
                            placeholder="maria@ejemplo.com"
                            required
                            className="border-white/[0.06] bg-background/50 transition-all focus:border-rose-brand/30 focus:shadow-[0_0_0_3px_rgba(225,100,120,0.08)]"
                          />
                        </div>

                        {/* Address row */}
                        <div className="space-y-1.5 sm:col-span-2">
                          <Label htmlFor="address" className="text-sm font-medium text-foreground/80">
                            Dirección *
                          </Label>
                          <Input
                            id="address"
                            value={form.address}
                            onChange={(e) => updateForm("address", e.target.value)}
                            placeholder="Calle 5 #12-34, Apto 301"
                            required
                            className="border-white/[0.06] bg-background/50 transition-all focus:border-rose-brand/30 focus:shadow-[0_0_0_3px_rgba(225,100,120,0.08)]"
                          />
                        </div>

                        {/* Department */}
                        <div className="space-y-1.5">
                          <Label htmlFor="department" className="text-sm font-medium text-foreground/80">
                            <MapPin className="mr-1.5 inline h-3.5 w-3.5 text-muted-foreground" />
                            Departamento *
                          </Label>
                          <Select
                            value={form.department}
                            onValueChange={(v) => {
                              updateForm("department", v);
                              setForm((prev) => ({ ...prev, municipality: "" }));
                            }}
                          >
                            <SelectTrigger
                              id="department"
                              className="border-white/[0.06] bg-background/50 transition-all focus:border-rose-brand/30 focus:ring-[3px] focus:ring-rose-brand/10"
                            >
                              <SelectValue placeholder="Selecciona tu departamento" />
                            </SelectTrigger>
                            <SelectContent className="max-h-60 border-white/[0.06] bg-card backdrop-blur-xl">
                              {COLOMBIA_LOCATIONS.map((dept) => (
                                <SelectItem key={dept.code} value={dept.code}>
                                  {dept.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Municipality */}
                        <div className="space-y-1.5">
                          <Label htmlFor="municipality" className="text-sm font-medium text-foreground/80">
                            Municipio / Ciudad *
                          </Label>
                          <Select
                            value={form.municipality}
                            onValueChange={(v) => updateForm("municipality", v)}
                            disabled={!form.department}
                          >
                            <SelectTrigger
                              id="municipality"
                              className="border-white/[0.06] bg-background/50 transition-all focus:border-rose-brand/30 focus:ring-[3px] focus:ring-rose-brand/10"
                            >
                              <SelectValue
                                placeholder={
                                  form.department
                                    ? municipalities.length > 0
                                      ? "Selecciona tu municipio"
                                      : "No hay municipios"
                                    : "Primero el departamento"
                                }
                              />
                            </SelectTrigger>
                            <SelectContent className="max-h-60 border-white/[0.06] bg-card backdrop-blur-xl">
                              {municipalities.map((muni) => (
                                <SelectItem key={muni} value={muni}>
                                  {muni}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Neighborhood */}
                        <div className="space-y-1.5">
                          <Label htmlFor="neighborhood" className="text-sm font-medium text-foreground/80">
                            Barrio
                          </Label>
                          <Input
                            id="neighborhood"
                            value={form.neighborhood}
                            onChange={(e) => updateForm("neighborhood", e.target.value)}
                            placeholder="Centro"
                            className="border-white/[0.06] bg-background/50 transition-all focus:border-rose-brand/30 focus:shadow-[0_0_0_3px_rgba(225,100,120,0.08)]"
                          />
                        </div>

                        {/* Instructions */}
                        <div className="space-y-1.5 sm:col-span-2">
                          <Label htmlFor="instructions" className="text-sm font-medium text-foreground/80">
                            <MessageSquare className="mr-1.5 inline h-3.5 w-3.5 text-muted-foreground" />
                            Instrucciones especiales
                          </Label>
                          <Textarea
                            id="instructions"
                            value={form.specialInstructions}
                            onChange={(e) => updateForm("specialInstructions", e.target.value)}
                            placeholder="Casa verde con portón negro, junto al parque..."
                            rows={3}
                            className="border-white/[0.06] bg-background/50 transition-all focus:border-rose-brand/30 focus:shadow-[0_0_0_3px_rgba(225,100,120,0.08)]"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* ── Payment Method — Contra Entrega Only ── */}
                  <motion.div
                    variants={fadeUp}
                    className="relative overflow-hidden rounded-2xl border border-green-500/15 bg-gradient-to-br from-green-500/[0.06] via-card to-emerald-500/[0.03] shadow-lg shadow-black/10"
                  >
                    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-green-500/10 blur-3xl" />

                    <div className="relative p-6">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/10 ring-1 ring-green-500/20">
                          <Banknote className="h-6 w-6 text-green-400" />
                        </div>
                        <div>
                          <h2 className="text-lg font-bold text-foreground">
                            Pago contra entrega
                          </h2>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            Pagas en efectivo cuando recibes tu pedido.
                            Sin riesgos, sin pagos anticipados.
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2.5 rounded-xl border border-green-500/10 bg-green-500/5 px-4 py-3">
                          <Truck className="h-4 w-4 shrink-0 text-green-400" />
                          <span className="text-sm font-medium text-green-300/90">
                            Envío GRATIS
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5 rounded-xl border border-green-500/10 bg-green-500/5 px-4 py-3">
                          <Shield className="h-4 w-4 shrink-0 text-green-400" />
                          <span className="text-sm font-medium text-green-300/90">
                            Compra protegida
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* ── Trust Badges ── */}
                  <motion.div
                    variants={fadeUp}
                    className="flex flex-wrap items-center justify-center gap-6 py-2"
                  >
                    {[
                      { icon: Lock, label: "Datos seguros" },
                      { icon: Truck, label: "Envío gratis" },
                      { icon: Shield, label: "Garantía total" },
                    ].map((badge) => {
                      const Icon = badge.icon;
                      return (
                        <div key={badge.label} className="flex items-center gap-1.5 text-muted-foreground/50">
                          <Icon className="h-3.5 w-3.5" />
                          <span className="text-xs font-medium">{badge.label}</span>
                        </div>
                      );
                    })}
                  </motion.div>

                  {/* ── Submit CTA ── */}
                  <motion.div variants={fadeUp}>
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 via-rose-brand to-orange-500 bg-[length:200%_100%] px-8 py-4 text-base font-bold text-white shadow-xl shadow-rose-brand/20 transition-all hover:bg-[100%] hover:shadow-2xl hover:shadow-rose-brand/30 lg:w-auto lg:px-10 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Procesando pedido...
                        </>
                      ) : (
                        <>
                          <Banknote className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                          Confirmar pedido
                          <span className="ml-2 text-white/70">
                            · ${total.toLocaleString("es-CO")}
                          </span>
                        </>
                      )}
                      {/* Shimmer overlay */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent bg-[length:200%_100%] animate-[shimmer_2.5s_linear_infinite]" />
                    </Button>
                  </motion.div>
                </form>
              </motion.div>

              {/* ── Right Column — Premium Order Summary ── */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:w-[34%]"
              >
                <div className="sticky top-4 space-y-4">
                  {/* Summary card */}
                  <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-card via-card to-rose-brand/[0.02] shadow-xl shadow-black/10">
                    {/* Decorative top glow */}
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-500 via-rose-brand to-orange-500" />

                    <div className="p-6">
                      <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-foreground">
                        <Sparkles className="h-5 w-5 text-rose-brand" />
                        Resumen del pedido
                      </h2>

                      {/* Items */}
                      <div className="max-h-64 space-y-3 overflow-y-auto pr-1">
                        {items.map((item) => (
                          <motion.div
                            key={`${item.productId}-${item.size}`}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="group/item flex gap-3 rounded-xl p-2 transition-colors hover:bg-white/[0.02]"
                          >
                            {item.image && (
                              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted ring-1 ring-white/[0.04]">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  className="object-cover transition-transform group-hover/item:scale-105"
                                  sizes="64px"
                                  quality={100}
                                />
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium text-foreground">
                                {item.name}
                              </p>
                              <p className="mt-0.5 text-xs text-muted-foreground">
                                Talla: {item.size} · Cantidad: {item.quantity}
                              </p>
                            </div>
                            <p className="shrink-0 text-sm font-bold text-foreground">
                              ${(item.price * item.quantity).toLocaleString("es-CO")}
                            </p>
                          </motion.div>
                        ))}
                      </div>

                      {/* Divider */}
                      <div className="section-divider my-5" />

                      {/* Totals */}
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span className="font-semibold text-foreground">
                            ${cartTotal.toLocaleString("es-CO")}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Envío</span>
                          <span className="rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-bold text-green-400">
                            GRATIS
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Método de pago</span>
                          <span className="flex items-center gap-1 font-medium text-green-400">
                            <Banknote className="h-3.5 w-3.5" />
                            Contra entrega
                          </span>
                        </div>

                        <div className="section-divider" />

                        <div className="flex justify-between items-baseline">
                          <span className="text-base font-bold text-foreground">
                            Total
                          </span>
                          <span className="gradient-text text-2xl font-extrabold">
                            ${total.toLocaleString("es-CO")}
                          </span>
                        </div>
                        <p className="text-center text-[11px] text-muted-foreground/60">
                          Pagas este monto en efectivo al recibir
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Security badge */}
                  <div className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.04] bg-card/50 px-4 py-3">
                    <Lock className="h-3.5 w-3.5 text-green-400" />
                    <span className="text-xs font-medium text-muted-foreground">
                      Tus datos están encriptados y protegidos
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            /* ═══════════════════ Success State ═══════════════════ */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-lg"
            >
              <div className="relative overflow-hidden rounded-3xl border border-green-500/15 bg-gradient-to-br from-card via-card to-green-500/[0.04] p-10 text-center shadow-2xl shadow-black/20">
                {/* Decorative elements */}
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-green-500 via-emerald-400 to-green-500" />
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-green-500/10 blur-3xl" />
                <div className="absolute -left-12 -bottom-12 h-36 w-36 rounded-full bg-emerald-500/8 blur-3xl" />

                <div className="relative">
                  {/* Animated checkmark */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
                    className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/10 ring-2 ring-green-500/20"
                  >
                    <CircleCheck className="h-14 w-14 text-green-400" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h2 className="mb-2 text-2xl font-extrabold text-foreground">
                      ¡Pedido realizado!
                    </h2>
                    <p className="mb-1 text-muted-foreground">
                      Tu orden ha sido registrada correctamente.
                    </p>
                    {orderId && (
                      <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-rose-brand/10 px-4 py-2 ring-1 ring-rose-brand/20">
                        <span className="text-xs text-muted-foreground">Orden</span>
                        <span className="font-mono text-sm font-bold text-rose-brand">
                          {orderId}
                        </span>
                      </div>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-6 space-y-3"
                  >
                    <div className="rounded-xl border border-green-500/10 bg-green-500/5 p-4">
                      <div className="flex items-center justify-center gap-2 text-sm font-semibold text-green-400">
                        <Banknote className="h-4 w-4" />
                        Pago contra entrega
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        Te contactaremos por WhatsApp para confirmar los detalles del envío.
                        Paga en efectivo cuando recibas tu pedido en la puerta de tu casa.
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                      <Button
                        asChild
                        variant="outline"
                        className="rounded-xl border-white/[0.06] hover:bg-white/[0.04]"
                      >
                        <Link href="/pedidos">Ver mis pedidos</Link>
                      </Button>
                      <Button
                        asChild
                        className="rounded-xl bg-gradient-to-r from-orange-500 to-rose-brand text-white shadow-lg shadow-rose-brand/20 hover:shadow-xl hover:shadow-rose-brand/30"
                      >
                        <Link href="/">
                          <Sparkles className="mr-2 h-4 w-4" />
                          Seguir comprando
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-white/10 border-t-rose-brand" />
            <span className="text-sm text-muted-foreground">Cargando checkout...</span>
          </div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
