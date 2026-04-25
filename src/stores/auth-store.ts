import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  name: string;
  email: string;
  phone: string;
  document: string;
}

interface Address {
  id: string;
  name: string;
  address: string;
  city: string;
  neighborhood: string;
  phone: string;
  isDefault: boolean;
}

interface PaymentMethod {
  id: string;
  type: 'contra-entrega' | 'nequi' | 'daviplata' | 'transferencia';
  lastFour?: string;
  isDefault: boolean;
}

interface AuthStore {
  user: User | null;
  isLoggedIn: boolean;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string, phone: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  addPaymentMethod: (method: Omit<PaymentMethod, 'id'>) => void;
  removePaymentMethod: (id: string) => void;
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      addresses: [],
      paymentMethods: [],

      login: (email: string, _password: string) => {
        const name = email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
        set({
          user: {
            name,
            email,
            phone: '',
            document: '',
          },
          isLoggedIn: true,
        });
        return true;
      },

      register: (name: string, email: string, _password: string, phone: string) => {
        set({
          user: {
            name,
            email,
            phone,
            document: '',
          },
          isLoggedIn: true,
        });
        return true;
      },

      logout: () => {
        set({
          user: null,
          isLoggedIn: false,
        });
      },

      updateProfile: (data: Partial<User>) => {
        const currentUser = get().user;
        if (!currentUser) return;
        set({
          user: { ...currentUser, ...data },
        });
      },

      addAddress: (address) => {
        const id = generateId();
        const newAddress = { ...address, id };
        set((state) => {
          const addresses = address.isDefault
            ? state.addresses.map((a) => ({ ...a, isDefault: false }))
            : state.addresses;
          // If first address, set as default
          if (addresses.length === 0) {
            newAddress.isDefault = true;
          }
          return { addresses: [...addresses, newAddress] };
        });
      },

      removeAddress: (id) => {
        set((state) => {
          const removed = state.addresses.find((a) => a.id === id);
          const addresses = state.addresses.filter((a) => a.id !== id);
          // If removed was default and there are other addresses, set first as default
          if (removed?.isDefault && addresses.length > 0) {
            addresses[0] = { ...addresses[0], isDefault: true };
          }
          return { addresses };
        });
      },

      setDefaultAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.map((a) => ({
            ...a,
            isDefault: a.id === id,
          })),
        }));
      },

      addPaymentMethod: (method) => {
        const id = generateId();
        const newMethod = { ...method, id };
        set((state) => {
          const paymentMethods = method.isDefault
            ? state.paymentMethods.map((m) => ({ ...m, isDefault: false }))
            : state.paymentMethods;
          // If first payment method, set as default
          if (paymentMethods.length === 0) {
            newMethod.isDefault = true;
          }
          return { paymentMethods: [...paymentMethods, newMethod] };
        });
      },

      removePaymentMethod: (id) => {
        set((state) => {
          const removed = state.paymentMethods.find((m) => m.id === id);
          const paymentMethods = state.paymentMethods.filter((m) => m.id !== id);
          if (removed?.isDefault && paymentMethods.length > 0) {
            paymentMethods[0] = { ...paymentMethods[0], isDefault: true };
          }
          return { paymentMethods };
        });
      },
    }),
    {
      name: 'miss-semi-auth',
    }
  )
);
