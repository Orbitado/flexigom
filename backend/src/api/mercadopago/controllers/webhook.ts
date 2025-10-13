/**
 * Webhook controller for MercadoPago payment notifications
 */

import { Context } from 'koa';

export default {
  async handleWebhook(ctx: Context) {
    const xSignature = ctx.request.headers['x-signature'] as string;
    const xRequestId = ctx.request.headers['x-request-id'] as string;
    const query = ctx.request.query;
    const paymentId = query.id || query['data.id'];
    const notificationType = query.topic || query.type;

    // Verify signature
    if (xSignature && xRequestId && paymentId) {
      const isValid = await strapi
        .service('api::mercadopago.mercadopago')
        .verifyWebhookSignature(xSignature, xRequestId, paymentId as string);

      if (!isValid) {
        ctx.status = 403;
        return;
      }
    }

    // Return 200 immediately
    ctx.status = 200;
    ctx.body = { success: true };

    // Process payment async
    if (notificationType === 'payment' && paymentId) {
      setImmediate(async () => {
        try {
          const paymentData = await strapi
            .service('api::mercadopago.mercadopago')
            .getPaymentDetails(paymentId as string);

          await strapi
            .service('api::mercadopago.mercadopago')
            .processPaymentNotification(paymentId as string, paymentData);
        } catch (error) {
          console.error('Webhook processing error:', error);
        }
      });
    }
  },
};
