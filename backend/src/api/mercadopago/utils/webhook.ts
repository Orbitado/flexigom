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
  if (!secret) {
    console.warn('[MercadoPago Webhook] MERCADOPAGO_WEBHOOK_SECRET not configured');
    return false;
  }

  const ts = xSignature.match(/ts=(\d+)/)?.[1];
  const hash = xSignature.match(/v1=([a-f0-9]+)/)?.[1];

  if (!ts || !hash) {
    console.warn('[MercadoPago Webhook] Invalid signature format:', xSignature);
    return false;
  }

  const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;
  const computedHash = crypto
    .createHmac("sha256", secret)
    .update(manifest)
    .digest("hex");

  const isValid = computedHash === hash;

  if (!isValid) {
    console.warn('[MercadoPago Webhook] Signature verification details:');
    console.warn(`  - Manifest: ${manifest}`);
    console.warn(`  - Expected hash: ${hash}`);
    console.warn(`  - Computed hash: ${computedHash}`);
    console.warn(`  - Secret (first 10 chars): ${secret.substring(0, 10)}...`);
  }

  return isValid;
};

/**
 * Process payment notification and update order
 */
export const processPaymentNotification = async (
  paymentId: string,
  paymentData: any
) => {
  console.log("[MercadoPago Webhook] Processing payment notification:", {
    paymentId,
    external_reference: paymentData.external_reference,
    status: paymentData.status,
  });

  const {
    external_reference,
    status,
    transaction_amount,
    payment_method_id,
    payer,
  } = paymentData;

  if (!external_reference) {
    console.warn(
      "[MercadoPago Webhook] No external_reference found in payment data, cannot process order"
    );
    return null;
  }

  console.log(
    `[MercadoPago Webhook] Looking for existing order with external_reference: ${external_reference}`
  );

  const orders = await strapi.entityService.findMany(
    "api::order.order" as any,
    {
      filters: { external_reference },
      limit: 1,
    }
  );

  console.log(
    `[MercadoPago Webhook] Found ${
      orders && Array.isArray(orders) ? orders.length : 0
    } existing order(s)`
  );

  // Create webhook notification record
  const webhookNotification = {
    timestamp: new Date().toISOString(),
    payment_id: paymentId,
    status,
    payment_method_id,
    transaction_amount,
    customer_email: payer?.email,
  };

  const orderData = {
    payment_id: paymentId,
    payment_status: status,
    payment_method: payment_method_id,
    transaction_amount,
    customer_email: payer?.email,
    customer_name: `${payer?.first_name || ''} ${payer?.last_name || ''}`.trim() || 'CONSUMIDOR FINAL',
    customer_phone: payer?.phone?.number || payer?.phone?.area_code
      ? `${payer.phone.area_code || ''}${payer.phone.number || ''}`
      : '',
    customer_dni: payer?.identification?.number || '',
    customer_address: payer?.address?.street_name
      ? `${payer.address.street_name} ${payer.address.street_number || ''}`.trim()
      : '',
    mercadopago_data: paymentData,
  };

  let updatedOrder;

  if (orders && Array.isArray(orders) && orders.length > 0) {
    console.log(
      `[MercadoPago Webhook] Updating existing order ${orders[0].id}`
    );

    // Get existing webhook notifications and append new one
    const existingNotifications = orders[0].webhook_notifications || [];
    const updatedNotifications = Array.isArray(existingNotifications)
      ? [...existingNotifications, webhookNotification]
      : [webhookNotification];

    updatedOrder = await strapi.entityService.update(
      "api::order.order" as any,
      orders[0].id,
      {
        data: {
          ...orderData,
          webhook_notifications: updatedNotifications,
        },
      }
    );

    console.log(
      `[MercadoPago Webhook] Successfully updated order ${updatedOrder?.id} with new payment status: ${status}`
    );
  } else {
    console.log("[MercadoPago Webhook] Creating new order");

    updatedOrder = await strapi.entityService.create(
      "api::order.order" as any,
      {
        data: {
          ...orderData,
          external_reference,
          items: paymentData.additional_info?.items || [],
          webhook_notifications: [webhookNotification],
        },
      }
    );

    console.log(
      `[MercadoPago Webhook] Successfully created new order ${updatedOrder.id}`
    );
  }

  // Trigger Dux invoice creation for approved payments
  if (status === "approved" && updatedOrder) {
    console.log(
      `[MercadoPago Webhook] Payment approved, scheduling Dux invoice creation for order ${updatedOrder.id}`
    );

    // Run async to not block webhook response
    setImmediate(async () => {
      try {
        console.log(
          `[MercadoPago Webhook] Triggering Dux invoice for order ${updatedOrder.id}`
        );

        await strapi
          .service("api::dux-software.dux-software")
          .createInvoice(updatedOrder);

        console.log(
          `[MercadoPago Webhook] Dux invoice triggered for order ${updatedOrder.id}`
        );
      } catch (error) {
        console.error(
          `[MercadoPago Webhook] Failed to create Dux invoice for order ${updatedOrder.id}:`,
          error
        );
        // Don't throw - payment already succeeded
      }
    });
  } else {
    console.log(
      `[MercadoPago Webhook] Skipping Dux invoice creation (status: ${status}, hasOrder: ${!!updatedOrder})`
    );
  }

  return updatedOrder;
};
