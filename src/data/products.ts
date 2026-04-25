export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  image: string;
  images: string[];
  price: number;
  originalPrice?: number;
  priceMayorista?: number;
  category: string;
  categorySlug: string;
  subcategory: string;
  sizes: string[];
  colors: string[];
  fabric: string;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  isPrime: boolean;
  isBestSeller: boolean;
  isDeal: boolean;
  dealDiscount?: number;
  tags: string[];
  createdAt: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Pijama Trio Dama",
    slug: "pijama-trio-dama",
    description:
      "Pijama trio para dama con diseño elegante y cómodo. Incluye camisa, pantalón y bata en tela suave que proporciona máxima comodidad para descansar. Perfecto para uso diario en el hogar, con acabados de alta calidad y costuras reforzadas para mayor durabilidad.",
    shortDescription: "Pijama trio para dama, suave y elegante para el descanso",
    image: "/images/pijama.png",
    images: ["/images/pijama.png"],
    price: 35000,
    priceMayorista: 28000,
    category: "Pijamas",
    categorySlug: "pijamas",
    subcategory: "Pijama Trio",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Rosa Pastel", "Celeste", "Lila"],
    fabric: "Algodón / Poliéster suave",
    inStock: true,
    stockCount: 45,
    rating: 4.5,
    reviewCount: 128,
    isPrime: true,
    isBestSeller: true,
    isDeal: false,
    tags: ["pijama", "trio", "dama", "descanso", "algodón"],
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    name: "Blusa Perlitas Cuello",
    slug: "blusa-perlitas-cuello",
    description:
      "Blusa elegante con detalles de perlitas en el cuello. Diseño sofisticado ideal para ocasiones especiales o uso diario con estilo. Confeccionada en tela de alta calidad con acabados impecables. Combinación perfecta con pantalones elegantes o jeans para un look versátil.",
    shortDescription: "Blusa elegante con detalles de perlitas en el cuello",
    image: "/images/blusa-perlitas.png",
    images: ["/images/blusa-perlitas.png"],
    price: 42000,
    priceMayorista: 33600,
    category: "Blusas",
    categorySlug: "blusas",
    subcategory: "Blusas Perlitas",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blanco", "Negro", "Crema", "Rosa"],
    fabric: "Poliéster con detalles artesanales",
    inStock: true,
    stockCount: 38,
    rating: 4.7,
    reviewCount: 95,
    isPrime: true,
    isBestSeller: true,
    isDeal: false,
    tags: ["blusa", "perlitas", "cuello", "elegante", "ocasión especial"],
    createdAt: "2024-02-10T10:00:00Z",
  },
  {
    id: "3",
    name: "Vestido Deportivo Licra",
    slug: "vestido-deportivo-licra",
    description:
      "Vestido deportivo confeccionado en licra de alta calidad, ideal para ejercicio y uso casual. Diseño ergonomico que se ajusta al cuerpo proporcionando libertad de movimiento. Tela transpirable con control de humedad, perfecta para actividades físicas o outings con estilo deportivo.",
    shortDescription: "Vestido deportivo en licra, cómodo y versátil",
    image: "/images/vestido-deportivo.png",
    images: ["/images/vestido-deportivo.png"],
    price: 80000,
    originalPrice: 106667,
    priceMayorista: 64000,
    category: "Ropa Deportiva",
    categorySlug: "deportivo",
    subcategory: "Vestidos Deportivos",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Azul Marino", "Vino", "Verde Oliva"],
    fabric: "Licra deportiva premium con spandex",
    inStock: true,
    stockCount: 22,
    rating: 4.8,
    reviewCount: 156,
    isPrime: true,
    isBestSeller: false,
    isDeal: true,
    dealDiscount: 25,
    tags: [
      "vestido",
      "deportivo",
      "licra",
      "ejercicio",
      "gym",
      "oferta",
    ],
    createdAt: "2024-03-05T10:00:00Z",
  },
  {
    id: "4",
    name: "Pantalon Crema Elegante",
    slug: "pantalon-crema-elegante",
    description:
      "Pantalón color crema con corte elegante y moderno. Perfecto para uso formal o casual elegante. Confeccionado en tela de alta calidad con caída impecable. Incluye bolsillos funcionales y cierre de calidad. Versátil para combinar con blusas, camisas o tops.",
    shortDescription: "Pantalón color crema, elegante y versátil",
    image: "/images/pantalones.png",
    images: ["/images/pantalones.png"],
    price: 32000,
    priceMayorista: 25600,
    category: "Pantalones",
    categorySlug: "pantalones",
    subcategory: "Pantalones Elegantes",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Crema", "Negro", "Beige", "Gris Claro"],
    fabric: "Poliéster / Algodón con elastano",
    inStock: true,
    stockCount: 52,
    rating: 4.3,
    reviewCount: 87,
    isPrime: true,
    isBestSeller: false,
    isDeal: false,
    tags: ["pantalón", "crema", "elegante", "formal", "casual"],
    createdAt: "2024-01-28T10:00:00Z",
  },
  {
    id: "5",
    name: "Conjunto Deportivo",
    slug: "conjunto-deportivo",
    description:
      "Conjunto deportivo completo con top y bottom a juego. Diseñado para máxima comodidad durante el ejercicio con tela transpirable y de secado rápido. Corte ergonomico que se adapta al cuerpo. Ideal para gym, running o actividades deportivas al aire libre.",
    shortDescription: "Conjunto deportivo completo, cómodo y funcional",
    image: "/images/conjunto-deportivo.png",
    images: ["/images/conjunto-deportivo.png"],
    price: 75000,
    priceMayorista: 60000,
    category: "Ropa Deportiva",
    categorySlug: "deportivo",
    subcategory: "Conjuntos",
    sizes: ["S", "M", "L"],
    colors: ["Negro", "Lila", "Rosa", "Azul Marino"],
    fabric: "Licra deportiva con supplex",
    inStock: true,
    stockCount: 30,
    rating: 4.6,
    reviewCount: 112,
    isPrime: true,
    isBestSeller: true,
    isDeal: false,
    tags: [
      "conjunto",
      "deportivo",
      "gym",
      "top",
      "bottom",
      "ejercicio",
    ],
    createdAt: "2024-02-20T10:00:00Z",
  },
  {
    id: "6",
    name: "Leggings Premium",
    slug: "leggings-premium",
    description:
      "Leggings premium de alta compresión con cintura alta. Diseñados para esculpir y moldear la figura. Tela de grosor premium que no se transparenta, con tecnología anti-pilling. Perfectos para ejercicio intenso o uso casual con estilo deportivo.",
    shortDescription: "Leggings premium de alta compresión y durabilidad",
    image: "/images/leggings.png",
    images: ["/images/leggings.png"],
    price: 45000,
    originalPrice: 52941,
    priceMayorista: 36000,
    category: "Ropa Deportiva",
    categorySlug: "deportivo",
    subcategory: "Leggings",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Gris", "Azul Marino", "Vino"],
    fabric: "Licra supplex premium con compresión",
    inStock: true,
    stockCount: 60,
    rating: 4.4,
    reviewCount: 203,
    isPrime: true,
    isBestSeller: false,
    isDeal: true,
    dealDiscount: 15,
    tags: [
      "leggings",
      "premium",
      "compresión",
      "cintura alta",
      "gym",
      "oferta",
    ],
    createdAt: "2024-03-15T10:00:00Z",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((product) => product.categorySlug === slug);
}

export function getRelatedProducts(
  productId: string,
  category: string
): Product[] {
  return products.filter(
    (product) => product.categorySlug === category && product.id !== productId
  );
}

export function getBestSellers(): Product[] {
  return products.filter((product) => product.isBestSeller);
}

export function getDeals(): Product[] {
  return products.filter((product) => product.isDeal);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase().trim();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.shortDescription.toLowerCase().includes(lowerQuery) ||
      product.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      product.category.toLowerCase().includes(lowerQuery) ||
      product.subcategory.toLowerCase().includes(lowerQuery) ||
      product.colors.some((color) => color.toLowerCase().includes(lowerQuery))
  );
}
