/**
 * MercadoPago webhook utilities
 */

import crypto from "crypto";

/**
 * Verify webhook signature from MercadoPago
 */
export const verifyWebhookSignature = (
  xSignature: string,
  xRequestId: string,
  dataId: string
): boolean => {
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
  if (!secret) return false;

  const ts = xSignature.match(/ts=(\d+)/)?.[1];
  const hash = xSignature.match(/v1=([a-f0-9]+)/)?.[1];
  if (!ts || !hash) return false;

  const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;
  const computedHash = crypto
    .createHmac("sha256", secret)
    .update(manifest)
    .digest("hex");

  return computedHash === hash;
};

/**
 * Process payment notification and update order
 */
export const processPaymentNotification = async (
  paymentId: string,
  paymentData: any
) => {
  const {
    external_reference,
    status,
    transaction_amount,
    payment_method_id,
    payer,
  } = paymentData;
  if (!external_reference) return null;

  const orders = await strapi.entityService.findMany(
    "api::order.order" as any,
    {
      filters: { external_reference },
      limit: 1,
    }
  );

  const orderData = {
    payment_id: paymentId,
    payment_status: status,
    payment_method: payment_method_id,
    transaction_amount,
    customer_email: payer?.email,
    mercadopago_data: paymentData,
  };

  if (orders && Array.isArray(orders) && orders.length > 0) {
    return strapi.entityService.update(
      "api::order.order" as any,
      orders[0].id,
      { data: orderData }
    );
  }

  return strapi.entityService.create("api::order.order" as any, {
    data: {
      ...orderData,
      external_reference,
      items: paymentData.additional_info?.items || [],
    },
  });
};
