"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ShoppingCart,
  Eye,
  Tag,
  Ruler,
  Truck,
  ZoomIn,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  priceDetal: string;
  priceMayorista: string;
  minMayorista: string;
  sizes: string[];
  fabric: string;
  badge?: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Pijama Trio Dama",
    description:
      "Pijama de tres piezas en tela suave y comoda. Perfecto para descansar con estilo.",
    image: "/images/pijama.png",
    priceDetal: "$35.000",
    priceMayorista: "$28.000",
    minMayorista: "3 und",
    sizes: ["S", "M", "L", "XL"],
    fabric: "Tela suave premium",
    badge: "Mas vendido",
  },
  {
    id: 2,
    name: "Blusa Perlitas Cuello",
    description:
      "Elegante blusa con embellishments de perlitas en el cuello. Diseno unico colombiano.",
    image: "/images/blusa-perlitas.png",
    priceDetal: "$42.000",
    priceMayorista: "$35.000",
    minMayorista: "3 und",
    sizes: ["S", "M", "L", "XL"],
    fabric: "Piel durazno",
    badge: "Nuevo",
  },
  {
    id: 3,
    name: "Vestido Deportivo Licra",
    description:
      "Vestido deportivo en licra colombiana de alta calidad. Ideal para ejercicio y uso casual.",
    image: "/images/vestido-deportivo.png",
    priceDetal: "$80.000",
    priceMayorista: "$65.000",
    minMayorista: "3 und",
    sizes: ["S", "M", "L", "XL"],
    fabric: "Licra colombiana",
    badge: "Popular",
  },
  {
    id: 4,
    name: "Pantalon Crema Elegante",
    description:
      "Pantalon color crema de corte elegante. Versatil para cualquier ocasion.",
    image: "/images/pantalones.png",
    priceDetal: "$32.000",
    priceMayorista: "$26.000",
    minMayorista: "3 und",
    sizes: ["S", "M", "L", "XL"],
    fabric: "Tela premium",
  },
  {
    id: 5,
    name: "Conjunto Deportivo",
    description:
      "Conjunto deportivo de dos piezas en licra. Top y leggings a juego, comodidad total.",
    image: "/images/conjunto-deportivo.png",
    priceDetal: "$75.000",
    priceMayorista: "$60.000",
    minMayorista: "3 und",
    sizes: ["S", "M", "L"],
    fabric: "Licra colombiana",
    badge: "Nuevo",
  },
  {
    id: 6,
    name: "Leggings Premium",
    description:
      "Leggings de alta cintura en licra premium. Sujecion y comodidad para tu dia a dia.",
    image: "/images/leggings.png",
    priceDetal: "$45.000",
    priceMayorista: "$36.000",
    minMayorista: "3 und",
    sizes: ["S", "M", "L", "XL"],
    fabric: "Licra colombiana",
  },
];

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onImageClick: (product: Product) => void;
}

function ProductCard({ product, onAddToCart, onImageClick }: ProductCardProps) {
  const whatsappLink = `https://wa.me/573108416620?text=Hola%2C%20quiero%20info%20de%20${encodeURIComponent(product.name)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 transition-all duration-500"
    >
      {/* Image */}
      <div
        className="relative aspect-[3/4] overflow-hidden cursor-pointer"
        onClick={() => onImageClick(product)}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Zoom overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 dark:bg-black/70 p-3 rounded-full">
            <ZoomIn className="w-6 h-6 text-primary" />
          </div>
        </div>

        {/* Badge */}
        {product.badge && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground border-0 px-3 py-1 text-xs font-semibold">
            {product.badge}
          </Badge>
        )}

        {/* Fabric tag */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/90 dark:bg-black/70 backdrop-blur-sm rounded-full px-3 py-1.5">
          <Tag className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-medium text-foreground">{product.fabric}</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 sm:p-5">
        <h3 className="font-bold text-lg text-foreground mb-1.5 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Sizes */}
        <div className="flex items-center gap-2 mb-4">
          <Ruler className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <div className="flex gap-1.5">
            {product.sizes.map((size) => (
              <span
                key={size}
                className="px-2 py-0.5 text-xs font-medium bg-muted rounded-md text-muted-foreground"
              >
                {size}
              </span>
            ))}
          </div>
        </div>

        {/* Prices */}
        <div className="flex items-end gap-3 mb-4">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Detal</p>
            <p className="text-xl font-bold text-primary">{product.priceDetal}</p>
          </div>
          <div className="pb-0.5">
            <p className="text-xs text-muted-foreground mb-0.5">
              Mayorista (min {product.minMayorista})
            </p>
            <p className="text-base font-semibold text-foreground/70">
              {product.priceMayorista}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            size="sm"
            className="flex-1 gap-1.5 bg-primary hover:bg-rose-dark text-primary-foreground rounded-xl text-sm font-medium"
            onClick={() => onAddToCart(product)}
          >
            <ShoppingCart className="w-4 h-4" />
            Agregar
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 gap-1.5 border-green-500/30 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/20 rounded-xl text-sm font-medium"
            asChild
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

interface ProductsSectionProps {
  onAddToCart: (product: Product) => void;
}

export default function ProductsSection({ onAddToCart }: ProductsSectionProps) {
  const [lightboxProduct, setLightboxProduct] = useState<Product | null>(null);

  return (
    <section id="productos" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <Badge
            variant="secondary"
            className="mb-4 px-3 py-1.5 text-xs font-medium bg-primary/10 text-primary border-primary/20"
          >
            Nuestra Coleccion
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Productos <span className="gradient-text">Destacados</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Descubre nuestra coleccion de ropa femenina confeccionada con las mejores
            telas colombianas. Calidad, estilo y comodidad en cada prenda.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                onImageClick={setLightboxProduct}
              />
            </motion.div>
          ))}
        </div>

        {/* Shipping info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-primary" />
            Envios a todo Colombia
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" />
            Envios internacionales
          </div>
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-primary" />
            Precios mayorista desde 3 prendas
          </div>
        </motion.div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog
        open={!!lightboxProduct}
        onOpenChange={() => setLightboxProduct(null)}
      >
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-background/95 backdrop-blur-xl">
          <DialogTitle className="sr-only">
            {lightboxProduct?.name || "Imagen del producto"}
          </DialogTitle>
          {lightboxProduct && (
            <div className="relative aspect-[3/4] sm:aspect-[4/3]">
              <Image
                src={lightboxProduct.image}
                alt={lightboxProduct.name}
                fill
                className="object-cover"
                sizes="80vw"
                quality={100}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 sm:p-8">
                <h3 className="text-white text-2xl font-bold mb-1">
                  {lightboxProduct.name}
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  {lightboxProduct.description}
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-white text-xl font-bold">
                    {lightboxProduct.priceDetal}
                  </span>
                  <span className="text-white/70 text-sm">
                    Mayorista: {lightboxProduct.priceMayorista} (min {lightboxProduct.minMayorista})
                  </span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
