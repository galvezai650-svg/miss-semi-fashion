export interface Category {
  slug: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  subcategories: string[];
}

export const categories: Category[] = [
  {
    slug: "pijamas",
    name: "Pijamas",
    description:
      "Pijamas cómodos y elegantes para dama. Descansa con estilo en nuestras telas suaves de alta calidad.",
    image: "/images/cat-pijamas.png",
    productCount: 1,
    subcategories: ["Pijama Trio", "Pijama Dos Piezas", "Camisones"],
  },
  {
    slug: "blusas",
    name: "Blusas",
    description:
      "Blusas con diseños únicos y elegantes. Desde casuales hasta las más sofisticadas para cualquier ocasión.",
    image: "/images/cat-blusas.png",
    productCount: 1,
    subcategories: ["Blusas Perlitas", "Blusas Elegantes", "Blusas Casuales"],
  },
  {
    slug: "deportivo",
    name: "Ropa Deportiva",
    description:
      "Ropa deportiva de alta calidad para tu rutina de ejercicio. Telas transpirables y diseños que se adaptan a tu cuerpo.",
    image: "/images/cat-deportivo.png",
    productCount: 3,
    subcategories: [
      "Vestidos Deportivos",
      "Conjuntos",
      "Leggings",
      "Tops Deportivos",
    ],
  },
  {
    slug: "pantalones",
    name: "Pantalones",
    description:
      "Pantalones para toda ocasión. Desde elegantes hasta casuales, encuentra el estilo perfecto para ti.",
    image: "/images/cat-pantalones.png",
    productCount: 1,
    subcategories: ["Pantalones Elegantes", "Jeans", "Pantalones Casuales"],
  },
  {
    slug: "hombre",
    name: "Hombre",
    description:
      "Moda masculina con estilo y calidad. Camisas, pantalones y conjuntos para el hombre moderno.",
    image: "/images/hero-hombre.png",
    productCount: 3,
    subcategories: ["Camisas", "Pantalones Hombre", "Conjuntos Hombre"],
  },
  {
    slug: "lenceria",
    name: "Lencería",
    description:
      "Lencería elegante y sensual. Encontrá prendas íntimas de alta calidad que te harán sentir segura y hermosa.",
    image: "/images/hero-lenceria.png",
    productCount: 3,
    subcategories: ["Conjuntos Íntimos", "Bralettes", "Pijamas Sensuales"],
  },
  {
    slug: "ninos",
    name: "Niños",
    description:
      "Ropa divertida y cómoda para los más pequeños. Diseños coloridos y telas suaves para su bienestar.",
    image: "/images/hero-ninos.png",
    productCount: 3,
    subcategories: ["Ropa Niña", "Ropa Niño", "Conjuntos Infantiles"],
  },
  {
    slug: "adornos",
    name: "Adornos",
    description:
      "Accesorios y joyería para completar tu look. Bisutería, bolsos y complementos con estilo único.",
    image: "/images/hero-adornos.png",
    productCount: 3,
    subcategories: ["Bisutería", "Bolsos", "Cinturones"],
  },
  {
    slug: "hogar",
    name: "Hogar",
    description:
      "Todo para tu hogar con estilo. Cojines, decoraciones y textiles que transforman tus espacios.",
    image: "/images/hero-hogar.png",
    productCount: 3,
    subcategories: ["Cojines", "Textiles Hogar", "Decoración"],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}
