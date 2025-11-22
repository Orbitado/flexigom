/**
 * Dux Software Invoice Mapper
 * Transforms Flexigom order data to Dux invoice format
 */

import type { StrapiOrder, DuxInvoiceRequest, DuxInvoiceItem } from "../types";

/**
 * Map Flexigom order to Dux invoice request
 *
 * Note: This is a flexible mapping that will be refined once we discover
 * the exact Dux API requirements through testing.
 */
export function mapOrderToDuxInvoice(order: StrapiOrder): DuxInvoiceRequest {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  const fecha_comprobante = `${day}${month}${year}`;

  const invoiceRequest: DuxInvoiceRequest = {
    // Customer information
    apellido_razon_soc: order.customer_name || "CONSUMIDOR FINAL",
    categoria_fiscal: "CONSUMIDOR_FINAL",
    fecha_comprobante,

    id_empresa: 9325, // DISTRIBUIDORA FLEXIGOM
    id_sucursal_empresa: 1, // CASA CENTRAL
    nro_pto_vta: "1",
    id_personal: 1,
    id_deposito: 18270, // DEPOSITO

    tipo_entrega: "ENTREGA_INMEDIATA",
    tipo_comp: "COMPROBANTE_VENTA",

    // Products - using generic "ECOMMERCE" product (EC1) for all online sales
    productos: order.items.map((item) => ({
      cod_item: "EC1",
      ctd: item.quantity,
      porc_desc: "0",
      precio_uni: item.unit_price,
    })),

    email_cliente: order.customer_email,
    tipo_doc: "DNI",

    cliente: {
      nombre: order.customer_name || "CONSUMIDOR FINAL",
      email: order.customer_email,
      telefono: order.customer_phone,
    },
    items: order.items.map((item) => ({
      descripcion: item.title,
      cantidad: item.quantity,
      precioUnitario: item.unit_price,
      iva: 21,
    })),
    referencia: order.external_reference,
    montoTotal: order.transaction_amount,
    metodoPago: order.payment_method,
  };

  return invoiceRequest;
}

/**
 * Calculate total with IVA (21% tax for Argentina)
 */
export function calculateTotal(items: DuxInvoiceItem[]): number {
  return items.reduce((total, item) => {
    const subtotal = item.cantidad * item.precioUnitario;
    const iva = (item.iva || 0) / 100;
    return total + subtotal * (1 + iva);
  }, 0);
}

/**
 * Validate order has required data for invoicing
 */
export function validateOrderForInvoicing(order: StrapiOrder): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!order.customer_name || order.customer_name.trim() === "") {
    errors.push("Customer name is required");
  }

  if (!order.customer_email || order.customer_email.trim() === "") {
    errors.push("Customer email is required");
  }

  if (!order.items || order.items.length === 0) {
    errors.push("Order must have at least one item");
  }

  if (!order.transaction_amount || order.transaction_amount <= 0) {
    errors.push("Transaction amount must be greater than 0");
  }

  if (!order.external_reference || order.external_reference.trim() === "") {
    errors.push("External reference is required");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
