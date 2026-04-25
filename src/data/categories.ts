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
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}
