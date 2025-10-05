import type { Product } from "@/types";
import { validateSearchInput } from "./security";

/**
 * Search and filtering utilities for products
 */

/**
 * Filter products based on a search term
 * @param products - Array of products to search through
 * @param searchTerm - The search term to filter by
 * @returns Filtered array of products
 */
export function filterProductsBySearchTerm(
  products: Product[],
  searchTerm: string,
): Product[] {
  if (!searchTerm.trim()) {
    return products;
  }

  // Validate and sanitize the search term
  const validation = validateSearchInput(searchTerm);
  if (!validation.isValid) {
    return [];
  }

  const normalizedSearchTerm = validation.sanitized.toLowerCase();

  return products.filter((product) => {
    const nameMatch = product.name.toLowerCase().includes(normalizedSearchTerm);
    const brandMatch = product.brand
      ?.toLowerCase()
      .includes(normalizedSearchTerm);
    const compositionMatch = product.composition
      ?.toLowerCase()
      .includes(normalizedSearchTerm);
    const categoryMatch = product.categories?.some((cat) =>
      cat.name.toLowerCase().includes(normalizedSearchTerm),
    );

    return nameMatch || brandMatch || compositionMatch || categoryMatch;
  });
}

/**
 * Normalize search term by removing extra spaces and converting to lowercase
 * @param searchTerm - Raw search term
 * @returns Normalized search term
 */
export function normalizeSearchTerm(searchTerm: string): string {
  return searchTerm.trim().toLowerCase().replace(/\s+/g, " ");
}

/**
 * Check if a search term is valid (non-empty after normalization and security validation)
 * @param searchTerm - Search term to validate
 * @returns Boolean indicating if the search term is valid
 */
export function isValidSearchTerm(searchTerm: string): boolean {
  const validation = validateSearchInput(searchTerm);
  return (
    validation.isValid && normalizeSearchTerm(validation.sanitized).length > 0
  );
}

/**
 * Highlight search term matches in text
 * @param text - Text to highlight
 * @param searchTerm - Term to highlight
 * @returns Text with highlighted matches wrapped in <mark> tags
 */
export function highlightSearchTerm(text: string, searchTerm: string): string {
  if (!isValidSearchTerm(searchTerm)) {
    return text;
  }

  const normalizedSearchTerm = normalizeSearchTerm(searchTerm);
  const regex = new RegExp(`(${normalizedSearchTerm})`, "gi");

  return text.replace(regex, "<mark>$1</mark>");
}

/**
 * Extract search keywords from a search term
 * @param searchTerm - Search term to extract keywords from
 * @returns Array of individual keywords
 */
export function extractSearchKeywords(searchTerm: string): string[] {
  return normalizeSearchTerm(searchTerm)
    .split(" ")
    .filter((keyword) => keyword.length > 0);
}

/**
 * Score product relevance based on search term
 * @param product - Product to score
 * @param searchTerm - Search term to score against
 * @returns Relevance score (higher is more relevant)
 */
export function scoreProductRelevance(
  product: Product,
  searchTerm: string,
): number {
  if (!isValidSearchTerm(searchTerm)) {
    return 0;
  }

  const validation = validateSearchInput(searchTerm);
  if (!validation.isValid) {
    return 0;
  }

  const normalizedSearchTerm = normalizeSearchTerm(validation.sanitized);
  const keywords = extractSearchKeywords(validation.sanitized);

  let score = 0;

  // Exact name match gets highest score
  if (product.name.toLowerCase() === normalizedSearchTerm) {
    score += 100;
  }

  // Name starts with search term
  if (product.name.toLowerCase().startsWith(normalizedSearchTerm)) {
    score += 80;
  }

  // Name contains search term
  if (product.name.toLowerCase().includes(normalizedSearchTerm)) {
    score += 60;
  }

  // Brand exact match
  if (product.brand?.toLowerCase() === normalizedSearchTerm) {
    score += 50;
  }

  // Brand contains search term
  if (product.brand?.toLowerCase().includes(normalizedSearchTerm)) {
    score += 30;
  }

  // Category exact match
  const exactCategoryMatch = product.categories?.some(
    (cat) => cat.name.toLowerCase() === normalizedSearchTerm,
  );
  if (exactCategoryMatch) {
    score += 40;
  }

  // Category contains search term
  const categoriesMatch = product.categories?.some((cat) =>
    cat.name.toLowerCase().includes(normalizedSearchTerm),
  );
  if (categoriesMatch && !exactCategoryMatch) {
    score += 20;
  }

  // Composition contains search term
  if (product.composition?.toLowerCase().includes(normalizedSearchTerm)) {
    score += 15;
  }

  // Keyword matches
  keywords.forEach((keyword) => {
    if (product.name.toLowerCase().includes(keyword)) {
      score += 10;
    }
    if (product.brand?.toLowerCase().includes(keyword)) {
      score += 5;
    }
    if (
      product.categories?.some((cat) =>
        cat.name.toLowerCase().includes(keyword),
      )
    ) {
      score += 5;
    }
  });

  return score;
}

/**
 * Sort products by relevance to search term
 * @param products - Products to sort
 * @param searchTerm - Search term to sort by
 * @returns Products sorted by relevance (most relevant first)
 */
export function sortProductsByRelevance(
  products: Product[],
  searchTerm: string,
): Product[] {
  if (!isValidSearchTerm(searchTerm)) {
    return products;
  }

  return [...products].sort((a, b) => {
    const scoreA = scoreProductRelevance(a, searchTerm);
    const scoreB = scoreProductRelevance(b, searchTerm);
    return scoreB - scoreA;
  });
}
