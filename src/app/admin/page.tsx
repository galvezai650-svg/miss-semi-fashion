"use client";

import { useState, useEffect, useCallback } from "react";
import {
  LayoutDashboard,
  Package,
  Tag,
  ShoppingBag,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  Eye,
  EyeOff,
  ChevronDown,
  Search,
  TrendingUp,
  DollarSign,
  Layers,
  BarChart3,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ─── Types ───────────────────────────────────────────
interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  image: string;
  images: string;
  price: number;
  originalPrice: number | null;
  priceMayorista: number | null;
  category: string;
  categorySlug: string;
  subcategory: string;
  sizes: string;
  colors: string;
  fabric: string;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  isPrime: boolean;
  isBestSeller: boolean;
  isDeal: boolean;
  dealDiscount: number | null;
  tags: string;
  sortOrder: number;
  active: boolean;
  createdAt: string;
}

interface Promotion {
  id: string;
  name: string;
  description: string;
  discount: number;
  type: string;
  active: boolean;
  startsAt: string;
  endsAt: string | null;
}

interface Stats {
  totalProducts: number;
  activePromotions: number;
  productsByCategory: { category: string; count: number }[];
  totalStockValue: number;
}

const CATEGORIES = [
  "Pijamas",
  "Blusas",
  "Pantalones",
  "Ropa Deportiva",
  "Hombre",
  "Lencería",
  "Niños",
  "Adornos",
  "Hogar",
];

const CATEGORY_SLUGS: Record<string, string> = {
  Pijamas: "pijamas",
  Blusas: "blusas",
  Pantalones: "pantalones",
  "Ropa Deportiva": "deportivo",
  Hombre: "hombre",
  Lencería: "lenceria",
  "Niños": "ninos",
  Adornos: "adornos",
  Hogar: "hogar",
};

type Tab = "dashboard" | "products" | "promotions" | "orders";

// ─── Helper ──────────────────────────────────────────
function fmt(n: number) {
  return `$${Math.round(n).toLocaleString("es-CO")}`;
}

function parseJSON(str: string): string[] {
  try {
    const arr = JSON.parse(str);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return str ? str.split(",").map((s) => s.trim()).filter(Boolean) : [];
  }
}

// ─── Component ──────────────────────────────────────
export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Data states
  const [stats, setStats] = useState<Stats | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Product form
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    shortDescription: "",
    image: "",
    price: "",
    originalPrice: "",
    priceMayorista: "",
    category: "",
    subcategory: "",
    sizes: "",
    colors: "",
    fabric: "",
    stockCount: "0",
    isBestSeller: false,
    isDeal: false,
    dealDiscount: "",
    inStock: true,
    tags: "",
  });
  const [savingProduct, setSavingProduct] = useState(false);

  // Promotion form
  const [showPromoForm, setShowPromoForm] = useState(false);
  const [editingPromo, setEditingPromo] = useState<Promotion | null>(null);
  const [promoForm, setPromoForm] = useState({
    name: "",
    description: "",
    discount: "",
    type: "percentage",
    active: true,
    startsAt: "",
    endsAt: "",
  });
  const [savingPromo, setSavingPromo] = useState(false);

  // Auth
  useEffect(() => {
    const t = localStorage.getItem("admin_token");
    if (!t) {
      window.location.href = "/";
      return;
    }
    setToken(t);
  }, []);

  const authFetch = useCallback(
    async (url: string, options?: RequestInit) => {
      if (!token) return null;
      const res = await fetch(url, {
        ...options,
        headers: {
          ...options?.headers,
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (res.status === 401) {
        localStorage.removeItem("admin_token");
        window.location.href = "/";
        return null;
      }
      return res;
    },
    [token]
  );

  // Fetch data
  const fetchStats = useCallback(async () => {
    const res = await authFetch("/api/admin/stats");
    if (res?.ok) setStats(await res.json());
  }, [authFetch]);

  const fetchProducts = useCallback(async () => {
    const q = searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : "";
    const res = await authFetch(`/api/admin/products${q}`);
    if (res?.ok) {
      const data = await res.json();
      setProducts(data.products || []);
    }
  }, [authFetch, searchQuery]);

  const fetchPromotions = useCallback(async () => {
    const res = await authFetch("/api/admin/promotions");
    if (res?.ok) {
      const data = await res.json();
      setPromotions(data.promotions || data || []);
    }
  }, [authFetch]);

  useEffect(() => {
    if (!token) return;
    Promise.all([fetchStats(), fetchProducts(), fetchPromotions()]).then(() =>
      setLoading(false)
    );
  }, [token, fetchStats, fetchProducts, fetchPromotions]);

  // Product CRUD
  function openNewProduct() {
    setEditingProduct(null);
    setProductForm({
      name: "",
      description: "",
      shortDescription: "",
      image: "",
      price: "",
      originalPrice: "",
      priceMayorista: "",
      category: "",
      subcategory: "",
      sizes: "",
      colors: "",
      fabric: "",
      stockCount: "0",
      isBestSeller: false,
      isDeal: false,
      dealDiscount: "",
      inStock: true,
      tags: "",
    });
    setShowProductForm(true);
  }

  function openEditProduct(p: Product) {
    setEditingProduct(p);
    setProductForm({
      name: p.name,
      description: p.description,
      shortDescription: p.shortDescription,
      image: p.image,
      price: String(p.price),
      originalPrice: p.originalPrice ? String(p.originalPrice) : "",
      priceMayorista: p.priceMayorista ? String(p.priceMayorista) : "",
      category: p.category,
      subcategory: p.subcategory,
      sizes: parseJSON(p.sizes).join(", "),
      colors: parseJSON(p.colors).join(", "),
      fabric: p.fabric,
      stockCount: String(p.stockCount),
      isBestSeller: p.isBestSeller,
      isDeal: p.isDeal,
      dealDiscount: p.dealDiscount ? String(p.dealDiscount) : "",
      inStock: p.inStock,
      tags: parseJSON(p.tags).join(", "),
    });
    setShowProductForm(true);
  }

  async function saveProduct(e: React.FormEvent) {
    e.preventDefault();
    setSavingProduct(true);
    try {
      const body = {
        ...productForm,
        price: parseFloat(productForm.price) || 0,
        originalPrice: productForm.originalPrice
          ? parseFloat(productForm.originalPrice)
          : null,
        priceMayorista: productForm.priceMayorista
          ? parseFloat(productForm.priceMayorista)
          : null,
        stockCount: parseInt(productForm.stockCount) || 0,
        dealDiscount: productForm.dealDiscount
          ? parseInt(productForm.dealDiscount)
          : null,
        categorySlug: CATEGORY_SLUGS[productForm.category] || "",
      };

      if (editingProduct) {
        const res = await authFetch(`/api/admin/products/${editingProduct.id}`, {
          method: "PUT",
          body: JSON.stringify(body),
        });
        if (res?.ok) {
          setShowProductForm(false);
          fetchProducts();
          fetchStats();
        }
      } else {
        const res = await authFetch("/api/admin/products", {
          method: "POST",
          body: JSON.stringify(body),
        });
        if (res?.ok) {
          setShowProductForm(false);
          fetchProducts();
          fetchStats();
        }
      }
    } finally {
      setSavingProduct(false);
    }
  }

  async function deleteProduct(id: string) {
    if (!confirm("¿Eliminar este producto?")) return;
    const res = await authFetch(`/api/admin/products/${id}`, {
      method: "DELETE",
    });
    if (res?.ok) {
      fetchProducts();
      fetchStats();
    }
  }

  // Promotion CRUD
  function openNewPromo() {
    setEditingPromo(null);
    setPromoForm({
      name: "",
      description: "",
      discount: "",
      type: "percentage",
      active: true,
      startsAt: new Date().toISOString().split("T")[0],
      endsAt: "",
    });
    setShowPromoForm(true);
  }

  function openEditPromo(p: Promotion) {
    setEditingPromo(p);
    setPromoForm({
      name: p.name,
      description: p.description,
      discount: String(p.discount),
      type: p.type,
      active: p.active,
      startsAt: p.startsAt?.split("T")[0] || "",
      endsAt: p.endsAt?.split("T")[0] || "",
    });
    setShowPromoForm(true);
  }

  async function savePromo(e: React.FormEvent) {
    e.preventDefault();
    setSavingPromo(true);
    try {
      const body = {
        ...promoForm,
        discount: parseInt(promoForm.discount) || 0,
      };
      if (editingPromo) {
        const res = await authFetch(`/api/admin/promotions/${editingPromo.id}`, {
          method: "PUT",
          body: JSON.stringify(body),
        });
        if (res?.ok) {
          setShowPromoForm(false);
          fetchPromotions();
          fetchStats();
        }
      } else {
        const res = await authFetch("/api/admin/promotions", {
          method: "POST",
          body: JSON.stringify(body),
        });
        if (res?.ok) {
          setShowPromoForm(false);
          fetchPromotions();
          fetchStats();
        }
      }
    } finally {
      setSavingPromo(false);
    }
  }

  async function deletePromo(id: string) {
    if (!confirm("¿Eliminar esta promoción?")) return;
    const res = await authFetch(`/api/admin/promotions/${id}`, {
      method: "DELETE",
    });
    if (res?.ok) {
      fetchPromotions();
      fetchStats();
    }
  }

  function logout() {
    localStorage.removeItem("admin_token");
    window.location.href = "/";
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A]">
        <Loader2 className="h-8 w-8 animate-spin text-[#C6A962]" />
      </div>
    );
  }

  const navItems: { icon: typeof LayoutDashboard; label: Tab }[] = [
    { icon: LayoutDashboard, label: "dashboard" },
    { icon: Package, label: "products" },
    { icon: Tag, label: "promotions" },
    { icon: ShoppingBag, label: "orders" },
  ];

  return (
    <div className="flex min-h-screen bg-[#0A0A0A] text-[#E5E5E5]">
      {/* ── Sidebar ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-white/10 bg-black/70 backdrop-blur-xl transition-transform md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
            <div className="h-9 w-9 rounded-full bg-[#C6A962]/20 flex items-center justify-center">
              <span className="font-serif text-lg text-[#C6A962]">M</span>
            </div>
            <div>
              <p className="font-serif text-sm font-medium text-white">
                Miss Semi Fashion
              </p>
              <p className="text-[11px] text-[#888]">Panel Admin</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4">
            {navItems.map(({ icon: Icon, label }) => (
              <button
                key={label}
                onClick={() => {
                  setTab(label);
                  setSidebarOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm capitalize transition-colors mb-1 ${
                  tab === label
                    ? "bg-[#C6A962]/10 text-[#C6A962]"
                    : "text-[#888] hover:bg-white/5 hover:text-[#E5E5E5]"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label === "dashboard"
                  ? "Dashboard"
                  : label === "products"
                  ? "Productos"
                  : label === "promotions"
                  ? "Promociones"
                  : "Pedidos"}
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="border-t border-white/10 px-3 py-4">
            <button
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-400 transition-colors hover:bg-red-500/10"
            >
              <LogOut className="h-4 w-4" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Main Content ── */}
      <div className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-white/10 bg-black/60 backdrop-blur-xl px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-[#888] hover:text-white"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="font-serif text-lg text-white">
              {tab === "dashboard"
                ? "Dashboard"
                : tab === "products"
                ? "Productos"
                : tab === "promotions"
                ? "Promociones"
                : "Pedidos"}
            </h1>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-[#888] transition-colors hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </header>

        <div className="p-4 md:p-6">
          {/* ═══ DASHBOARD ═══ */}
          {tab === "dashboard" && (
            <div>
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <StatCard
                  icon={Package}
                  label="Total Productos"
                  value={String(stats?.totalProducts ?? 0)}
                  color="#C6A962"
                />
                <StatCard
                  icon={Tag}
                  label="En Promoción"
                  value={String(stats?.activePromotions ?? 0)}
                  color="#D4AF37"
                />
                <StatCard
                  icon={Layers}
                  label="Categorías"
                  value={String(stats?.productsByCategory?.length ?? 0)}
                  color="#E2D4A8"
                />
                <StatCard
                  icon={DollarSign}
                  label="Valor Inventario"
                  value={fmt(stats?.totalStockValue ?? 0)}
                  color="#C6A962"
                />
              </div>

              {/* Categories breakdown */}
              {stats?.productsByCategory && stats.productsByCategory.length > 0 && (
                <div className="mt-8 rounded-lg border border-white/10 bg-black/50 backdrop-blur-xl p-5">
                  <h3 className="mb-4 text-sm font-medium text-[#B3B3B3]">
                    Productos por Categoría
                  </h3>
                  <div className="space-y-2">
                    {stats.productsByCategory.map((cat) => (
                      <div
                        key={cat.category}
                        className="flex items-center justify-between rounded-md bg-white/[0.02] px-4 py-2.5"
                      >
                        <span className="text-sm text-[#E5E5E5]">
                          {cat.category}
                        </span>
                        <Badge className="bg-[#C6A962]/10 text-[#C6A962] border-0">
                          {cat.count}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ═══ PRODUCTS ═══ */}
          {tab === "products" && (
            <div>
              {/* Actions bar */}
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative max-w-sm flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666]" />
                  <Input
                    placeholder="Buscar productos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-10 border-[#2A2A2A] bg-[#1A1A1A] pl-10 text-sm text-[#E5E5E5] placeholder:text-[#555]"
                  />
                </div>
                <Button
                  onClick={openNewProduct}
                  className="h-10 gap-2 bg-[#C6A962] text-[#0A0A0A] hover:bg-[#D4AF37]"
                >
                  <Plus className="h-4 w-4" />
                  Agregar Producto
                </Button>
              </div>

              {/* Products table */}
              <div className="overflow-x-auto rounded-lg border border-white/10 bg-black/50 backdrop-blur-xl">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#888]">
                        Producto
                      </th>
                      <th className="hidden px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#888] md:table-cell">
                        Categoría
                      </th>
                      <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#888]">
                        Precio
                      </th>
                      <th className="hidden px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#888] sm:table-cell">
                        Stock
                      </th>
                      <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#888]">
                        Estado
                      </th>
                      <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#888]">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p, i) => (
                      <tr
                        key={p.id}
                        className={`border-b border-white/5 ${
                          i % 2 === 1 ? "bg-white/[0.02]" : ""
                        }`}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md bg-[#1A1A1A]">
                              {p.image && (
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  className="h-full w-full object-cover"
                                />
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium text-[#E5E5E5]">
                                {p.name}
                              </p>
                              <p className="truncate text-xs text-[#666]">
                                {p.subcategory}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="hidden px-4 py-3 md:table-cell">
                          <span className="text-sm text-[#B3B3B3]">
                            {p.category}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm font-medium text-[#E5E5E5]">
                            {fmt(p.price)}
                          </span>
                          {p.originalPrice && (
                            <span className="ml-1 text-xs text-[#666] line-through">
                              {fmt(p.originalPrice)}
                            </span>
                          )}
                        </td>
                        <td className="hidden px-4 py-3 sm:table-cell">
                          <span className="text-sm text-[#B3B3B3]">
                            {p.stockCount}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {p.inStock ? (
                            <Badge className="bg-green-500/10 text-green-400 border-0">
                              En Stock
                            </Badge>
                          ) : (
                            <Badge className="bg-red-500/10 text-red-400 border-0">
                              Agotado
                            </Badge>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => openEditProduct(p)}
                              className="rounded-md p-1.5 text-[#888] transition-colors hover:bg-white/5 hover:text-[#C6A962]"
                              title="Editar"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => deleteProduct(p.id)}
                              className="rounded-md p-1.5 text-[#888] transition-colors hover:bg-red-500/10 hover:text-red-400"
                              title="Eliminar"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {products.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-4 py-12 text-center text-sm text-[#666]">
                          No hay productos.
                          <button
                            onClick={openNewProduct}
                            className="ml-2 text-[#C6A962] hover:underline"
                          >
                            Agregar el primero
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ═══ PROMOTIONS ═══ */}
          {tab === "promotions" && (
            <div>
              <div className="mb-5 flex justify-end">
                <Button
                  onClick={openNewPromo}
                  className="gap-2 bg-[#C6A962] text-[#0A0A0A] hover:bg-[#D4AF37]"
                >
                  <Plus className="h-4 w-4" />
                  Agregar Promoción
                </Button>
              </div>

              <div className="space-y-3">
                {promotions.map((promo) => (
                  <div
                    key={promo.id}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-black/50 backdrop-blur-xl px-5 py-4"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#E5E5E5]">
                        {promo.name}
                      </p>
                      <p className="mt-0.5 text-xs text-[#888]">
                        {promo.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-lg font-medium text-[#C6A962]">
                          {promo.type === "percentage"
                            ? promo.discount + "%"
                            : fmt(promo.discount)}
                        </p>
                        <p className="text-xs text-[#666]">
                          {promo.active ? "Activa" : "Inactiva"}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEditPromo(promo)}
                          className="rounded-md p-1.5 text-[#888] transition-colors hover:bg-white/5 hover:text-[#C6A962]"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => deletePromo(promo.id)}
                          className="rounded-md p-1.5 text-[#888] transition-colors hover:bg-red-500/10 hover:text-red-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                {promotions.length === 0 && (
                  <div className="rounded-lg border border-white/10 bg-black/50 backdrop-blur-xl px-5 py-12 text-center text-sm text-[#666]">
                    No hay promociones activas.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ═══ ORDERS ═══ */}
          {tab === "orders" && (
            <div className="rounded-lg border border-white/10 bg-black/50 backdrop-blur-xl p-8 text-center">
              <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-[#C6A962]/40" />
              <h3 className="mb-2 font-serif text-lg text-[#E5E5E5]">
                Gestión de Pedidos
              </h3>
              <p className="text-sm text-[#888] max-w-md mx-auto">
                Los pedidos se registran desde el checkout del cliente. Los datos
                se almacenan localmente en el navegador del cliente y se
                confirman por WhatsApp.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ═══ PRODUCT FORM MODAL ═══ */}
      {showProductForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg border border-white/10 bg-[#111111] p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-serif text-xl text-white">
                {editingProduct ? "Editar Producto" : "Nuevo Producto"}
              </h2>
              <button
                onClick={() => setShowProductForm(false)}
                className="text-[#888] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={saveProduct} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Nombre *" required>
                  <Input
                    value={productForm.name}
                    onChange={(e) =>
                      setProductForm({ ...productForm, name: e.target.value })
                    }
                    className="border-[#2A2A2A] bg-[#1A1A1A] text-[#E5E5E5]"
                  />
                </FormField>
                <FormField label="Categoría *">
                  <Select
                    value={productForm.category}
                    onValueChange={(v) =>
                      setProductForm({ ...productForm, category: v })
                    }
                  >
                    <SelectTrigger className="border-[#2A2A2A] bg-[#1A1A1A] text-[#E5E5E5]">
                      <SelectValue placeholder="Seleccionar..." />
                    </SelectTrigger>
                    <SelectContent className="border-[#2A2A2A] bg-[#111111]">
                      {CATEGORIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Subcategoría">
                  <Input
                    value={productForm.subcategory}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        subcategory: e.target.value,
                      })
                    }
                    className="border-[#2A2A2A] bg-[#1A1A1A] text-[#E5E5E5]"
                  />
                </FormField>
                <FormField label="Precio * (COP)">
                  <Input
                    type="number"
                    value={productForm.price}
                    onChange={(e) =>
                      setProductForm({ ...productForm, price: e.target.value })
                    }
                    required
                    className="border-[#2A2A2A] bg-[#1A1A1A] text-[#E5E5E5]"
                  />
                </FormField>
                <FormField label="Precio Original (COP)">
                  <Input
                    type="number"
                    value={productForm.originalPrice}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        originalPrice: e.target.value,
                      })
                    }
                    className="border-[#2A2A2A] bg-[#1A1A1A] text-[#E5E5E5]"
                  />
                </FormField>
                <FormField label="Precio Mayorista (COP)">
                  <Input
                    type="number"
                    value={productForm.priceMayorista}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        priceMayorista: e.target.value,
                      })
                    }
                    className="border-[#2A2A2A] bg-[#1A1A1A] text-[#E5E5E5]"
                  />
                </FormField>
              </div>

              <FormField label="URL de Imagen *">
                <Input
                  value={productForm.image}
                  onChange={(e) =>
                    setProductForm({ ...productForm, image: e.target.value })
                  }
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className="border-[#2A2A2A] bg-[#1A1A1A] text-[#E5E5E5]"
                />
              </FormField>

              <FormField label="Descripción Corta">
                <Input
                  value={productForm.shortDescription}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      shortDescription: e.target.value,
                    })
                    }
                    className="border-[#2A2A2A] bg-[#1A1A1A] text-[#E5E5E5]"
                  />
                </FormField>

              <FormField label="Descripción">
                <Textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      description: e.target.value,
                    })
                  }
                  className="border-[#2A2A2A] bg-[#1A1A1A] text-[#E5E5E5]"
                />
              </FormField>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Tallas (separadas por coma)">
                  <Input
                    value={productForm.sizes}
                    onChange={(e) =>
                      setProductForm({ ...productForm, sizes: e.target.value })
                    }
                    placeholder="S, M, L, XL"
                    className="border-[#2A2A2A] bg-[#1A1A1A] text-[#E5E5E5]"
                  />
                </FormField>
                <FormField label="Colores (separados por coma)">
                  <Input
                    value={productForm.colors}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        colors: e.target.value,
                      })
                    }
                    placeholder="Negro, Blanco, Rosa"
                    className="border-[#2A2A2A] bg-[#1A1A1A] text-[#E5E5E5]"
                  />
                </FormField>
                <FormField label="Tela / Material">
                  <Input
                    value={productForm.fabric}
                    onChange={(e) =>
                      setProductForm({ ...productForm, fabric: e.target.value })
                    }
                    className="border-[#2A2A2A] bg-[#1A1A1A] text-[#E5E5E5]"
                  />
                </FormField>
                <FormField label="Stock">
                  <Input
                    type="number"
                    value={productForm.stockCount}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        stockCount: e.target.value,
                      })
                    }
                    className="border-[#2A2A2A] bg-[#1A1A1A] text-[#E5E5E5]"
                  />
                </FormField>
              </div>

              <FormField label="Tags (separados por coma)">
                <Input
                  value={productForm.tags}
                  onChange={(e) =>
                    setProductForm({ ...productForm, tags: e.target.value })
                  }
                  placeholder="moda, mujer, elegante"
                  className="border-[#2A2A2A] bg-[#1A1A1A] text-[#E5E5E5]"
                />
              </FormField>

              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 text-sm text-[#B3B3B3]">
                  <input
                    type="checkbox"
                    checked={productForm.inStock}
                    onChange={(e) =>
                      setProductForm({ ...productForm, inStock: e.target.checked })
                    }
                    className="accent-[#C6A962]"
                  />
                  En Stock
                </label>
                <label className="flex items-center gap-2 text-sm text-[#B3B3B3]">
                  <input
                    type="checkbox"
                    checked={productForm.isBestSeller}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        isBestSeller: e.target.checked,
                      })
                    }
                    className="accent-[#C6A962]"
                  />
                  Más Vendido
                </label>
                <label className="flex items-center gap-2 text-sm text-[#B3B3B3]">
                  <input
                    type="checkbox"
                    checked={productForm.isDeal}
                    onChange={(e) =>
                      setProductForm({ ...productForm, isDeal: e.target.checked })
                    }
                    className="accent-[#C6A962]"
                  />
                  En Oferta
                </label>
                {productForm.isDeal && (
                  <FormField label="% Descuento">
                    <Input
                      type="number"
                      value={productForm.dealDiscount}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          dealDiscount: e.target.value,
                        })
                      }
                      className="w-24 border-[#2A2A2A] bg-[#1A1A1A] text-[#E5E5E5]"
                    />
                  </FormField>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowProductForm(false)}
                  className="text-[#888] hover:text-white"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={savingProduct || !productForm.name || !productForm.price}
                  className="bg-[#C6A962] text-[#0A0A0A] hover:bg-[#D4AF37] disabled:opacity-50"
                >
                  {savingProduct ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {editingProduct ? "Guardar Cambios" : "Crear Producto"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══ PROMOTION FORM MODAL ═══ */}
      {showPromoForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-lg border border-white/10 bg-[#111111] p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-serif text-xl text-white">
                {editingPromo ? "Editar Promoción" : "Nueva Promoción"}
              </h2>
              <button
                onClick={() => setShowPromoForm(false)}
                className="text-[#888] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={savePromo} className="space-y-4">
              <FormField label="Nombre *" required>
                <Input
                  value={promoForm.name}
                  onChange={(e) =>
                    setPromoForm({ ...promoForm, name: e.target.value })
                  }
                  className="border-[#2A2A2A] bg-[#1A1A1A] text-[#E5E5E5]"
                />
              </FormField>
              <FormField label="Descripción">
                <Textarea
                  rows={2}
                  value={promoForm.description}
                  onChange={(e) =>
                    setPromoForm({
                      ...promoForm,
                      description: e.target.value,
                    })
                  }
                  className="border-[#2A2A2A] bg-[#1A1A1A] text-[#E5E5E5]"
                />
              </FormField>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Descuento * (%)">
                  <Input
                    type="number"
                    value={promoForm.discount}
                    onChange={(e) =>
                      setPromoForm({
                        ...promoForm,
                        discount: e.target.value,
                      })
                    }
                    required
                    className="border-[#2A2A2A] bg-[#1A1A1A] text-[#E5E5E5]"
                  />
                </FormField>
                <FormField label="Tipo">
                  <Select
                    value={promoForm.type}
                    onValueChange={(v) =>
                      setPromoForm({ ...promoForm, type: v })
                    }
                  >
                    <SelectTrigger className="border-[#2A2A2A] bg-[#1A1A1A] text-[#E5E5E5]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-[#2A2A2A] bg-[#111111]">
                      <SelectItem value="percentage">Porcentaje</SelectItem>
                      <SelectItem value="fixed">Valor Fijo</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Fecha Inicio">
                  <Input
                    type="date"
                    value={promoForm.startsAt}
                    onChange={(e) =>
                      setPromoForm({
                        ...promoForm,
                        startsAt: e.target.value,
                      })
                    }
                    className="border-[#2A2A2A] bg-[#1A1A1A] text-[#E5E5E5]"
                  />
                </FormField>
                <FormField label="Fecha Fin (opcional)">
                  <Input
                    type="date"
                    value={promoForm.endsAt}
                    onChange={(e) =>
                      setPromoForm({ ...promoForm, endsAt: e.target.value })
                    }
                    className="border-[#2A2A2A] bg-[#1A1A1A] text-[#E5E5E5]"
                  />
                </FormField>
              </div>

              <label className="flex items-center gap-2 text-sm text-[#B3B3B3]">
                <input
                  type="checkbox"
                  checked={promoForm.active}
                  onChange={(e) =>
                    setPromoForm({ ...promoForm, active: e.target.checked })
                  }
                  className="accent-[#C6A962]"
                />
                Promoción Activa
              </label>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowPromoForm(false)}
                  className="text-[#888] hover:text-white"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={savingPromo || !promoForm.name}
                  className="bg-[#C6A962] text-[#0A0A0A] hover:bg-[#D4AF37] disabled:opacity-50"
                >
                  {savingPromo ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {editingPromo ? "Guardar" : "Crear"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sub Components ──────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: typeof TrendingUp;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/50 backdrop-blur-xl p-5">
      <div className="mb-3 flex items-center justify-between">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={{ backgroundColor: color + "15" }}
        >
          <Icon className="h-4 w-4" style={{ color }} />
        </div>
      </div>
      <p className="text-2xl font-medium text-white">{value}</p>
      <p className="mt-1 text-xs text-[#888]">{label}</p>
    </div>
  );
}

function FormField({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs font-medium text-[#B3B3B3]">
        {label} {required && <span className="text-[#C6A962]">*</span>}
      </Label>
      {children}
    </div>
  );
}
