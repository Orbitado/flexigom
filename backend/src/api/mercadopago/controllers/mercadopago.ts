import { Context } from "koa";
import { ZodError } from "zod";
import { createPreferenceSchema } from "../schemas/validation";

export default {
  async createPreference(ctx: Context) {
    try {
      const requestBody = (ctx.request as any).body;
      const validatedData = createPreferenceSchema.parse(requestBody);

      const preference = await strapi
        .service("api::mercadopago.mercadopago")
        .createPreference(validatedData);

      ctx.status = 200;
      ctx.body = {
        data: preference,
      };
    } catch (err) {
      if (err instanceof ZodError) {
        ctx.status = 400;
        ctx.body = {
          error: "Validation Error",
          message: "Invalid request data",
          details: err.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        };
        return;
      }

      strapi.log.error("Error creating MercadoPago preference:", err);

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
