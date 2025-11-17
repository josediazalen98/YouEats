import { create } from 'zustand';
import { CartItem } from '@/types';

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  updateInstructions: (menuItemId: string, instructions: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (item) => set((state) => {
    const existingItem = state.items.find(
      (i) => i.menuItem.id === item.menuItem.id
    );

    if (existingItem) {
      return {
        items: state.items.map((i) =>
          i.menuItem.id === item.menuItem.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        ),
      };
    }

    return { items: [...state.items, item] };
  }),

  removeItem: (menuItemId) => set((state) => ({
    items: state.items.filter((item) => item.menuItem.id !== menuItemId),
  })),

  updateQuantity: (menuItemId, quantity) => set((state) => ({
    items: state.items.map((item) =>
      item.menuItem.id === menuItemId ? { ...item, quantity } : item
    ),
  })),

  updateInstructions: (menuItemId, instructions) => set((state) => ({
    items: state.items.map((item) =>
      item.menuItem.id === menuItemId
        ? { ...item, specialInstructions: instructions }
        : item
    ),
  })),

  clearCart: () => set({ items: [] }),

  getTotal: () => {
    const state = get();
    return state.items.reduce(
      (total, item) => total + item.menuItem.price * item.quantity,
      0
    );
  },

  getItemCount: () => {
    const state = get();
    return state.items.reduce((count, item) => count + item.quantity, 0);
  },
}));
