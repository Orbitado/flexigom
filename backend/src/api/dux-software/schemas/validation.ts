/**
 * Dux Software Validation Schemas
 * Zod schemas for validating Dux API requests and responses
 */

import { z } from "zod";

/**
 * Customer schema (flexible during discovery phase)
 */
export const duxCustomerSchema = z
  .object({
    nombre: z.string().optional(),
    email: z.email("Email inválido").optional(),
    telefono: z.string().optional(),
    cuit: z.string().optional(),
    direccion: z.string().optional(),
  })
  .passthrough(); // Allow additional fields during discovery

/**
 * Invoice item schema (flexible during discovery phase)
 */
export const duxInvoiceItemSchema = z
  .object({
    descripcion: z.string().min(1, "Descripción requerida"),
    cantidad: z.number().positive("Cantidad debe ser positiva"),
    precioUnitario: z.number().nonnegative("Precio no puede ser negativo"),
    iva: z.number().optional(),
  })
  .passthrough(); // Allow additional fields during discovery

/**
 * Invoice request schema (flexible during discovery phase)
 */
export const duxInvoiceRequestSchema = z
  .object({
    cliente: duxCustomerSchema.optional(),
    items: z.array(duxInvoiceItemSchema).optional(),
    referencia: z.string().optional(),
    montoTotal: z.number().optional(),
    metodoPago: z.string().optional(),
  })
  .passthrough(); // Allow additional fields during discovery

/**
 * Invoice response schema (flexible during discovery phase)
 */
export const duxInvoiceResponseSchema = z
  .object({
    success: z.boolean().optional(),
    invoiceId: z.string().optional(),
    invoiceNumber: z.string().optional(),
    message: z.string().optional(),
    error: z.string().optional(),
    data: z.any().optional(),
  })
  .passthrough(); // Allow additional fields

/**
 * Type inference
 */
export type DuxCustomerInput = z.infer<typeof duxCustomerSchema>;
export type DuxInvoiceItemInput = z.infer<typeof duxInvoiceItemSchema>;
export type DuxInvoiceRequestInput = z.infer<typeof duxInvoiceRequestSchema>;
export type DuxInvoiceResponseOutput = z.infer<typeof duxInvoiceResponseSchema>;

/**
 * Validate invoice request data
 */
export function validateInvoiceRequest(data: unknown): DuxInvoiceRequestInput {
  try {
    return duxInvoiceRequestSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join(", ");
      throw new Error(`Validación de factura fallida: ${errorMessages}`);
    }
    throw error;
  }
}
