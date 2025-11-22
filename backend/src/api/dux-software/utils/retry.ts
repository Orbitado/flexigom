/**
 * Dux Software Retry Logic
 * Implements exponential backoff retry strategy for failed API calls
 */

import { isRetryableError } from './client';

/**
 * Sleep utility for delays
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Calculate delay for retry attempt with exponential backoff
 * Attempt 1: 2000ms (2s)
 * Attempt 2: 4000ms (4s)
 * Attempt 3: 8000ms (8s)
 */
export function calculateRetryDelay(attempt: number): number {
  return Math.pow(2, attempt) * 1000;
}

/**
 * Retry async function with exponential backoff
 *
 * @param fn - Async function to retry
 * @param maxAttempts - Maximum number of attempts (default: 3)
 * @param shouldRetry - Function to determine if error is retryable
 * @returns Result of successful function call
 * @throws Last error if all attempts fail
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  shouldRetry: (error: any) => boolean = isRetryableError
): Promise<T> {
  let lastError: any;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      console.log(`[Retry] Attempt ${attempt}/${maxAttempts}`);
      const result = await fn();

      if (attempt > 1) {
        console.log(`[Retry] Success on attempt ${attempt}`);
      }

      return result;
    } catch (error) {
      lastError = error;

      console.error(`[Retry] Attempt ${attempt}/${maxAttempts} failed:`, error);

      // Check if we should retry
      if (attempt < maxAttempts && shouldRetry(error)) {
        const delay = calculateRetryDelay(attempt);
        console.log(`[Retry] Waiting ${delay}ms before retry...`);
        await sleep(delay);
      } else {
        // Don't retry on last attempt or non-retryable error
        break;
      }
    }
  }

  console.error(`[Retry] All ${maxAttempts} attempts failed`);
  throw lastError;
}

/**
 * Wrap a function with retry logic
 */
export function withRetry<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  maxAttempts: number = 3
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  return async (...args: Parameters<T>) => {
    return retryWithBackoff(() => fn(...args), maxAttempts);
  };
}
