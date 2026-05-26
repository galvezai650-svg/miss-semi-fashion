"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUp, Instagram, Facebook, MessageCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const footerSections = [
  {
    title: "Tienda",
    links: [
      { label: "Hombre", href: "/hombre" },
      { label: "Lencería", href: "/lenceria" },
      { label: "Niños", href: "/ninos" },
      { label: "Adornos", href: "/adornos" },
      { label: "Hogar", href: "/hogar" },
      { label: "Ofertas", href: "/ofertas" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre nosotros", href: "/nosotros" },
      { label: "Blog", href: "/blog" },
      { label: "Empleo", href: "/empleo" },
      { label: "Prensa", href: "/prensa" },
      { label: "Vende con nosotros", href: "/vender" },
    ],
  },
  {
    title: "Soporte",
    links: [
      { label: "Centro de ayuda", href: "/ayuda" },
      { label: "Devoluciones", href: "/devoluciones" },
      { label: "Garantía", href: "/garantia" },
      { label: "Mis Pedidos", href: "/pedidos" },
      { label: "WhatsApp", href: "/ayuda" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Contra entrega", href: "/pago/contra-entrega" },
      { label: "Afiliados", href: "/afiliados" },
      { label: "Mayorista", href: "/mayorista" },
    ],
  },
];

export default function AmazonFooter() {
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleAdminSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("admin_token", data.token);
        window.location.href = "/admin";
      } else {
        setError(data.error || "Contraseña incorrecta");
      }
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="w-full border-t border-white/10 bg-black/60 backdrop-blur-xl text-[#CCC]"
    >
      {/* ── Newsletter Section ── */}
      <div className="border-b border-[#333]">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-14 text-center md:flex-row md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1"
          >
            <h3 className="font-serif text-xl font-medium text-white md:text-2xl">
              Únete al mundo Miss Semi Fashion
            </h3>
            <p className="mt-2 text-sm text-[#999]">
              Recibe ofertas exclusivas, novedades y estilo directo en tu
              bandeja.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-full gap-2 md:max-w-sm"
          >
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="input-glow h-11 flex-1 rounded-none border border-[#444] bg-[#2A2A2A] px-4 text-sm text-white placeholder:text-[#666]"
            />
            <Button className="btn-press h-11 rounded-none bg-[#C6A962] px-6 font-medium text-[#1A1A1A] hover:bg-[#D4AF37]">
              Suscribir
            </Button>
          </motion.div>
        </div>
      </div>

      {/* ── Main Footer Content ── */}
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 lg:gap-16">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.png"
                alt="Miss Semi Fashion"
                width={140}
                height={42}
                className="h-8 w-auto opacity-90 transition-opacity duration-300 hover:opacity-100"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[#888]">
              Confeccionamos prendas de calidad premium. Moda para toda la
              familia, hecha en Colombia con amor y las mejores telas.
            </p>
            {/* Social */}
            <div className="mt-6 flex items-center gap-3">
              {[
                { href: "https://wa.me/573108416620", icon: MessageCircle, label: "WhatsApp" },
                { href: "#", icon: Instagram, label: "Instagram" },
                { href: "#", icon: Facebook, label: "Facebook" },
              ].map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#444] text-[#888] transition-colors duration-300 hover:border-[#C6A962] hover:text-[#C6A962]"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link Sections */}
          {footerSections.map((section, sectionIdx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: (sectionIdx + 1) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h3 className="mb-5 text-xs font-semibold tracking-[0.2em] text-[#C6A962] uppercase">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-[#888] transition-colors duration-300 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-[#333]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
          <button
            onClick={() => setAdminModalOpen(true)}
            className="cursor-pointer text-[12px] text-[#666] transition-colors duration-300 hover:text-[#C6A962]"
          >
            &copy; {new Date().getFullYear()} Miss Semi Fashion. Todos los
            derechos reservados.
          </button>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="btn-press flex items-center gap-2 text-[12px] tracking-[0.1em] text-[#888] transition-colors duration-300 hover:text-[#C6A962] uppercase"
          >
            Volver arriba
            <ArrowUp className="h-3.5 w-3.5" />
          </motion.button>
        </div>
      </div>

      {/* ── Admin Password Modal ── */}
      <Dialog open={adminModalOpen} onOpenChange={setAdminModalOpen}>
        <DialogContent className="bg-black/80 backdrop-blur-xl border border-[#2A2A2A] sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 font-serif text-xl text-[#E5E5E5]">
              <ShieldCheck className="h-6 w-6 text-[#C6A962]" />
              Panel de Administración
            </DialogTitle>
            <DialogDescription className="text-[#888888]">
              Ingresa la contraseña para acceder al panel administrativo.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAdminSubmit} className="flex flex-col gap-4 pt-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#B3B3B3]">
                Contraseña
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="••••••••"
                className="input-glow h-11 border-[#2A2A2A] bg-[#1A1A1A] text-[#E5E5E5] placeholder:text-[#555]"
                autoFocus
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-400"
              >
                {error}
              </motion.p>
            )}

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setAdminModalOpen(false);
                  setPassword("");
                  setError("");
                }}
                className="text-[#888888] hover:text-[#E5E5E5] hover:bg-white/5"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={loading || !password}
                className="btn-press bg-[#C6A962] text-[#0A0A0A] hover:bg-[#D4AF37] disabled:opacity-50"
              >
                {loading ? "Accediendo..." : "Acceder"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </motion.footer>
  );
}
