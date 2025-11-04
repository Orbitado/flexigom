/**
 * MercadoPago Checkout Feature
 * Centralized exports for checkout functionality
 */

// Types
export type {
  MercadoPagoPreferenceItem,
  MercadoPagoPreferencePayer,
  MercadoPagoPreferenceRequest,
  MercadoPagoPreferenceResponse,
  MercadoPagoPaymentStatus,
  MercadoPagoPaymentInfo,
  MercadoPagoErrorResponse,
} from "./types/mercadopago-types";

// Services
export {
  createPaymentPreference,
  buildPreferenceRequest,
} from "./services/mercadopago-service";

// Hooks
export { useCreatePreference } from "./hooks/use-create-preference";
export type { CreatePreferenceParams } from "./hooks/use-create-preference";

// Components
export { MercadoPagoCheckoutButton } from "./components/mercadopago-checkout-button";

// Pages (exported via lazy loading in router)
