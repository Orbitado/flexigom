/**
 * Security utilities for input sanitization and XSS protection
 */

/**
 * Characters allowed in search terms
 */
const ALLOWED_SEARCH_CHARS = /^[a-zA-Z0-9\s\-_.áéíóúüñÁÉÍÓÚÜÑ]+$/;

/**
 * Maximum allowed length for search terms
 */
const MAX_SEARCH_LENGTH = 100;

/**
 * Minimum allowed length for search terms
 */
const MIN_SEARCH_LENGTH = 1;

/**
 * Sanitize search term to prevent XSS attacks
 * @param input - Raw search term input
 * @returns Sanitized search term safe for rendering
 */
export function sanitizeSearchTerm(input: string): string {
  if (!input || typeof input !== "string") {
    return "";
  }

  // Remove any HTML tags
  let sanitized = input.replace(/<[^>]*>/g, "");

  // Remove potentially dangerous characters
  sanitized = sanitized.replace(/[<>&"'`]/g, "");

  // Normalize whitespace
  sanitized = sanitized.replace(/\s+/g, " ").trim();

  return sanitized;
}

/**
 * Validate search term input
 * @param input - Search term to validate
 * @returns Validation result with error message if invalid
 */
export function validateSearchInput(input: string): {
  isValid: boolean;
  error?: string;
  sanitized: string;
} {
  if (!input || typeof input !== "string") {
    return {
      isValid: false,
      error: "Término de búsqueda requerido",
      sanitized: "",
    };
  }

  const sanitized = sanitizeSearchTerm(input);

  // Check length constraints
  if (sanitized.length < MIN_SEARCH_LENGTH) {
    return {
      isValid: false,
      error: "Término de búsqueda demasiado corto",
      sanitized,
    };
  }

  if (sanitized.length > MAX_SEARCH_LENGTH) {
    return {
      isValid: false,
      error: "Término de búsqueda demasiado largo",
      sanitized: sanitized.substring(0, MAX_SEARCH_LENGTH),
    };
  }

  // Check allowed characters
  if (!ALLOWED_SEARCH_CHARS.test(sanitized)) {
    return {
      isValid: false,
      error: "Contiene caracteres no permitidos",
      sanitized,
    };
  }

  return {
    isValid: true,
    sanitized,
  };
}

/**
 * Sanitize URL parameter for search
 * @param param - URL parameter value
 * @returns Sanitized parameter safe for URLs
 */
export function sanitizeUrlParameter(param: string): string {
  if (!param || typeof param !== "string") {
    return "";
  }

  const validation = validateSearchInput(param);
  if (!validation.isValid) {
    return "";
  }

  // Additional URL-specific sanitization
  return encodeURIComponent(validation.sanitized);
}

/**
 * Check if a string contains potentially malicious content
 * @param input - Input to check
 * @returns True if input appears suspicious
 */
export function containsSuspiciousContent(input: string): boolean {
  if (!input || typeof input !== "string") {
    return false;
  }

  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /vbscript:/i,
    /onload=/i,
    /onerror=/i,
    /onclick=/i,
    /onmouseover=/i,
    /eval\(/i,
    /expression\(/i,
    /document\./i,
    /window\./i,
  ];

  return suspiciousPatterns.some((pattern) => pattern.test(input));
}

/**
 * Escape HTML entities in text for safe rendering
 * @param text - Text to escape
 * @returns HTML-escaped text
 */
export function escapeHtml(text: string): string {
  if (!text || typeof text !== "string") {
    return "";
  }

  const htmlEscapes: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };

  return text.replace(/[&<>"'/]/g, (match) => htmlEscapes[match] || match);
}

/**
 * Create a secure search term for display purposes
 * @param term - Raw search term
 * @returns Secure version suitable for display
 */
export function createSecureDisplayTerm(term: string): string {
  const validation = validateSearchInput(term);
  return validation.isValid ? escapeHtml(validation.sanitized) : "";
}
