import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'pendiente' | 'en-camino' | 'entregado' | 'cancelado';
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    phone: string;
  };
  paymentMethod: string;
}

interface OrdersStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrdersByStatus: (status?: string) => Order[];
  getOrderById: (id: string) => Order | undefined;
}

const mockOrders: Order[] = [
  {
    id: 'MSF-2026-001',
    date: '15 de abril de 2026',
    status: 'entregado',
    items: [
      {
        productId: 'prod-001',
        name: 'Pijama Trio Dama',
        image: '/images/products/pijama-trio.jpg',
        price: 89000,
        size: 'M',
        quantity: 1,
      },
      {
        productId: 'prod-002',
        name: 'Blusa Perlitas',
        image: '/images/products/blusa-perlitas.jpg',
        price: 68000,
        size: 'S',
        quantity: 1,
      },
    ],
    subtotal: 157000,
    shipping: 0,
    total: 157000,
    shippingAddress: {
      name: 'Maria Lopez',
      address: 'Cra 5 #12-34',
      city: 'Chinchina',
      phone: '310 841 6620',
    },
    paymentMethod: 'Contra entrega',
  },
  {
    id: 'MSF-2026-002',
    date: '20 de abril de 2026',
    status: 'en-camino',
    items: [
      {
        productId: 'prod-003',
        name: 'Vestido Deportivo Licra',
        image: '/images/products/vestido-deportivo.jpg',
        price: 80000,
        size: 'L',
        quantity: 1,
      },
    ],
    subtotal: 80000,
    shipping: 8000,
    total: 88000,
    shippingAddress: {
      name: 'Maria Lopez',
      address: 'Calle 45 #10-23 Apt 302',
      city: 'Bogota',
      phone: '310 841 6620',
    },
    paymentMethod: 'Nequi',
  },
];

export const useOrdersStore = create<OrdersStore>()(
  persist(
    (set, get) => ({
      orders: mockOrders,

      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders],
        }));
      },

      getOrdersByStatus: (status) => {
        if (!status) return get().orders;
        return get().orders.filter((o) => o.status === status);
      },

      getOrderById: (id) => {
        return get().orders.find((o) => o.id === id);
      },
    }),
    {
      name: 'miss-semi-orders',
    }
  )
);
