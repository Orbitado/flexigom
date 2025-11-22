/**
 * Dux Software Error Handler
 * Centralized error handling for Dux API operations
 */

import type { DuxErrorResponse } from '../types';
import { extractErrorMessage, isRetryableError } from './client';

/**
 * Format Dux API error for logging and storage
 */
export function formatDuxError(error: any): DuxErrorResponse {
  const statusCode = error.response?.status;
  const message = extractErrorMessage(error);

  return {
    error: error.name || 'DuxAPIError',
    message,
    statusCode,
    details: error.response?.data || error.message,
  };
}

/**
 * Determine if invoice creation should be retried
 */
export function shouldRetryInvoice(error: any, currentAttempts: number, maxAttempts: number): boolean {
  if (currentAttempts >= maxAttempts) {
    return false;
  }

  return isRetryableError(error);
}

/**
 * Log Dux error with context
 */
export function logDuxError(context: string, error: any, orderId?: number): void {
  const formattedError = formatDuxError(error);

  console.error(`[Dux Error] ${context}`, {
    orderId,
    error: formattedError.error,
    message: formattedError.message,
    statusCode: formattedError.statusCode,
    details: formattedError.details,
  });
}

/**
 * Get user-friendly error message for different error types
 */
export function getUserFriendlyErrorMessage(error: any): string {
  const statusCode = error.response?.status;

  switch (statusCode) {
    case 400:
      return 'Datos inválidos para crear la factura';
    case 401:
      return 'Error de autenticación con Dux Software';
    case 403:
      return 'Acceso denegado a Dux Software';
    case 404:
      return 'Endpoint de Dux Software no encontrado';
    case 429:
      return 'Demasiadas solicitudes a Dux Software';
    case 500:
    case 502:
    case 503:
    case 504:
      return 'Error del servidor de Dux Software';
    default:
      if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
        return 'Timeout al conectar con Dux Software';
      }
      if (!error.response) {
        return 'No se pudo conectar con Dux Software';
      }
      return 'Error al crear factura en Dux Software';
  }
}

/**
 * Create error summary for order update
 */
export function createErrorSummary(error: any, attempt: number, maxAttempts: number): string {
  const userMessage = getUserFriendlyErrorMessage(error);
  const technicalMessage = extractErrorMessage(error);

  return `${userMessage} (Intento ${attempt}/${maxAttempts})\nDetalle: ${technicalMessage}`;
}
