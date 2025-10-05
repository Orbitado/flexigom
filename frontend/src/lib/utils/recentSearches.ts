import {
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem,
} from "./localStorage";

const RECENT_SEARCHES_KEY = "flexigom-recent-searches";
const DEFAULT_MAX_RECENT_SEARCHES = 5;

export interface RecentSearchesOptions {
  maxItems?: number;
  storageKey?: string;
}

/**
 * Get recent searches from localStorage
 * @param options - Configuration options
 * @returns Array of recent search terms
 */
export function getRecentSearches(
  options: RecentSearchesOptions = {},
): string[] {
  const { storageKey = RECENT_SEARCHES_KEY } = options;
  return getLocalStorageItem<string[]>(storageKey, []);
}

/**
 * Add a search term to recent searches
 * @param searchTerm - Search term to add
 * @param options - Configuration options
 * @returns Updated array of recent searches
 */
export function addRecentSearch(
  searchTerm: string,
  options: RecentSearchesOptions = {},
): string[] {
  const {
    maxItems = DEFAULT_MAX_RECENT_SEARCHES,
    storageKey = RECENT_SEARCHES_KEY,
  } = options;

  const trimmedSearchTerm = searchTerm.trim();
  if (!trimmedSearchTerm) {
    return getRecentSearches(options);
  }

  const currentSearches = getRecentSearches(options);

  const filteredSearches = currentSearches.filter(
    (item) => item !== trimmedSearchTerm,
  );

  const updatedSearches = [trimmedSearchTerm, ...filteredSearches].slice(
    0,
    maxItems,
  );

  setLocalStorageItem(storageKey, updatedSearches);

  return updatedSearches;
}

/**
 * Remove a specific search term from recent searches
 * @param searchTerm - Search term to remove
 * @param options - Configuration options
 * @returns Updated array of recent searches
 */
export function removeRecentSearch(
  searchTerm: string,
  options: RecentSearchesOptions = {},
): string[] {
  const { storageKey = RECENT_SEARCHES_KEY } = options;

  const currentSearches = getRecentSearches(options);
  const updatedSearches = currentSearches.filter(
    (item) => item !== searchTerm.trim(),
  );

  setLocalStorageItem(storageKey, updatedSearches);

  return updatedSearches;
}

/**
 * Clear all recent searches
 * @param options - Configuration options
 * @returns Empty array
 */
export function clearRecentSearches(
  options: RecentSearchesOptions = {},
): string[] {
  const { storageKey = RECENT_SEARCHES_KEY } = options;

  removeLocalStorageItem(storageKey);

  return [];
}

/**
 * Check if a search term exists in recent searches
 * @param searchTerm - Search term to check
 * @param options - Configuration options
 * @returns Boolean indicating if the search term exists
 */
export function hasRecentSearch(
  searchTerm: string,
  options: RecentSearchesOptions = {},
): boolean {
  const recentSearches = getRecentSearches(options);
  return recentSearches.includes(searchTerm.trim());
}

/**
 * Get the most recent search term
 * @param options - Configuration options
 * @returns The most recent search term or undefined if none exist
 */
export function getMostRecentSearch(
  options: RecentSearchesOptions = {},
): string | undefined {
  const recentSearches = getRecentSearches(options);
  return recentSearches[0];
}

/**
 * Get recent searches matching a partial search term
 * @param partialTerm - Partial search term to match
 * @param options - Configuration options
 * @returns Array of matching recent searches
 */
export function getMatchingRecentSearches(
  partialTerm: string,
  options: RecentSearchesOptions = {},
): string[] {
  const recentSearches = getRecentSearches(options);
  const normalizedPartial = partialTerm.toLowerCase().trim();

  if (!normalizedPartial) {
    return recentSearches;
  }

  return recentSearches.filter((search) =>
    search.toLowerCase().includes(normalizedPartial),
  );
}
