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
