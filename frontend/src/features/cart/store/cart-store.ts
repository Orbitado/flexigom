import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Product } from "@/types";
import type { CartState, CartItem } from "../types";

/**
 * Tax rate (21% IVA in Argentina)
 */
const TAX_RATE = 0.21;

/**
 * Cart store with localStorage persistence
 * Following Zustand best practices:
 * - Immutable state updates
 * - Persist middleware for localStorage
 * - DevTools for debugging
 * - Selector functions for optimized renders
 */
export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],

        /**
         * Add item to cart or update quantity if already exists
         */
        addItem: (product: Product, quantity = 1) => {
          set((state) => {
            const existingItem = state.items.find(
              (item) => item.product.documentId === product.documentId,
            );

            if (existingItem) {
              // Update quantity if item already in cart
              return {
                items: state.items.map((item) =>
                  item.product.documentId === product.documentId
                    ? {
                        ...item,
                        quantity: Math.min(
                          item.quantity + quantity,
                          product.stock,
                        ),
                      }
                    : item,
                ),
              };
            }

            // Add new item to cart
            return {
              items: [
                ...state.items,
                {
                  product,
                  quantity: Math.min(quantity, product.stock),
                  addedAt: new Date().toISOString(),
                },
              ],
            };
          }, false, "addItem");
        },

        /**
         * Remove item from cart
         */
        removeItem: (productId: string) => {
          set(
            (state) => ({
              items: state.items.filter(
                (item) => item.product.documentId !== productId,
              ),
            }),
            false,
            "removeItem",
          );
        },

        /**
         * Update item quantity
         */
        updateQuantity: (productId: string, quantity: number) => {
          set((state) => {
            // Remove item if quantity is 0 or less
            if (quantity <= 0) {
              return {
                items: state.items.filter(
                  (item) => item.product.documentId !== productId,
                ),
              };
            }

            return {
              items: state.items.map((item) =>
                item.product.documentId === productId
                  ? {
                      ...item,
                      quantity: Math.min(quantity, item.product.stock),
                    }
                  : item,
              ),
            };
          }, false, "updateQuantity");
        },

        /**
         * Clear all items from cart
         */
        clearCart: () => {
          set({ items: [] }, false, "clearCart");
        },

        /**
         * Get total number of items in cart
         */
        getItemCount: () => {
          return get().items.reduce((total, item) => total + item.quantity, 0);
        },

        /**
         * Get cart subtotal (before tax)
         */
        getSubtotal: () => {
          return get().items.reduce((total, item) => {
            const price =
              item.product.discount_price > 0 &&
              item.product.discount_price < item.product.price
                ? item.product.discount_price
                : item.product.price;
            return total + price * item.quantity;
          }, 0);
        },

        /**
         * Get tax amount
         */
        getTax: () => {
          const subtotal = get().getSubtotal();
          return subtotal * TAX_RATE;
        },

        /**
         * Get cart total (subtotal + tax)
         */
        getTotal: () => {
          const subtotal = get().getSubtotal();
          const tax = get().getTax();
          return subtotal + tax;
        },

        /**
         * Get specific item from cart
         */
        getItem: (productId: string) => {
          return get().items.find(
            (item) => item.product.documentId === productId,
          );
        },
      }),
      {
        name: "flexigom-cart-storage", // localStorage key
        // Optional: customize which parts of state to persist
        partialize: (state) => ({ items: state.items }),
      },
    ),
    {
      name: "CartStore", // DevTools name
    },
  ),
);

/**
 * Selectors for optimized component re-renders
 * Use these in components to subscribe only to specific state slices
 */
export const selectCartItems = (state: CartState) => state.items;
export const selectCartItemCount = (state: CartState) => state.getItemCount();
export const selectCartSubtotal = (state: CartState) => state.getSubtotal();
export const selectCartTotal = (state: CartState) => state.getTotal();
export const selectCartItem = (productId: string) => (state: CartState) =>
  state.getItem(productId);
