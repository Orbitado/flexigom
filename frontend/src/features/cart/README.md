# Shopping Cart Feature

This feature implements a complete shopping cart system with checkout flow for the Flexigom e-commerce platform.

## Features

### Cart Management
- ✅ Add/remove products from cart
- ✅ Update product quantities
- ✅ Real-time cart total calculations (subtotal, tax, total)
- ✅ Cart item count badge on navbar
- ✅ Persistent storage using localStorage
- ✅ Side drawer/sheet UI for cart

### Checkout Flow
- ✅ Multi-step checkout process:
  1. **Shipping Information**: Customer details and delivery address
  2. **Payment Method**: Payment selection (Mercado Pago, Transfer, Cash)
  3. **Order Review**: Summary of order, shipping, and payment
  4. **Confirmation**: Order success with order ID
- ✅ Form validation on each step
- ✅ Step navigation (next/previous)
- ✅ Visual stepper component
- ✅ Responsive design

### State Management
- ✅ Zustand for global state
- ✅ localStorage persistence for cart
- ✅ Separate stores for cart and checkout
- ✅ Optimized selectors for performance
- ✅ DevTools integration

## Architecture

### File Structure

```
cart/
├── components/
│   ├── cart.tsx                    # Main cart drawer
│   ├── cart-item.tsx               # Individual cart item
│   ├── cart-summary.tsx            # Price summary
│   ├── cart-empty.tsx              # Empty cart state
│   ├── mini-cart.tsx               # Navbar cart button
│   ├── checkout-stepper.tsx        # Step indicator
│   ├── shipping-form.tsx           # Shipping information form
│   ├── payment-form.tsx            # Payment method selector
│   ├── order-summary.tsx           # Order review
│   └── order-confirmation.tsx      # Success confirmation
├── hooks/
│   └── use-cart.ts                 # Cart hook
├── pages/
│   └── checkout-page.tsx           # Main checkout page
├── skeletons/
│   └── checkout-skeleton.tsx       # Loading skeleton
├── store/
│   ├── cart-store.ts               # Cart Zustand store
│   └── checkout-store.ts           # Checkout Zustand store
├── types/
│   ├── cart-types.ts               # TypeScript types
│   └── index.ts
├── index.ts                        # Barrel exports
└── README.md
```

## Usage

### Adding to Cart

```tsx
import { useCartStore } from "@/features/cart/store/cart-store";

function ProductPage() {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product, quantity);
  };
}
```

### Using Cart Hook

```tsx
import { useCart } from "@/features/cart/hooks/use-cart";

function CartPage() {
  const { items, total, addItem, removeItem, updateQuantity } = useCart();

  return (
    <div>
      <p>Total: {total}</p>
      {items.map(item => (
        <div key={item.product.documentId}>
          {item.product.name} x {item.quantity}
        </div>
      ))}
    </div>
  );
}
```

### Cart Item Count Badge

```tsx
import { MiniCart } from "@/features/cart/components/mini-cart";

function Navbar() {
  return <MiniCart />;
}
```

## Zustand Best Practices Applied

### 1. **Store Separation**
- Cart store: Handles cart items and calculations
- Checkout store: Manages checkout flow state
- Separation of concerns for better maintainability

### 2. **Middleware**
```tsx
// Persist middleware for cart
persist(
  (set, get) => ({ /* state */ }),
  { name: "flexigom-cart-storage" }
)

// DevTools for debugging
devtools(
  (set, get) => ({ /* state */ }),
  { name: "CartStore" }
)
```

### 3. **Selectors for Performance**
```tsx
// Optimized selectors prevent unnecessary re-renders
export const selectCartItemCount = (state: CartState) => state.getItemCount();
export const selectCartTotal = (state: CartState) => state.getTotal();

// Usage in components
const itemCount = useCartStore(selectCartItemCount);
```

### 4. **Immutable State Updates**
```tsx
addItem: (product, quantity) => {
  set((state) => ({
    items: [...state.items, newItem] // New array, not mutation
  }));
}
```

### 5. **Action Naming**
```tsx
set({ items: [] }, false, "clearCart"); // Named for DevTools
```

### 6. **Computed Values**
```tsx
getTotal: () => {
  const subtotal = get().getSubtotal();
  const tax = get().getTax();
  return subtotal + tax;
}
```

## Data Persistence

Cart data is persisted to localStorage using Zustand's persist middleware:

- **Key**: `flexigom-cart-storage`
- **Data**: Cart items only (not computed values)
- **Hydration**: Automatic on app load
- **Security**: Checkout data (payment info) is NOT persisted

## Form Validation

Forms include built-in validation:
- Required field validation
- Email format validation
- Phone format validation
- Real-time error display
- Clear error on user input

## Tax Calculation

- **IVA**: 21% (Argentina standard rate)
- Applied to subtotal
- Included in total automatically

## Shipping

- Free shipping on orders over ARS $50,000
- Configurable in `cart-summary.tsx`

## Error Handling

- Toast notifications for cart actions (using Sonner)
- Empty cart redirect on checkout
- Form validation errors
- Order submission error handling

## Future Enhancements

- [ ] Integrate with backend API for order submission
- [ ] Add product availability check
- [ ] Implement discount codes/coupons
- [ ] Save cart for logged-in users
- [ ] Order history tracking
- [ ] Email confirmation
- [ ] Payment gateway integration (Mercado Pago)
- [ ] Stock validation before checkout
- [ ] Cart item recommendations

## Testing

To test the shopping cart flow:

1. Start the dev server: `pnpm dev`
2. Navigate to a product page
3. Add products to cart
4. Click cart icon in navbar
5. Proceed to checkout
6. Fill shipping information
7. Select payment method
8. Review and confirm order
9. See confirmation page

## Dependencies

- `zustand` - State management
- `sonner` - Toast notifications
- `lucide-react` - Icons
- `react-router` - Navigation
- Existing UI components from shadcn/ui

## Notes

- Cart persists across page refreshes
- Checkout state resets after order confirmation
- Tax rate is hardcoded (21% IVA)
- Payment integration is simulated (TODO: integrate real payment gateway)
