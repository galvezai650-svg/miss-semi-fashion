"use client";

import { motion } from "framer-motion";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/amazon/Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const blogPosts = [
  {
    id: 1,
    title: "Tendencias de Moda para esta Temporada",
    excerpt:
      "Descubre las ultimas tendencias que estan marcando pauta en la moda colombiana. Colores vibrantes, texturas suaves y cortes modernos que no puedes dejar pasar.",
    date: "15 de abril de 2026",
    category: "Tendencias",
    image: "/images/blog/tendencias.jpg",
    color: "bg-pink-100 text-pink-600",
  },
  {
    id: 2,
    title: "5 Consejos para armar tu Guardarropa Ideal",
    excerpt:
      "Aprende como seleccionar prendas versatiles que combinen entre si. Te ensenamos los secretos para tener un closet funcional y siempre a la moda.",
    date: "10 de abril de 2026",
    category: "Consejos",
    image: "/images/blog/guardarropa.jpg",
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 3,
    title: "Nuevas Llegadas: Coleccion Primavera-Verano",
    excerpt:
      "Conoce nuestra nueva coleccion con disenos frescos y modernos perfectos para los dias calidos. Pijamas, vestidos, blusas y mucho mas.",
    date: "5 de abril de 2026",
    category: "Nuevos",
    image: "/images/blog/coleccion.jpg",
    color: "bg-green-100 text-green-600",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <Breadcrumbs
            items={[{ label: "Inicio", href: "/" }, { label: "Blog" }]}
          />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-3"
        >
          <BookOpen className="h-7 w-7 text-orange-500" />
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Blog de Moda
          </h1>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <a href="#" className="group block">
                <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
                  <CardContent className="p-0">
                    {/* Image placeholder */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="h-16 w-16 text-gray-300" />
                      </div>
                      <div className="absolute left-3 top-3">
                        <Badge className={post.color}>{post.category}</Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="mb-2 flex items-center gap-1.5 text-xs text-gray-400">
                        <Calendar className="h-3.5 w-3.5" />
                        {post.date}
                      </div>
                      <h2 className="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-orange-600">
                        {post.title}
                      </h2>
                      <p className="mb-4 text-sm text-gray-500 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <span className="inline-flex items-center text-sm font-medium text-orange-600 transition-colors group-hover:text-orange-700">
                        Leer mas
                        <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
