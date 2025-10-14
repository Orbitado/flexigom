/**
 * MercadoPago service
 * Handles API calls to backend MercadoPago endpoints
 * SECURITY: Never exposes ACCESS_TOKEN (stays in backend)
 */

import api from "@/lib/api";
import type {
  MercadoPagoPreferenceRequest,
  MercadoPagoPreferenceResponse,
} from "../types/mercadopago-types";

/**
 * Create a MercadoPago payment preference
 * Sends cart data to backend which securely creates preference with MP
 */
export async function createPaymentPreference(
  data: MercadoPagoPreferenceRequest
): Promise<MercadoPagoPreferenceResponse> {
  const response = await api.post<{ data: MercadoPagoPreferenceResponse }>(
    "/mercadopago/create-preference",
    data
  );

  return response.data.data;
}

/**
 * Build preference request from cart and user data
 * Helper function to transform cart items to MercadoPago format
 */
export function buildPreferenceRequest(params: {
  items: Array<{
    title: string;
    quantity: number;
    unit_price: number;
    description?: string;
    picture_url?: string;
    category_id?: string;
  }>;
  payer?: {
    name?: string;
    surname?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    postalCode?: string;
  };
  externalReference?: string;
}): MercadoPagoPreferenceRequest {
  const { items, payer, externalReference } = params;

  const preferenceRequest: MercadoPagoPreferenceRequest = {
    items: items.map((item) => ({
      title: item.title,
      quantity: item.quantity,
      unit_price: item.unit_price,
      currency_id: "ARS",
      description: item.description,
      picture_url: item.picture_url,
      category_id: item.category_id,
    })),
    external_reference: externalReference,
  };

  // Add payer information if provided
  if (payer) {
    preferenceRequest.payer = {
      name: payer.name,
      surname: payer.surname,
      email: payer.email,
    };

    // Add phone if provided
    if (payer.phone) {
      const phoneMatch = payer.phone.match(/^(\d{2,4})?(\d+)$/);
      if (phoneMatch) {
        preferenceRequest.payer.phone = {
          area_code: phoneMatch[1] || "",
          number: phoneMatch[2] || payer.phone,
        };
      }
    }

    // Add address if provided
    if (payer.address && payer.city) {
      preferenceRequest.payer.address = {
        street_name: payer.address,
        zip_code: payer.postalCode,
      };
    }
  }

  return preferenceRequest;
}
