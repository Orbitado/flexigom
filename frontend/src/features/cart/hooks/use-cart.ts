import { useCartStore, selectCartItemCount } from "../store/cart-store";

/**
 * Custom hook for cart operations
 * Provides easy access to cart state and actions
 */
export function useCart() {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getItemCount = useCartStore((state) => state.getItemCount);
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const getTax = useCartStore((state) => state.getTax);
  const getTotal = useCartStore((state) => state.getTotal);
  const getItem = useCartStore((state) => state.getItem);

  return {
    items,
    itemCount: getItemCount(),
    subtotal: getSubtotal(),
    tax: getTax(),
    total: getTotal(),
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItem,
    isEmpty: items.length === 0,
  };
}

/**
 * Optimized hook for cart item count (for navbar badge)
 */
export function useCartItemCount() {
  return useCartStore(selectCartItemCount);
}
