import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Gets the full URL for a Strapi media file
 * @param url - The relative URL from Strapi media
 * @returns The full URL including the base URL
 */
export function getImageUrl(url?: string): string | null {
  if (!url) return null;

  const baseUrl = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

  // If URL already includes the protocol, return as is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // Remove /api from base URL for media files and add the relative URL
  const mediaBaseUrl = baseUrl.replace("/api", "");
  return `${mediaBaseUrl}${url}`;
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const getCustomerSinceYear = (
  dateString: string | null | undefined,
): string => {
  if (!dateString) return "2024";
  try {
    const year = new Date(dateString).getFullYear();
    return isNaN(year) ? "2024" : year.toString();
  } catch {
    return "2024";
  }
};

export const handleShare = (product: { name: string }) => {
  if (navigator.share) {
    navigator.share({
      title: product.name,
      text: `Check out this ${product.name}`,
      url: window.location.href,
    });
  } else {
    navigator.clipboard.writeText(window.location.href);
  }
};

// Re-export utility modules for convenience
export * from "./utils/localStorage";
export * from "./utils/search";
export * from "./utils/recentSearches";
export * from "./utils/platform";
export * from "./utils/security";
export * from "./utils/error-messages";
