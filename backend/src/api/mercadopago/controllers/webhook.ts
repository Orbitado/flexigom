/**
 * Webhook controller for MercadoPago payment notifications
 */

import { Context } from 'koa';

export default {
  async handleWebhook(ctx: Context) {
    // Log incoming webhook request for debugging
    console.log('[MercadoPago Webhook] Received webhook notification');
    console.log('[MercadoPago Webhook] Headers:', {
      'x-signature': ctx.request.headers['x-signature'],
      'x-request-id': ctx.request.headers['x-request-id'],
      'content-type': ctx.request.headers['content-type'],
      'user-agent': ctx.request.headers['user-agent'],
    });
    console.log('[MercadoPago Webhook] Query params:', ctx.request.query);
    console.log('[MercadoPago Webhook] Body:', (ctx.request as any).body);

    const xSignature = ctx.request.headers['x-signature'] as string;
    const xRequestId = ctx.request.headers['x-request-id'] as string;
    const query = ctx.request.query;
    const paymentId = query.id || query['data.id'];
    const notificationType = query.topic || query.type;

    console.log('[MercadoPago Webhook] Extracted data:', {
      paymentId,
      notificationType,
      hasSignature: !!xSignature,
      hasRequestId: !!xRequestId,
    });

    // Verify signature (flexible in development)
    const isDevelopment = process.env.NODE_ENV === 'development';

    if (xSignature && xRequestId && paymentId) {
      console.log('[MercadoPago Webhook] Attempting signature verification...');

      const isValid = await strapi
        .service('api::mercadopago.mercadopago')
        .verifyWebhookSignature(xSignature, xRequestId, paymentId as string);

      if (!isValid) {
        console.warn('[MercadoPago Webhook] Signature verification FAILED');

        // In development, log warning but proceed anyway
        // In production, reject the request
        if (!isDevelopment) {
          console.error('[MercadoPago Webhook] Rejecting webhook due to invalid signature (production mode)');
          ctx.status = 403;
          ctx.body = { error: 'Invalid signature' };
          return;
        } else {
          console.warn('[MercadoPago Webhook] Proceeding despite invalid signature (development mode)');
        }
      } else {
        console.log('[MercadoPago Webhook] Signature verification PASSED');
      }
    } else {
      console.warn('[MercadoPago Webhook] Missing signature verification data:', {
        hasSignature: !!xSignature,
        hasRequestId: !!xRequestId,
        hasPaymentId: !!paymentId,
      });

      // In production, reject requests without signature
      if (!isDevelopment && !xSignature) {
        console.error('[MercadoPago Webhook] Rejecting webhook due to missing signature (production mode)');
        ctx.status = 403;
        ctx.body = { error: 'Missing signature' };
        return;
      }
    }

    // Return 200 immediately
    console.log('[MercadoPago Webhook] Sending 200 OK response');
    ctx.status = 200;
    ctx.body = { success: true };

    // Process payment async
    if (notificationType === 'payment' && paymentId) {
      console.log(`[MercadoPago Webhook] Queuing async processing for payment ${paymentId}`);

      setImmediate(async () => {
        try {
          console.log(`[MercadoPago Webhook] Starting async processing for payment ${paymentId}`);

          const paymentData = await strapi
            .service('api::mercadopago.mercadopago')
            .getPaymentDetails(paymentId as string);

          console.log(`[MercadoPago Webhook] Payment data retrieved:`, {
            id: paymentData.id,
            status: paymentData.status,
            external_reference: paymentData.external_reference,
            transaction_amount: paymentData.transaction_amount,
            payment_method_id: paymentData.payment_method_id,
          });

          await strapi
            .service('api::mercadopago.mercadopago')
            .processPaymentNotification(paymentId as string, paymentData);

          console.log(`[MercadoPago Webhook] Successfully processed payment ${paymentId}`);
        } catch (error: any) {
          console.error('[MercadoPago Webhook] Error during async processing:', error);

          // If payment not found (404), it might be a test payment that doesn't persist
          if (error?.status === 404) {
            console.warn(`[MercadoPago Webhook] Payment ${paymentId} not found in MercadoPago API.`);
            console.warn('[MercadoPago Webhook] This is common with test payments in sandbox mode.');
            console.warn('[MercadoPago Webhook] To test the full flow, use a real test card: https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/additional-content/test-cards');
          } else if (error instanceof Error) {
            console.error('[MercadoPago Webhook] Error message:', error.message);
            console.error('[MercadoPago Webhook] Error stack:', error.stack);
          }
        }
      });
    } else {
      console.log('[MercadoPago Webhook] Skipping processing:', {
        reason: !notificationType ? 'No notification type' : notificationType !== 'payment' ? 'Not a payment notification' : 'No payment ID',
        notificationType,
        paymentId,
      });
    }
  },
};
