/**
 * Dux Software Invoice Mapper
 * Transforms Flexigom order data to Dux invoice format
 */

import type { StrapiOrder, DuxInvoiceRequest, DuxInvoiceItem, DuxCustomer } from '../types';

/**
 * Map Flexigom order to Dux invoice request
 *
 * Note: This is a flexible mapping that will be refined once we discover
 * the exact Dux API requirements through testing.
 */
export function mapOrderToDuxInvoice(order: StrapiOrder): DuxInvoiceRequest {
  const customer: DuxCustomer = {
    nombre: order.customer_name,
    email: order.customer_email,
    telefono: order.customer_phone,
  };

  const items: DuxInvoiceItem[] = order.items.map((item) => ({
    descripcion: item.title,
    cantidad: item.quantity,
    precioUnitario: item.unit_price,
    // IVA 21% for Argentina (most products)
    iva: 21,
  }));

  // Build flexible invoice request
  const invoiceRequest: DuxInvoiceRequest = {
    cliente: customer,
    items: items,
    // Add common fields that might be required
    // These will be discovered during testing
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

  if (!order.customer_name || order.customer_name.trim() === '') {
    errors.push('Customer name is required');
  }

  if (!order.customer_email || order.customer_email.trim() === '') {
    errors.push('Customer email is required');
  }

  if (!order.items || order.items.length === 0) {
    errors.push('Order must have at least one item');
  }

  if (!order.transaction_amount || order.transaction_amount <= 0) {
    errors.push('Transaction amount must be greater than 0');
  }

  if (!order.external_reference || order.external_reference.trim() === '') {
    errors.push('External reference is required');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
