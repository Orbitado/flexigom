import type { Product } from "@/types";

/**
 * Cart item with product information and quantity
 */
export interface CartItem {
  product: Product;
  quantity: number;
  addedAt: string; // ISO timestamp
}

/**
 * Cart state managed by Zustand
 */
export interface CartState {
  items: CartItem[];
  // Actions
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  // Computed getters
  getItemCount: () => number;
  getSubtotal: () => number;
  getTax: () => number;
  getTotal: () => number;
  getItem: (productId: string) => CartItem | undefined;
}

/**
 * Checkout step enumeration
 */
export enum CheckoutStep {
  SHIPPING = "shipping",
  PAYMENT = "payment",
  REVIEW = "review",
  CONFIRMATION = "confirmation",
}

/**
 * Shipping information form data
 */
export interface ShippingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  documentType: "DNI" | "CUIT";
  documentNumber: string;
  fiscalCategory: "CONSUMIDOR_FINAL" | "RESPONSABLE_INSCRIPTO" | "EXENTO" | "MONOTRIBUTISTA";
  address: string;
  city: string;
  province: string;
  postalCode: string;
  additionalInfo?: string;
}

/**
 * Payment method types
 */
export type PaymentMethodType =
  | "credit_card"
  | "debit_card"
  | "transfer"
  | "mercadopago"
  | "cash";

/**
 * Payment information form data
 */
export interface PaymentFormData {
  paymentMethod: PaymentMethodType;
  // Credit/Debit card fields (optional, only for card payments)
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  cvv?: string;
}

/**
 * Complete checkout form data
 */
export interface CheckoutFormData {
  shipping: ShippingFormData;
  payment: PaymentFormData;
}

/**
 * Checkout state managed by Zustand
 */
export interface CheckoutState {
  currentStep: CheckoutStep;
  formData: Partial<CheckoutFormData>;
  isProcessing: boolean;
  orderId: string | null;
  error: string | null;
  // Actions
  setCurrentStep: (step: CheckoutStep) => void;
  nextStep: () => void;
  previousStep: () => void;
  updateShippingData: (data: ShippingFormData) => void;
  updatePaymentData: (data: PaymentFormData) => void;
  resetCheckout: () => void;
  submitOrder: () => Promise<void>;
}

/**
 * Order summary for display
 */
export interface OrderSummary {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
}
