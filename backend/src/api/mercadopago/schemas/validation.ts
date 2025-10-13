import { z } from "zod";

// Phone schema
export const phoneSchema = z
  .object({
    area_code: z.string().optional(),
    number: z.string().optional(),
  })
  .optional();

// Identification schema
export const identificationSchema = z
  .object({
    type: z.string().optional(),
    number: z.string().optional(),
  })
  .optional();

// Address schema
export const addressSchema = z
  .object({
    zip_code: z.string().optional(),
    street_name: z.string().optional(),
    street_number: z.string().optional(),
  })
  .optional();

// Payer schema
export const payerSchema = z
  .object({
    name: z.string().optional(),
    surname: z.string().optional(),
    email: z.email("Invalid email format").optional(),
    phone: phoneSchema,
    identification: identificationSchema,
    address: addressSchema,
  })
  .optional();

// Item schema
export const itemSchema = z.object({
  title: z.string().min(1, "Item title cannot be empty"),

  quantity: z
    .number()
    .int("Quantity must be an integer")
    .positive("Quantity must be greater than 0"),

  unit_price: z.number().nonnegative("Unit price cannot be negative"),

  currency_id: z.string().default("ARS").optional(),
  description: z.string().optional(),
  picture_url: z.string().url("Invalid picture URL").optional(),
  category_id: z.string().optional(),
});

// Create preference request schema
export const createPreferenceSchema = z.object({
  items: z.array(itemSchema).nonempty("Items array cannot be empty"),

  payer: payerSchema,

  external_reference: z.string().optional(),

  notification_url: z.string().url("Invalid notification URL").optional(),

  metadata: z.record(z.string(), z.any()).optional(),
});

// Type inference from schemas
export type CreatePreferenceInput = z.infer<typeof createPreferenceSchema>;
export type PreferenceItem = z.infer<typeof itemSchema>;
export type PreferencePayer = z.infer<typeof payerSchema>;
