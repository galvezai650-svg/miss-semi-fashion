"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Package,
  Shield,
  MapPin,
  CreditCard,
  Heart,
  Headphones,
  LogIn,
  UserPlus,
  Eye,
  EyeOff,
  ArrowRight,
  LogOut,
  User,
  Mail,
  Phone,
  FileText,
  Lock,
  CheckCircle2,
  X,
} from "lucide-react";
import Breadcrumbs from "@/components/amazon/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useAuthStore } from "@/stores/auth-store";

type AuthTab = "login" | "register";

interface AccountCard {
  icon: React.ElementType;
  title: string;
  description: string;
  href?: string;
  external?: string;
  accent: string;
}

const accountCards: AccountCard[] = [
  { icon: Package, title: "Tus Pedidos", description: "Rastrea, devuelve o compra de nuevo", href: "/pedidos", accent: "bg-blue-100 text-blue-600" },
  { icon: Shield, title: "Seguridad de tu cuenta", description: "Editar nombre, email y contrasena", href: "/cuenta/seguridad", accent: "bg-green-100 text-green-600" },
  { icon: MapPin, title: "Direcciones", description: "Edita direcciones de envio y facturacion", href: "/cuenta/direcciones", accent: "bg-purple-100 text-purple-600" },
  { icon: CreditCard, title: "Metodos de pago", description: "Administra tus formas de pago", href: "/cuenta/pagos", accent: "bg-orange-100 text-orange-600" },
  { icon: Heart, title: "Lista de Deseos", description: "Crea y administra tu lista de deseos", href: "/cuenta/deseos", accent: "bg-pink-100 text-pink-600" },
  { icon: Headphones, title: "Atencion al Cliente", description: "Navega por la ayuda y contactanos", external: "https://wa.me/573108416620", accent: "bg-amber-100 text-amber-600" },
];

// ── Password strength indicator ──
function PasswordStrength({ password }: { password: string }) {
  const getStrength = (p: string) => {
    let score = 0;
    if (p.length >= 6) score++;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  };

  if (!password) return null;

  const strength = getStrength(password);
  if (strength === 0) return null;

  const labels = ["Muy debil", "Debil", "Regular", "Fuerte", "Muy fuerte"];
  const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-400", "bg-green-600"];

  return (
    <div className="space-y-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i <= strength ? colors[strength - 1] : "bg-gray-200 dark:bg-gray-700"
            }`}
          />
        ))}
      </div>
      <p className={`text-xs font-medium ${colors[strength - 1].replace("bg-", "text-")}`}>
        {labels[strength - 1]}
      </p>
    </div>
  );
}

export default function CuentaPage() {
  const [activeTab, setActiveTab] = useState<AuthTab>("login");
  const [isLoading, setIsLoading] = useState(false);

  // Login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Register fields
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regDocument, setRegDocument] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);
  const [regError, setRegError] = useState("");
  const [regSuccess, setRegSuccess] = useState(false);

  const user = useAuthStore((s) => s.currentUser);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const login = useAuthStore((s) => s.login);
  const register = useAuthStore((s) => s.register);
  const logout = useAuthStore((s) => s.logout);

  // ── Login handler ──
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setIsLoading(true);

    // Small delay for UX feel
    setTimeout(() => {
      const result = login(loginEmail, loginPassword);
      setIsLoading(false);

      if (result.success) {
        toast.success(`Bienvenido de vuelta!`);
        setLoginEmail("");
        setLoginPassword("");
        setLoginError("");
      } else {
        setLoginError(result.error || "Error al iniciar sesion");
        toast.error(result.error || "Error al iniciar sesion");
      }
    }, 400);
  }

  // ── Register handler ──
  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setRegError("");
    setIsLoading(true);

    // Client-side validation
    if (!regName.trim() || regName.trim().length < 2) {
      setRegError("El nombre debe tener al menos 2 caracteres");
      setIsLoading(false);
      return;
    }
    if (!regEmail.trim() || !regEmail.includes("@") || !regEmail.includes(".")) {
      setRegError("Ingresa un email valido");
      setIsLoading(false);
      return;
    }
    if (!regPhone.trim() || regPhone.replace(/\D/g, "").length < 7) {
      setRegError("Ingresa un numero de telefono valido (minimo 7 digitos)");
      setIsLoading(false);
      return;
    }
    if (regPassword.length < 6) {
      setRegError("La contrasena debe tener al menos 6 caracteres");
      setIsLoading(false);
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setRegError("Las contrasenas no coinciden");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      const result = register(regName, regEmail, regPhone, regDocument, regPassword);
      setIsLoading(false);

      if (result.success) {
        setRegSuccess(true);
        toast.success(`Cuenta creada exitosamente! Bienvenido/a, ${regName}`);
        // Reset form
        setRegName("");
        setRegEmail("");
        setRegPhone("");
        setRegDocument("");
        setRegPassword("");
        setRegConfirmPassword("");
        setRegError("");
      } else {
        setRegError(result.error || "Error al crear la cuenta");
        toast.error(result.error || "Error al crear la cuenta");
      }
    }, 500);
  }

  // ── Logout handler ──
  function handleLogout() {
    logout();
    toast.success("Has cerrado sesion");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Breadcrumbs */}
      <div className="border-b bg-white dark:bg-gray-900">
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 md:text-3xl">
            {isLoggedIn && user
              ? `Hola, ${user.name}`
              : "Identificate"}
          </h1>
          {isLoggedIn && user && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Miembro desde {new Date(user.createdAt).toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          )}
        </motion.div>

        {isLoggedIn && user ? (
          /* ════════════════════════════════════════
             LOGGED-IN STATE
             ════════════════════════════════════════ */
          <>
            {/* User card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900 md:p-8"
            >
              <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-pink-400 text-xl font-bold text-white shadow-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                    {user.phone && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <Phone className="mr-1 inline h-3 w-3" />
                        {user.phone}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href="/cuenta/seguridad">
                    <Button variant="outline" size="sm" className="gap-1.5">
                      <Shield className="h-4 w-4" />
                      Editar perfil
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:hover:bg-red-950"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar sesion
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Account Cards Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {accountCards.map((card, index) => {
                const Icon = card.icon;
                const cardContent = (
                  <div className="group flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${card.accent}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary dark:text-gray-100">
                        {card.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                        {card.description}
                      </p>
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-gray-300 transition-transform group-hover:translate-x-0.5 group-hover:text-primary dark:text-gray-600" />
                  </div>
                );

                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    {card.href ? (
                      <Link href={card.href}>{cardContent}</Link>
                    ) : card.external ? (
                      <a href={card.external} target="_blank" rel="noopener noreferrer">
                        {cardContent}
                      </a>
                    ) : (
                      cardContent
                    )}
                  </motion.div>
                );
              })}
            </div>
          </>
        ) : (
          /* ════════════════════════════════════════
             AUTH FORMS (LOGIN / REGISTER)
             ════════════════════════════════════════ */
          <>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-10 rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900"
            >
              {/* Tab Switcher */}
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => { setActiveTab("login"); setRegError(""); setLoginError(""); setRegSuccess(false); }}
                  className={`flex flex-1 items-center justify-center gap-2 py-4 text-sm font-semibold transition-colors ${
                    activeTab === "login"
                      ? "border-b-2 border-primary text-primary"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  }`}
                >
                  <LogIn className="h-4 w-4" />
                  Iniciar sesion
                </button>
                <button
                  onClick={() => { setActiveTab("register"); setRegError(""); setLoginError(""); setRegSuccess(false); }}
                  className={`flex flex-1 items-center justify-center gap-2 py-4 text-sm font-semibold transition-colors ${
                    activeTab === "register"
                      ? "border-b-2 border-primary text-primary"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  }`}
                >
                  <UserPlus className="h-4 w-4" />
                  Crear cuenta nueva
                </button>
              </div>

              <div className="p-6 md:p-8">
                <AnimatePresence mode="wait">
                  {/* ── LOGIN TAB ── */}
                  {activeTab === "login" && (
                    <motion.div
                      key="login"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="mb-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                          Inicia sesion
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Ingresa tus credenciales para acceder a tu cuenta
                        </p>
                      </div>

                      <form onSubmit={handleLogin} className="max-w-md space-y-4">
                        {/* Email */}
                        <div className="space-y-1.5">
                          <Label htmlFor="login-email" className="flex items-center gap-1.5 text-sm font-medium">
                            <Mail className="h-3.5 w-3.5 text-gray-400" />
                            Correo electronico
                          </Label>
                          <Input
                            id="login-email"
                            type="email"
                            value={loginEmail}
                            onChange={(e) => { setLoginEmail(e.target.value); setLoginError(""); }}
                            placeholder="tu@email.com"
                            className="h-11 rounded-lg"
                            autoComplete="email"
                          />
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                          <Label htmlFor="login-password" className="flex items-center gap-1.5 text-sm font-medium">
                            <Lock className="h-3.5 w-3.5 text-gray-400" />
                            Contrasena
                          </Label>
                          <div className="relative">
                            <Input
                              id="login-password"
                              type={showLoginPassword ? "text" : "password"}
                              value={loginPassword}
                              onChange={(e) => { setLoginPassword(e.target.value); setLoginError(""); }}
                              placeholder="Tu contrasena"
                              className="h-11 rounded-lg pr-10"
                              autoComplete="current-password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowLoginPassword(!showLoginPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                              tabIndex={-1}
                            >
                              {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>

                        {/* Error */}
                        {loginError && (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-400"
                          >
                            <X className="h-4 w-4 shrink-0" />
                            {loginError}
                          </motion.div>
                        )}

                        {/* Submit */}
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="h-11 w-full rounded-lg bg-primary text-base font-semibold hover:bg-primary/90 disabled:opacity-60"
                        >
                          {isLoading ? (
                            <span className="flex items-center gap-2">
                              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                              Verificando...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <LogIn className="h-4 w-4" />
                              Iniciar sesion
                            </span>
                          )}
                        </Button>
                      </form>

                      {/* Switch to register */}
                      <div className="mt-6 border-t border-gray-100 pt-5 text-center dark:border-gray-800">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          No tienes cuenta?{" "}
                          <button
                            onClick={() => { setActiveTab("register"); setLoginError(""); }}
                            className="font-semibold text-primary hover:underline"
                          >
                            Crear cuenta nueva
                          </button>
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* ── REGISTER TAB ── */}
                  {activeTab === "register" && (
                    <motion.div
                      key="register"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                    >
                      {regSuccess ? (
                        /* ── Success State ── */
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="py-6 text-center"
                        >
                          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                            <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                          </div>
                          <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-gray-100">
                            Cuenta creada exitosamente!
                          </h3>
                          <p className="mb-6 text-gray-500 dark:text-gray-400">
                            Tu cuenta ha sido creada y has iniciado sesion automaticamente.
                          </p>
                          <div className="flex flex-col items-center gap-3">
                            <Link href="/">
                              <Button className="rounded-lg bg-primary hover:bg-primary/90">
                                Empezar a comprar
                              </Button>
                            </Link>
                          </div>
                        </motion.div>
                      ) : (
                        <>
                          <div className="mb-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                              Crear cuenta nueva
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Completa tus datos para registrarte en Miss Semi Fashion
                            </p>
                          </div>

                          <form onSubmit={handleRegister} className="max-w-md space-y-4">
                            {/* Name */}
                            <div className="space-y-1.5">
                              <Label htmlFor="reg-name" className="flex items-center gap-1.5 text-sm font-medium">
                                <User className="h-3.5 w-3.5 text-gray-400" />
                                Nombre completo <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="reg-name"
                                value={regName}
                                onChange={(e) => { setRegName(e.target.value); setRegError(""); }}
                                placeholder="Tu nombre completo"
                                className="h-11 rounded-lg"
                                autoComplete="name"
                              />
                            </div>

                            {/* Email */}
                            <div className="space-y-1.5">
                              <Label htmlFor="reg-email" className="flex items-center gap-1.5 text-sm font-medium">
                                <Mail className="h-3.5 w-3.5 text-gray-400" />
                                Correo electronico <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="reg-email"
                                type="email"
                                value={regEmail}
                                onChange={(e) => { setRegEmail(e.target.value); setRegError(""); }}
                                placeholder="tu@email.com"
                                className="h-11 rounded-lg"
                                autoComplete="email"
                              />
                            </div>

                            {/* Phone */}
                            <div className="space-y-1.5">
                              <Label htmlFor="reg-phone" className="flex items-center gap-1.5 text-sm font-medium">
                                <Phone className="h-3.5 w-3.5 text-gray-400" />
                                Telefono (WhatsApp) <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="reg-phone"
                                type="tel"
                                value={regPhone}
                                onChange={(e) => { setRegPhone(e.target.value); setRegError(""); }}
                                placeholder="310 123 4567"
                                className="h-11 rounded-lg"
                                autoComplete="tel"
                              />
                            </div>

                            {/* Document */}
                            <div className="space-y-1.5">
                              <Label htmlFor="reg-document" className="flex items-center gap-1.5 text-sm font-medium">
                                <FileText className="h-3.5 w-3.5 text-gray-400" />
                                Numero de documento
                              </Label>
                              <Input
                                id="reg-document"
                                value={regDocument}
                                onChange={(e) => { setRegDocument(e.target.value); setRegError(""); }}
                                placeholder="1.098.765.432 (opcional)"
                                className="h-11 rounded-lg"
                              />
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                              <Label htmlFor="reg-password" className="flex items-center gap-1.5 text-sm font-medium">
                                <Lock className="h-3.5 w-3.5 text-gray-400" />
                                Contrasena <span className="text-red-500">*</span>
                              </Label>
                              <div className="relative">
                                <Input
                                  id="reg-password"
                                  type={showRegPassword ? "text" : "password"}
                                  value={regPassword}
                                  onChange={(e) => { setRegPassword(e.target.value); setRegError(""); }}
                                  placeholder="Minimo 6 caracteres"
                                  className="h-11 rounded-lg pr-10"
                                  autoComplete="new-password"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowRegPassword(!showRegPassword)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                  tabIndex={-1}
                                >
                                  {showRegPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                              </div>
                              <PasswordStrength password={regPassword} />
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-1.5">
                              <Label htmlFor="reg-confirm" className="flex items-center gap-1.5 text-sm font-medium">
                                <Lock className="h-3.5 w-3.5 text-gray-400" />
                                Confirmar contrasena <span className="text-red-500">*</span>
                              </Label>
                              <div className="relative">
                                <Input
                                  id="reg-confirm"
                                  type={showRegConfirmPassword ? "text" : "password"}
                                  value={regConfirmPassword}
                                  onChange={(e) => { setRegConfirmPassword(e.target.value); setRegError(""); }}
                                  placeholder="Repite tu contrasena"
                                  className="h-11 rounded-lg pr-10"
                                  autoComplete="new-password"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowRegConfirmPassword(!showRegConfirmPassword)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                  tabIndex={-1}
                                >
                                  {showRegConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                              </div>
                              {regConfirmPassword && regPassword !== regConfirmPassword && (
                                <p className="text-xs text-red-500">Las contrasenas no coinciden</p>
                              )}
                            </div>

                            {/* Error */}
                            {regError && (
                              <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-400"
                              >
                                <X className="h-4 w-4 shrink-0" />
                                {regError}
                              </motion.div>
                            )}

                            {/* Terms */}
                            <p className="text-xs text-gray-400 dark:text-gray-500">
                              Al crear una cuenta, aceptas nuestros{" "}
                              <Link href="/ayuda" className="text-primary hover:underline">
                                Terminos y Condiciones
                              </Link>{" "}
                              y{" "}
                              <Link href="/devoluciones" className="text-primary hover:underline">
                                Politica de Privacidad
                              </Link>
                              .
                            </p>

                            {/* Submit */}
                            <Button
                              type="submit"
                              disabled={isLoading}
                              className="h-11 w-full rounded-lg bg-primary text-base font-semibold hover:bg-primary/90 disabled:opacity-60"
                            >
                              {isLoading ? (
                                <span className="flex items-center gap-2">
                                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                  Creando cuenta...
                                </span>
                              ) : (
                                <span className="flex items-center gap-2">
                                  <UserPlus className="h-4 w-4" />
                                  Crear mi cuenta
                                </span>
                              )}
                            </Button>
                          </form>

                          {/* Switch to login */}
                          <div className="mt-6 border-t border-gray-100 pt-5 text-center dark:border-gray-800">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Ya tienes cuenta?{" "}
                              <button
                                onClick={() => { setActiveTab("login"); setRegError(""); }}
                                className="font-semibold text-primary hover:underline"
                              >
                                Iniciar sesion
                              </button>
                            </p>
                          </div>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
