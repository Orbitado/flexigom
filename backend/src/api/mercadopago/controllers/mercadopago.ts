import { Context } from "koa";

export default {
  /**
   * Create a MercadoPago payment preference
   */
  async createPreference(ctx: Context) {
    try {
      // Validate request body
      const { items, payer, external_reference, notification_url, metadata } = (
        ctx.request as any
      ).body;

      // Basic validation
      if (!items || !Array.isArray(items) || items.length === 0) {
        ctx.status = 400;
        ctx.body = {
          error: "Bad Request",
          message: "items is required and must be a non-empty array",
        };
        return;
      }

      // Validate each item
      for (const item of items) {
        if (!item.title || typeof item.title !== "string") {
          ctx.status = 400;
          ctx.body = {
            error: "Bad Request",
            message: "Each item must have a valid title",
          };
          return;
        }

        if (
          !item.quantity ||
          typeof item.quantity !== "number" ||
          item.quantity <= 0
        ) {
          ctx.status = 400;
          ctx.body = {
            error: "Bad Request",
            message: "Each item must have a valid quantity greater than 0",
          };
          return;
        }

        if (
          item.unit_price === undefined ||
          typeof item.unit_price !== "number" ||
          item.unit_price < 0
        ) {
          ctx.status = 400;
          ctx.body = {
            error: "Bad Request",
            message: "Each item must have a valid unit_price",
          };
          return;
        }
      }

      // Call the service
      const preference = await strapi
        .service("api::mercadopago.mercadopago")
        .createPreference({
          items,
          payer,
          external_reference,
          notification_url,
          metadata,
        });

      // Return successful response
      ctx.status = 200;
      ctx.body = {
        data: preference,
      };
    } catch (err) {
      // Log the error
      strapi.log.error("Error creating MercadoPago preference:", err);

      // Return error response
      ctx.status = 500;
      ctx.body = {
        error: "Internal Server Error",
        message:
          err instanceof Error
            ? err.message
            : "Failed to create payment preference",
      };
    }
  },
};
