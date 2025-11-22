import { isRetryableError } from "./client";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function calculateRetryDelay(attempt: number): number {
  return 5000;
}

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

      if (attempt < maxAttempts && shouldRetry(error)) {
        const delay = calculateRetryDelay(attempt);
        console.log(`[Retry] Waiting ${delay}ms before retry...`);
        await sleep(delay);
      } else {
        break;
      }
    }
  }

  console.error(`[Retry] All ${maxAttempts} attempts failed`);
  throw lastError;
}

export function withRetry<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  maxAttempts: number = 3
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  return async (...args: Parameters<T>) => {
    return retryWithBackoff(() => fn(...args), maxAttempts);
  };
}
