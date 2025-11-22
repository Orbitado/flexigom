/**
 * mercadopago service
 */

import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import * as webhookUtils from "../utils/webhook";

// Types for the preference creation
export interface PreferenceItem {
  title: string;
  quantity: number;
  unit_price: number;
  currency_id?: string;
  description?: string;
  picture_url?: string;
  category_id?: string;
}

export interface PreferencePayer {
  name?: string;
  surname?: string;
  email?: string;
  phone?: {
    area_code?: string;
    number?: string;
  };
  identification?: {
    type?: string;
    number?: string;
  };
  address?: {
    zip_code?: string;
    street_name?: string;
    street_number?: string;
  };
}

export interface CreatePreferenceRequest {
  items: PreferenceItem[];
  payer?: PreferencePayer;
  external_reference?: string;
  notification_url?: string;
  metadata?: Record<string, any>;
}

export interface CreatePreferenceResponse {
  id: string;
  init_point: string;
  sandbox_init_point: string;
  date_created: string;
  collector_id: number;
  external_reference?: string;
}

// Initialize MercadoPago client
const initMercadoPago = () => {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error(
      "MERCADOPAGO_ACCESS_TOKEN is not configured in environment variables"
    );
  }

  const client = new MercadoPagoConfig({
    accessToken,
    options: {
      timeout: 5000,
    },
  });

  return new Preference(client);
};

export default () => ({
  /**
   * Create a MercadoPago payment preference
   */
  async createPreference(
    data: CreatePreferenceRequest
  ): Promise<CreatePreferenceResponse> {
    try {
      const preference = initMercadoPago();

      // Get back URLs from environment or use defaults
      const successUrl =
        process.env.MERCADOPAGO_SUCCESS_URL ||
        "http://localhost:5173/checkout/success";
      const failureUrl =
        process.env.MERCADOPAGO_FAILURE_URL ||
        "http://localhost:5173/checkout/failure";
      const pendingUrl =
        process.env.MERCADOPAGO_PENDING_URL ||
        "http://localhost:5173/checkout/pending";

      // Create the preference body
      const preferenceBody: any = {
        items: data.items.map((item, index) => ({
          id: `item-${index}`,
          title: item.title,
          quantity: item.quantity,
          unit_price: item.unit_price,
          currency_id: item.currency_id || "ARS",
          description: item.description,
          picture_url: item.picture_url,
          category_id: item.category_id,
        })),
        back_urls: {
          success: successUrl,
          failure: failureUrl,
          pending: pendingUrl,
        },
        statement_descriptor: "FLEXIGOM",
      };

      // Add optional fields only if they exist
      if (data.payer) preferenceBody.payer = data.payer;
      if (data.external_reference) preferenceBody.external_reference = data.external_reference;
      if (data.notification_url) preferenceBody.notification_url = data.notification_url;
      if (data.metadata) preferenceBody.metadata = data.metadata;

      // Create preference with MercadoPago
      const response = await preference.create({ body: preferenceBody });

      // Return structured response
      return {
        id: response.id!,
        init_point: response.init_point!,
        sandbox_init_point: response.sandbox_init_point!,
        date_created: response.date_created!,
        collector_id: response.collector_id!,
        external_reference: response.external_reference,
      };
    } catch (error) {
      // Log the error for debugging
      console.error("MercadoPago createPreference error:", error);

      // Re-throw with more context
      if (error instanceof Error) {
        throw new Error(
          `Failed to create MercadoPago preference: ${error.message}`
        );
      }
      throw new Error("Failed to create MercadoPago preference: Unknown error");
    }
  },

  /**
   * Verify webhook signature from MercadoPago
   */
  verifyWebhookSignature(
    xSignature: string,
    xRequestId: string,
    dataId: string
  ): boolean {
    return webhookUtils.verifyWebhookSignature(xSignature, xRequestId, dataId);
  },

  /**
   * Get payment details from MercadoPago API with retry logic
   * MercadoPago sometimes sends webhook before payment is available in API
   */
  async getPaymentDetails(paymentId: string, retryAttempt = 0): Promise<any> {
    const maxRetries = 3;
    const retryDelays = [2000, 4000, 8000]; // 2s, 4s, 8s

    try {
      const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

      if (!accessToken) {
        throw new Error("MERCADOPAGO_ACCESS_TOKEN is not configured");
      }

      const client = new MercadoPagoConfig({
        accessToken,
        options: {
          timeout: 5000,
        },
      });

      const payment = new Payment(client);
      const response = await payment.get({ id: paymentId });

      console.log(`[MercadoPago] Successfully fetched payment ${paymentId} details`);
      return response;
    } catch (error: any) {
      // If payment not found and we haven't exceeded max retries, retry with delay
      if (error.status === 404 && retryAttempt < maxRetries) {
        const delay = retryDelays[retryAttempt];
        console.warn(
          `[MercadoPago] Payment ${paymentId} not found (attempt ${retryAttempt + 1}/${maxRetries}). Retrying in ${delay}ms...`
        );

        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, delay));

        // Retry recursively using strapi.service to avoid 'this' context issues
        return strapi
          .service('api::mercadopago.mercadopago')
          .getPaymentDetails(paymentId, retryAttempt + 1);
      }

      // If not a 404 or exceeded retries, throw the error
      console.error(`[MercadoPago] Error getting payment ${paymentId} details:`, error);
      console.error(`[MercadoPago] This might be a test payment that doesn't exist in MercadoPago's API`);
      throw error;
    }
  },

  /**
   * Process payment notification and update order
   */
  async processPaymentNotification(paymentId: string, paymentData: any) {
    return webhookUtils.processPaymentNotification(paymentId, paymentData);
  },
});
