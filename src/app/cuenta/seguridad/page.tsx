"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  LogIn,
  Eye,
  EyeOff,
  Save,
  LogOut,
  User,
  Mail,
  Phone,
} from "lucide-react";
import Breadcrumbs from "@/components/amazon/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/stores/auth-store";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SeguridadPage() {
  const router = useRouter();
  const { isLoggedIn, currentUser, updateProfile, changePassword, logout, deleteAccount } = useAuthStore();

  const [name, setName] = useState(currentUser?.name ?? "");
  const [email, setEmail] = useState(currentUser?.email ?? "");
  const [phone, setPhone] = useState(currentUser?.phone ?? "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handleSaveChanges(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword) {
      if (!currentPassword) {
        toast.error("Ingresa tu contrasena actual para cambiarla");
        return;
      }
      if (newPassword !== confirmPassword) {
        toast.error("Las contrasenas no coinciden");
        return;
      }
      const result = changePassword(currentPassword, newPassword);
      if (!result.success) {
        toast.error(result.error || "No se pudo cambiar la contrasena");
        return;
      }
      toast.success("Contrasena actualizada");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
    updateProfile({ name, email, phone });
    toast.success("Perfil actualizado exitosamente");
  }

  function handleLogout() {
    logout();
    router.push("/");
    toast.success("Sesion cerrada");
  }

  function handleDeleteAccount() {
    if (window.confirm("Estas seguro? Se eliminara tu cuenta y toda tu informacion. Esta accion no se puede deshacer.")) {
      deleteAccount();
      router.push("/");
      toast.success("Tu cuenta ha sido eliminada");
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b bg-card">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <Breadcrumbs
              items={[
                { label: "Inicio", href: "/" },
                { label: "Tu Cuenta", href: "/cuenta" },
                { label: "Seguridad" },
              ]}
            />
          </div>
        </div>
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <LogIn className="mx-auto mb-4 h-16 w-16 text-muted-foreground/50" />
          <h2 className="mb-2 text-xl font-semibold text-foreground">
            Inicia sesion para gestionar tu cuenta
          </h2>
          <p className="mb-6 text-muted-foreground">
            Necesitas iniciar sesion para acceder a la configuracion de seguridad.
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
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: "Tu Cuenta", href: "/cuenta" },
              { label: "Seguridad" },
            ]}
          />
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-3"
        >
          <Shield className="h-7 w-7 text-orange-500" />
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Seguridad de tu Cuenta
          </h1>
        </motion.div>

        {/* Profile Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informacion personal</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveChanges} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="profile-name" className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    Nombre completo
                  </Label>
                  <Input
                    id="profile-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profile-email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    Correo electronico
                  </Label>
                  <Input
                    id="profile-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profile-phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    Telefono
                  </Label>
                  <Input
                    id="profile-phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="310 123 4567"
                  />
                </div>

                <Separator />

                <div>
                  <p className="mb-4 font-medium text-foreground">
                    Cambiar contrasena
                  </p>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Contrasena actual</Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          type={showCurrentPassword ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="Tu contrasena actual"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          tabIndex={-1}
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nueva contrasena</Label>
                      <div className="relative">
                        <Input
                          id="new-password"
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Minimo 6 caracteres"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          tabIndex={-1}
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">
                        Confirmar contrasena
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirma tu contrasena"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          tabIndex={-1}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Guardar cambios
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Logout Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <Card className="border-red-100">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Cerrar sesion</p>
                  <p className="text-sm text-muted-foreground">
                    Salir de tu cuenta en este dispositivo
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-500/10 hover:text-red-700"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar sesion
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Delete Account Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4"
        >
          <Card className="border-border">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-red-600">Eliminar mi cuenta</p>
                  <p className="text-sm text-muted-foreground">
                    Se eliminara permanentemente tu cuenta y todos tus datos
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-600 hover:text-white"
                  onClick={handleDeleteAccount}
                >
                  Eliminar cuenta
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
