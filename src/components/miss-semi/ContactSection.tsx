"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Send,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    nombre: "",
    whatsapp: "",
    mensaje: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombre.trim() || !formData.whatsapp.trim() || !formData.mensaje.trim()) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSubmitted(true);
        toast.success("Mensaje enviado exitosamente!");
        setFormData({ nombre: "", whatsapp: "", mensaje: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        toast.error("Error al enviar. Intenta por WhatsApp.");
      }
    } catch {
      toast.error("Error de conexion. Intenta por WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-20 md:py-28 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <Badge
            variant="secondary"
            className="mb-4 px-3 py-1.5 text-xs font-medium bg-primary/10 text-primary border-primary/20"
          >
            Contacto
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Escribenos <span className="gradient-text">Hoy</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Estamos para ayudarte. Contactanos por WhatsApp, llamanos o llena el
            formulario y te responderemos lo antes posible.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-14">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Phone numbers */}
            <div className="bg-card rounded-2xl border border-border/50 p-6 space-y-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                Telefonos
              </h3>
              <div className="space-y-3">
                <a
                  href="tel:+573108416620"
                  className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      310 841 6620
                    </p>
                    <p className="text-xs text-muted-foreground">
                      WhatsApp Principal
                    </p>
                  </div>
                </a>
                <a
                  href="tel:+573137932387"
                  className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      313 793 2387
                    </p>
                    <p className="text-xs text-muted-foreground">
                      WhatsApp Alternativo
                    </p>
                  </div>
                </a>
                <a
                  href="tel:+5766813248"
                  className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      (6) 681 3248
                    </p>
                    <p className="text-xs text-muted-foreground">Telefono Fijo</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Instagram */}
            <a
              href="https://instagram.com/misssemifashion"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-card rounded-2xl border border-border/50 p-6 hover:border-pink-400/30 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Instagram className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  @misssemifashion
                </p>
                <p className="text-xs text-muted-foreground">
                  Siguenos en Instagram - DM para pedidos
                </p>
              </div>
            </a>

            {/* Location */}
            <div className="bg-card rounded-2xl border border-border/50 p-6">
              <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-primary" />
                Ubicacion
              </h3>
              <div className="rounded-xl overflow-hidden border border-border/30">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63036108.44665592!2d-80.98144702141925!3d4.624335942897607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f85c71e4c6a7d%3A0x8e15c68a3e399e4b!2sColombia!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicacion Miss Semi Fashion - Colombia"
                  className="w-full"
                />
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Chinchina, Caldas - Colombia
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="bg-card rounded-2xl border border-border/50 p-6 sm:p-8 shadow-lg shadow-primary/5">
              <h3 className="text-xl font-bold mb-1">Enviar Mensaje</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Completa el formulario y te contactaremos pronto.
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-bold mb-2">Mensaje Enviado!</h4>
                  <p className="text-muted-foreground">
                    Gracias por contactarnos. Te responderemos pronto.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="nombre" className="text-sm font-medium">
                      Nombre completo
                    </Label>
                    <Input
                      id="nombre"
                      placeholder="Tu nombre"
                      value={formData.nombre}
                      onChange={(e) =>
                        setFormData({ ...formData, nombre: e.target.value })
                      }
                      className="rounded-xl border-border/50 focus:border-primary focus:ring-primary/20"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="whatsapp" className="text-sm font-medium">
                      Numero de WhatsApp
                    </Label>
                    <Input
                      id="whatsapp"
                      type="tel"
                      placeholder="Ej: 310 841 6620"
                      value={formData.whatsapp}
                      onChange={(e) =>
                        setFormData({ ...formData, whatsapp: e.target.value })
                      }
                      className="rounded-xl border-border/50 focus:border-primary focus:ring-primary/20"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mensaje" className="text-sm font-medium">
                      Mensaje
                    </Label>
                    <Textarea
                      id="mensaje"
                      placeholder="Hola, quiero info de..."
                      rows={4}
                      value={formData.mensaje}
                      onChange={(e) =>
                        setFormData({ ...formData, mensaje: e.target.value })
                      }
                      className="rounded-xl border-border/50 focus:border-primary focus:ring-primary/20 resize-none"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full gap-2 bg-primary hover:bg-rose-dark text-primary-foreground rounded-xl py-6 text-base font-semibold shadow-lg shadow-primary/25"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Enviar Mensaje
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    O contactanos directamente por{" "}
                    <a
                      href="https://wa.me/573108416620?text=Hola%2C%20quiero%20info%20de%20sus%20productos"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline font-medium"
                    >
                      WhatsApp
                    </a>
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
