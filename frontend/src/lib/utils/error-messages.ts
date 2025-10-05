/**
 * Security-safe error message utilities with Sonner toast integration
 */

import { toast } from "sonner";

/**
 * Error types for different security scenarios
 */
export const SecurityErrorType = {
  INVALID_INPUT: "invalid_input",
  RATE_LIMITED: "rate_limited",
  SEARCH_FAILED: "search_failed",
  NETWORK_ERROR: "network_error",
  VALIDATION_ERROR: "validation_error",
  SUSPICIOUS_ACTIVITY: "suspicious_activity",
} as const;

export type SecurityErrorType =
  (typeof SecurityErrorType)[keyof typeof SecurityErrorType];

/**
 * Security-safe error messages that don't expose system details
 */
const SECURITY_ERROR_MESSAGES = {
  [SecurityErrorType.INVALID_INPUT]: {
    title: "Entrada no válida",
    message:
      "Por favor, ingresa un término de búsqueda válido usando solo letras, números y espacios.",
  },
  [SecurityErrorType.RATE_LIMITED]: {
    title: "Demasiadas solicitudes",
    message:
      "Has realizado muchas búsquedas recientemente. Espera un momento antes de intentar nuevamente.",
  },
  [SecurityErrorType.SEARCH_FAILED]: {
    title: "Error en la búsqueda",
    message:
      "No pudimos procesar tu búsqueda en este momento. Intenta nuevamente.",
  },
  [SecurityErrorType.NETWORK_ERROR]: {
    title: "Error de conexión",
    message: "Verifica tu conexión a internet e intenta nuevamente.",
  },
  [SecurityErrorType.VALIDATION_ERROR]: {
    title: "Datos incorrectos",
    message:
      "La información ingresada no es válida. Revisa e intenta nuevamente.",
  },
  [SecurityErrorType.SUSPICIOUS_ACTIVITY]: {
    title: "Actividad sospechosa detectada",
    message:
      "Por motivos de seguridad, esta acción ha sido bloqueada temporalmente.",
  },
} as const;

/**
 * Display a security error toast message
 * @param errorType - Type of security error
 * @param customMessage - Optional custom message override
 */
export function showSecurityError(
  errorType: SecurityErrorType,
  customMessage?: string,
): void {
  const errorConfig = SECURITY_ERROR_MESSAGES[errorType];

  toast.error(errorConfig.title, {
    description: customMessage || errorConfig.message,
    duration: 5000,
    action: {
      label: "Cerrar",
      onClick: () => toast.dismiss(),
    },
  });
}

/**
 * Display a rate limit error with remaining time
 * @param remainingTimeMs - Remaining time in milliseconds
 */
export function showRateLimitError(remainingTimeMs: number): void {
  const seconds = Math.ceil(remainingTimeMs / 1000);
  const timeText =
    seconds > 60
      ? `${Math.ceil(seconds / 60)} minuto(s)`
      : `${seconds} segundo(s)`;

  toast.error("Demasiadas solicitudes", {
    description: `Espera ${timeText} antes de intentar nuevamente.`,
    duration: Math.min(remainingTimeMs, 10000),
  });
}

/**
 * Display a search validation error
 * @param validationError - Specific validation error message
 */
export function showSearchValidationError(validationError: string): void {
  const errorMessages: Record<string, string> = {
    "Término de búsqueda requerido":
      "Ingresa al menos una palabra para buscar.",
    "Término de búsqueda demasiado corto":
      "El término de búsqueda debe tener al menos 1 carácter.",
    "Término de búsqueda demasiado largo":
      "El término de búsqueda es demasiado largo. Máximo 100 caracteres.",
    "Contiene caracteres no permitidos":
      "Solo se permiten letras, números, espacios y algunos signos de puntuación.",
  };

  const userMessage =
    errorMessages[validationError] || "Término de búsqueda no válido.";

  toast.error("Búsqueda no válida", {
    description: userMessage,
    duration: 4000,
  });
}

/**
 * Display a general search error without exposing system details
 * @param originalError - Original error (for logging, not display)
 */
export function showSearchError(originalError?: Error): void {
  // Log the actual error for debugging (in development)
  if (import.meta.env.DEV && originalError) {
    console.error("Search error:", originalError);
  }

  toast.error("Error en la búsqueda", {
    description:
      "No pudimos completar tu búsqueda. Verifica tu conexión e intenta nuevamente.",
    duration: 5000,
    action: {
      label: "Reintentar",
      onClick: () => {
        // This will be handled by the component
        toast.dismiss();
      },
    },
  });
}

/**
 * Display a success message for search operations
 * @param message - Success message
 */
export function showSearchSuccess(message: string): void {
  toast.success("Búsqueda completada", {
    description: message,
    duration: 3000,
  });
}

/**
 * Display an info message for search operations
 * @param title - Info title
 * @param message - Info message
 */
export function showSearchInfo(title: string, message: string): void {
  toast.info(title, {
    description: message,
    duration: 4000,
  });
}

/**
 * Sanitize error message for safe display
 * @param error - Error object or message
 * @returns Safe error message
 */
export function sanitizeErrorMessage(error: unknown): string {
  if (!error) {
    return "Ha ocurrido un error inesperado.";
  }

  if (typeof error === "string") {
    // Remove any potential HTML or script content
    return error.replace(/<[^>]*>/g, "").substring(0, 200);
  }

  if (error instanceof Error) {
    // For known error types, return generic messages
    if (error.name === "NetworkError" || error.message.includes("fetch")) {
      return "Error de conexión. Verifica tu internet.";
    }

    if (error.name === "AbortError") {
      return "Búsqueda cancelada.";
    }

    if (error.name === "TimeoutError") {
      return "La búsqueda tardó demasiado tiempo.";
    }

    // Generic error message
    return "No pudimos completar la operación.";
  }

  return "Ha ocurrido un error inesperado.";
}

/**
 * Check if an error should be shown to the user
 * @param error - Error to check
 * @returns True if error should be displayed
 */
export function shouldShowError(error: unknown): boolean {
  if (!error) return false;

  // Don't show aborted requests (user navigated away)
  if (error instanceof Error && error.name === "AbortError") {
    return false;
  }

  // Don't show errors during development hot reload
  if (import.meta.env.DEV && error instanceof Error) {
    if (error.message.includes("hot reload") || error.message.includes("HMR")) {
      return false;
    }
  }

  return true;
}

/**
 * Log security events (for monitoring and analysis)
 * @param event - Security event type
 * @param details - Event details
 */
export function logSecurityEvent(
  event: SecurityErrorType,
  details: Record<string, unknown> = {},
): void {
  // In development, log to console
  if (import.meta.env.DEV) {
    console.warn(`Security Event: ${event}`, details);
  }

  // In production, you could send to monitoring service
  // Example: analytics.track('security_event', { event, ...details });
}
