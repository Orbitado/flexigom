/**
 * Safe localStorage utilities with SSR support and error handling
 */

/**
 * Safely get an item from localStorage with JSON parsing
 * @param key - The localStorage key
 * @param defaultValue - Default value if key doesn't exist or parsing fails
 * @returns The parsed value or default value
 */
export function getLocalStorageItem<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") {
    return defaultValue;
  }

  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
}

/**
 * Safely set an item in localStorage with JSON stringification
 * @param key - The localStorage key
 * @param value - The value to store
 * @returns Boolean indicating success
 */
export function setLocalStorageItem<T>(key: string, value: T): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`Error writing to localStorage key "${key}":`, error);
    return false;
  }
}

/**
 * Safely remove an item from localStorage
 * @param key - The localStorage key to remove
 * @returns Boolean indicating success
 */
export function removeLocalStorageItem(key: string): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`Error removing localStorage key "${key}":`, error);
    return false;
  }
}

/**
 * Check if localStorage is available
 * @returns Boolean indicating localStorage availability
 */
export function isLocalStorageAvailable(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const testKey = "__localStorage_test__";
    localStorage.setItem(testKey, "test");
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get localStorage usage information
 * @returns Object with used and total space (in characters), or null if unavailable
 */
export function getLocalStorageUsage(): { used: number; total: number } | null {
  if (!isLocalStorageAvailable()) {
    return null;
  }

  try {
    let used = 0;
    for (const key in localStorage) {
      if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
        used += localStorage[key].length + key.length;
      }
    }

    // Most browsers have a 5-10MB limit, we'll estimate 5MB (5,242,880 chars)
    const total = 5242880;
    return { used, total };
  } catch {
    return null;
  }
}