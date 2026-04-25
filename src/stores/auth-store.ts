import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ─── Types ───────────────────────────────────────────────────────────

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  document: string;
  createdAt: string;
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

// Registered user with hashed password
interface RegisteredUser extends User {
  passwordHash: string;
}

interface AuthState {
  // Current session
  currentUser: User | null;
  isLoggedIn: boolean;
  addresses: Address[];
  paymentMethods: PaymentMethod[];

  // Registered users database
  registeredUsers: RegisteredUser[];

  // Actions
  register: (name: string, email: string, phone: string, document: string, password: string) => { success: boolean; error?: string };
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  changePassword: (currentPassword: string, newPassword: string) => { success: boolean; error?: string };
  deleteAccount: () => void;

  // Addresses
  addAddress: (address: Omit<Address, 'id'>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;

  // Payment methods
  addPaymentMethod: (method: Omit<PaymentMethod, 'id'>) => void;
  removePaymentMethod: (id: string) => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────

function generateId(): string {
  return Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
}

// Simple hash function (NOT cryptographically secure, but adequate for a demo/local app)
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return 'h_' + Math.abs(hash).toString(36) + '_' + btoa(str).replace(/=/g, '').substring(0, 8);
}

// ─── Store ───────────────────────────────────────────────────────────

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      isLoggedIn: false,
      addresses: [],
      paymentMethods: [],
      registeredUsers: [],

      // ── Register ──
      register: (name, email, phone, document, password) => {
        const state = get();

        // Validate
        if (!name.trim() || name.trim().length < 2) {
          return { success: false, error: 'El nombre debe tener al menos 2 caracteres' };
        }
        if (!email.trim() || !email.includes('@') || !email.includes('.')) {
          return { success: false, error: 'Ingresa un email valido' };
        }
        // Check duplicate email (case-insensitive)
        const emailLower = email.toLowerCase().trim();
        if (state.registeredUsers.some(u => u.email.toLowerCase() === emailLower)) {
          return { success: false, error: 'Ya existe una cuenta con este email' };
        }
        if (password.length < 6) {
          return { success: false, error: 'La contrasena debe tener al menos 6 caracteres' };
        }

        const newUser: RegisteredUser = {
          id: generateId(),
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          document: document.trim(),
          passwordHash: simpleHash(password),
          createdAt: new Date().toISOString(),
        };

        const { passwordHash: _, ...userWithoutPassword } = newUser;

        set({
          registeredUsers: [...state.registeredUsers, newUser],
          currentUser: userWithoutPassword,
          isLoggedIn: true,
        });

        return { success: true };
      },

      // ── Login ──
      login: (email, password) => {
        const state = get();
        const emailLower = email.toLowerCase().trim();
        const found = state.registeredUsers.find(u => u.email.toLowerCase() === emailLower);

        if (!found) {
          return { success: false, error: 'No existe una cuenta con este email' };
        }

        if (found.passwordHash !== simpleHash(password)) {
          return { success: false, error: 'Contrasena incorrecta' };
        }

        const { passwordHash: _, ...userWithoutPassword } = found;

        set({
          currentUser: userWithoutPassword,
          isLoggedIn: true,
        });

        return { success: true };
      },

      // ── Logout ──
      logout: () => {
        set({
          currentUser: null,
          isLoggedIn: false,
        });
      },

      // ── Update Profile ──
      updateProfile: (data) => {
        const state = get();
        const current = state.currentUser;
        if (!current) return;

        const updatedUser = { ...current, ...data };

        // Also update in registeredUsers
        const updatedRegistered = state.registeredUsers.map(u =>
          u.id === current.id ? { ...u, ...data } : u
        );

        set({
          currentUser: updatedUser,
          registeredUsers: updatedRegistered,
        });
      },

      // ── Change Password ──
      changePassword: (currentPassword, newPassword) => {
        const state = get();
        const current = state.currentUser;
        if (!current) return { success: false, error: 'No hay sesion activa' };

        const registered = state.registeredUsers.find(u => u.id === current.id);
        if (!registered) return { success: false, error: 'Usuario no encontrado' };

        if (registered.passwordHash !== simpleHash(currentPassword)) {
          return { success: false, error: 'Contrasena actual incorrecta' };
        }

        if (newPassword.length < 6) {
          return { success: false, error: 'La nueva contrasena debe tener al menos 6 caracteres' };
        }

        const updatedRegistered = state.registeredUsers.map(u =>
          u.id === current.id ? { ...u, passwordHash: simpleHash(newPassword) } : u
        );

        set({
          registeredUsers: updatedRegistered,
        });

        return { success: true };
      },

      // ── Delete Account ──
      deleteAccount: () => {
        const state = get();
        const current = state.currentUser;
        if (!current) return;

        set({
          registeredUsers: state.registeredUsers.filter(u => u.id !== current.id),
          currentUser: null,
          isLoggedIn: false,
          addresses: [],
          paymentMethods: [],
        });
      },

      // ── Addresses ──
      addAddress: (address) => {
        const id = generateId();
        const newAddress = { ...address, id };
        set((state) => {
          let addresses = state.addresses;
          if (address.isDefault) {
            addresses = addresses.map((a) => ({ ...a, isDefault: false }));
          }
          if (addresses.length === 0) {
            newAddress.isDefault = true;
          }
          return { addresses: [...addresses, newAddress] };
        });
      },

      removeAddress: (id) => {
        set((state) => {
          const removed = state.addresses.find((a) => a.id === id);
          let addresses = state.addresses.filter((a) => a.id !== id);
          if (removed?.isDefault && addresses.length > 0) {
            addresses = [{ ...addresses[0], isDefault: true }, ...addresses.slice(1)];
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

      // ── Payment Methods ──
      addPaymentMethod: (method) => {
        const id = generateId();
        const newMethod = { ...method, id };
        set((state) => {
          let paymentMethods = state.paymentMethods;
          if (method.isDefault) {
            paymentMethods = paymentMethods.map((m) => ({ ...m, isDefault: false }));
          }
          if (paymentMethods.length === 0) {
            newMethod.isDefault = true;
          }
          return { paymentMethods: [...paymentMethods, newMethod] };
        });
      },

      removePaymentMethod: (id) => {
        set((state) => {
          const removed = state.paymentMethods.find((m) => m.id === id);
          let paymentMethods = state.paymentMethods.filter((m) => m.id !== id);
          if (removed?.isDefault && paymentMethods.length > 0) {
            paymentMethods = [{ ...paymentMethods[0], isDefault: true }, ...paymentMethods.slice(1)];
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
