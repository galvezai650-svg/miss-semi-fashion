"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Plus, Trash2, Star, LogIn } from "lucide-react";
import Breadcrumbs from "@/components/amazon/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/stores/auth-store";
import Link from "next/link";
import { toast } from "sonner";

const colombianCities = [
  "Bogota",
  "Medellin",
  "Cali",
  "Barranquilla",
  "Cartagena",
  "Bucaramanga",
  "Pereira",
  "Santa Marta",
  "Manizales",
  "Ibague",
  "Cucuta",
  "Villavicencio",
  "Pasto",
  "Armenia",
  "Neiva",
  "Monteria",
  "Popayan",
  "Sincelejo",
  "Valledupar",
  "Tunja",
  "Florencia",
  "Riohacha",
  "Quibdo",
  "Mocoa",
  "Chinchina",
  "Envigado",
  "Bello",
  "Itagui",
  "Soledad",
  "Palmira",
];

export default function DireccionesPage() {
  const { isLoggedIn, addresses, addAddress, removeAddress, setDefaultAddress } =
    useAuthStore();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [phone, setPhone] = useState("");

  function handleAddAddress(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !address || !city || !phone) {
      toast.error("Por favor completa todos los campos obligatorios");
      return;
    }
    addAddress({
      name,
      address,
      city,
      neighborhood,
      phone,
      isDefault: addresses.length === 0,
    });
    toast.success("Direccion guardada exitosamente");
    setName("");
    setAddress("");
    setCity("");
    setNeighborhood("");
    setPhone("");
  }

  function handleRemoveAddress(id: string) {
    removeAddress(id);
    toast.success("Direccion eliminada");
  }

  function handleSetDefault(id: string) {
    setDefaultAddress(id);
    toast.success("Direccion predeterminada actualizada");
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
                { label: "Direcciones" },
              ]}
            />
          </div>
        </div>
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <LogIn className="mx-auto mb-4 h-16 w-16 text-gray-300" />
          <h2 className="mb-2 text-xl font-semibold text-gray-700">
            Inicia sesion para ver tus direcciones
          </h2>
          <p className="mb-6 text-gray-500">
            Necesitas iniciar sesion para gestionar tus direcciones de envio.
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
              { label: "Direcciones" },
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
          <MapPin className="h-7 w-7 text-orange-500" />
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Tus Direcciones
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Add Address Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Plus className="h-5 w-5 text-orange-500" />
                  Agregar nueva direccion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddAddress} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address-name">Nombre completo *</Label>
                    <Input
                      id="address-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address-street">Direccion *</Label>
                    <Input
                      id="address-street"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Calle, carrera, numero, apto"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address-city">Ciudad *</Label>
                    <Select value={city} onValueChange={setCity}>
                      <SelectTrigger id="address-city">
                        <SelectValue placeholder="Selecciona tu ciudad" />
                      </SelectTrigger>
                      <SelectContent>
                        {colombianCities.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address-neighborhood">Barrio</Label>
                    <Input
                      id="address-neighborhood"
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                      placeholder="Nombre del barrio"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address-phone">Telefono *</Label>
                    <Input
                      id="address-phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="310 123 4567"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    Guardar direccion
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Address List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {addresses.length > 0 ? (
              <div className="space-y-4">
                {addresses.map((addr, index) => (
                  <motion.div
                    key={addr.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + index * 0.05 }}
                  >
                    <Card className={addr.isDefault ? "border-orange-300" : ""}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <div className="mb-1 flex items-center gap-2">
                              <p className="font-semibold text-gray-900">
                                {addr.name}
                              </p>
                              {addr.isDefault && (
                                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                                  <Star className="mr-1 h-3 w-3" />
                                  Predeterminada
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-700">{addr.address}</p>
                            <p className="text-sm text-gray-700">
                              {addr.city}
                              {addr.neighborhood
                                ? `, ${addr.neighborhood}`
                                : ""}
                            </p>
                            <p className="text-sm text-gray-500">
                              Tel: {addr.phone}
                            </p>
                          </div>
                          <div className="flex shrink-0 flex-col gap-1.5">
                            {!addr.isDefault && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleSetDefault(addr.id)}
                                className="text-xs"
                              >
                                <Star className="mr-1 h-3 w-3" />
                                Predeterminada
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveAddress(addr.id)}
                              className="text-xs text-red-600 hover:bg-red-50 hover:text-red-700"
                            >
                              <Trash2 className="mr-1 h-3 w-3" />
                              Eliminar
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                  <MapPin className="mb-3 h-12 w-12 text-gray-300" />
                  <p className="mb-1 font-medium text-gray-600">
                    No tienes direcciones guardadas
                  </p>
                  <p className="text-sm text-gray-400">
                    Agrega tu primera direccion usando el formulario
                  </p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
