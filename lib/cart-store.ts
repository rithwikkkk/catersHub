"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { MenuItem } from "./data"

export interface CartItem {
  menuItem: MenuItem
  quantity: number
}

interface CartState {
  items: CartItem[]
  catererId: string | null
  addItem: (item: MenuItem) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      catererId: null,

      addItem: (menuItem: MenuItem) => {
        const { items, catererId } = get()

        // If cart has items from a different caterer, clear it first
        if (catererId && catererId !== menuItem.catererId) {
          set({ items: [{ menuItem, quantity: 1 }], catererId: menuItem.catererId })
          return
        }

        const existingItem = items.find((item) => item.menuItem.id === menuItem.id)

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.menuItem.id === menuItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          })
        } else {
          set({
            items: [...items, { menuItem, quantity: 1 }],
            catererId: menuItem.catererId,
          })
        }
      },

      removeItem: (itemId: string) => {
        const { items } = get()
        const newItems = items.filter((item) => item.menuItem.id !== itemId)
        set({
          items: newItems,
          catererId: newItems.length > 0 ? get().catererId : null,
        })
      },

      updateQuantity: (itemId: string, quantity: number) => {
        const { items } = get()
        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }
        set({
          items: items.map((item) =>
            item.menuItem.id === itemId ? { ...item, quantity } : item
          ),
        })
      },

      clearCart: () => set({ items: [], catererId: null }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.menuItem.price * item.quantity,
          0
        )
      },
    }),
    {
      name: "cart-storage",
    }
  )
)
