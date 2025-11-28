import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  CheckoutStep,
  type CheckoutState,
  type PaymentFormData,
} from "../types";
import type { ShippingFormData } from "../types/shipping-types";
import { useCartStore } from "./cart-store";

/**
 * Checkout flow store
 * Manages multi-step checkout process
 * Does NOT persist to avoid security issues with payment data
 */
export const useCheckoutStore = create<CheckoutState>()(
  devtools(
    (set, get) => ({
      currentStep: CheckoutStep.SHIPPING,
      formData: {},
      isProcessing: false,
      orderId: null,
      error: null,

      /**
       * Set current checkout step
       */
      setCurrentStep: (step: CheckoutStep) => {
        set({ currentStep: step, error: null }, false, "setCurrentStep");
      },

      /**
       * Move to next step in checkout flow
       */
      nextStep: () => {
        const { currentStep } = get();
        const steps = [
          CheckoutStep.SHIPPING,
          CheckoutStep.PAYMENT,
          CheckoutStep.REVIEW,
          CheckoutStep.CONFIRMATION,
        ];

        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex < steps.length - 1) {
          set(
            { currentStep: steps[currentIndex + 1], error: null },
            false,
            "nextStep",
          );
        }
      },

      /**
       * Move to previous step in checkout flow
       */
      previousStep: () => {
        const { currentStep } = get();
        const steps = [
          CheckoutStep.SHIPPING,
          CheckoutStep.PAYMENT,
          CheckoutStep.REVIEW,
          CheckoutStep.CONFIRMATION,
        ];

        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex > 0) {
          set(
            { currentStep: steps[currentIndex - 1], error: null },
            false,
            "previousStep",
          );
        }
      },

      /**
       * Update shipping form data
       */
      updateShippingData: (data: ShippingFormData) => {
        set(
          (state) => ({
            formData: {
              ...state.formData,
              shipping: data,
            },
          }),
          false,
          "updateShippingData",
        );
      },

      /**
       * Update payment form data
       */
      updatePaymentData: (data: PaymentFormData) => {
        set(
          (state) => ({
            formData: {
              ...state.formData,
              payment: data,
            },
          }),
          false,
          "updatePaymentData",
        );
      },

      /**
       * Reset checkout state
       */
      resetCheckout: () => {
        set(
          {
            currentStep: CheckoutStep.SHIPPING,
            formData: {},
            isProcessing: false,
            orderId: null,
            error: null,
          },
          false,
          "resetCheckout",
        );
      },

      /**
       * Submit order
       * NOTE: For MercadoPago payments, use MercadoPagoCheckoutButton instead
       * This is for other payment methods (cash, transfer, etc.)
       */
      submitOrder: async () => {
        set({ isProcessing: true, error: null }, false, "submitOrder:start");

        try {
          const { formData } = get();

          // Validate form data
          if (!formData.shipping || !formData.payment) {
            throw new Error("Información de envío y pago requerida");
          }

          // Get cart items
          const cart = useCartStore.getState();
          const cartItems = cart.items;

          if (cartItems.length === 0) {
            throw new Error("El carrito está vacío");
          }

          // For MercadoPago, the button handles the flow
          if (formData.payment.paymentMethod === "mercadopago") {
            throw new Error("Use el botón de MercadoPago para continuar");
          }

          // TODO: Replace with actual API call for other payment methods
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 2000));

          // Generate mock order ID
          const orderId = `ORD-${Date.now()}`;

          // Clear cart after successful order
          cart.clearCart();

          set(
            {
              orderId,
              isProcessing: false,
              currentStep: CheckoutStep.CONFIRMATION,
            },
            false,
            "submitOrder:success",
          );
        } catch (error) {
          set(
            {
              error:
                error instanceof Error
                  ? error.message
                  : "Error al procesar la orden",
              isProcessing: false,
            },
            false,
            "submitOrder:error",
          );
        }
      },
    }),
    {
      name: "CheckoutStore",
    },
  ),
);

/**
 * Selectors for checkout state
 */
export const selectCurrentStep = (state: CheckoutState) => state.currentStep;
export const selectShippingData = (state: CheckoutState) =>
  state.formData.shipping;
export const selectPaymentData = (state: CheckoutState) =>
  state.formData.payment;
export const selectIsProcessing = (state: CheckoutState) => state.isProcessing;
export const selectOrderId = (state: CheckoutState) => state.orderId;
