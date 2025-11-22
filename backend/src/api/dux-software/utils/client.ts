/**
 * Dux Software HTTP Client
 * Native fetch-based client for Dux API requests with authentication and error handling
 */

import type { DuxConfig } from '../types';
import { getAuthHeaders } from './auth';

/**
 * Parse response body - handles both JSON and plain text
 */
async function parseResponseBody(response: Response): Promise<any> {
  const contentType = response.headers.get('content-type');

  try {
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      const text = await response.text();
      // Try to parse as JSON anyway
      try {
        return JSON.parse(text);
      } catch {
        return { message: text };
      }
    }
  } catch (error) {
    return { message: 'Failed to parse response' };
  }
}

/**
 * Dux API client class using native fetch
 */
export class DuxClient {
  private config: DuxConfig;
  private headers: Record<string, string>;

  constructor(config: DuxConfig) {
    this.config = config;
    this.headers = getAuthHeaders(config);
  }

  /**
   * Make POST request to Dux API
   */
  async post(path: string, data: any): Promise<any> {
    const url = `${this.config.baseUrl}${path}`;

    console.log(`[Dux API] POST ${url}`);
    if (process.env.NODE_ENV === 'development') {
      console.log('[Dux API] Request data:', JSON.stringify(data, null, 2));
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

      const response = await fetch(url, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const responseData = await parseResponseBody(response);

      console.log(`[Dux API] Response ${response.status}:`, responseData);

      if (!response.ok) {
        const error: any = new Error(`HTTP ${response.status}: ${response.statusText}`);
        error.response = {
          status: response.status,
          statusText: response.statusText,
          data: responseData,
        };
        throw error;
      }

      return { data: responseData };
    } catch (error: any) {
      if (error.name === 'AbortError') {
        const timeoutError: any = new Error('Request timeout');
        timeoutError.code = 'ETIMEDOUT';
        throw timeoutError;
      }

      if (error.response) {
        console.error('[Dux API] Response error:', {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
        });
      } else {
        console.error('[Dux API] Request error:', error.message);
      }

      throw error;
    }
  }

  /**
   * Make GET request to Dux API
   */
  async get(path: string, params?: Record<string, any>): Promise<any> {
    let url = `${this.config.baseUrl}${path}`;

    if (params) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }

    console.log(`[Dux API] GET ${url}`);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

      const response = await fetch(url, {
        method: 'GET',
        headers: this.headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const responseData = await parseResponseBody(response);

      console.log(`[Dux API] Response ${response.status}:`, responseData);

      if (!response.ok) {
        const error: any = new Error(`HTTP ${response.status}: ${response.statusText}`);
        error.response = {
          status: response.status,
          statusText: response.statusText,
          data: responseData,
        };
        throw error;
      }

      return { data: responseData };
    } catch (error: any) {
      if (error.name === 'AbortError') {
        const timeoutError: any = new Error('Request timeout');
        timeoutError.code = 'ETIMEDOUT';
        throw timeoutError;
      }

      if (error.response) {
        console.error('[Dux API] Response error:', {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
        });
      } else {
        console.error('[Dux API] Request error:', error.message);
      }

      throw error;
    }
  }
}

/**
 * Create configured Dux client
 */
export function createDuxClient(config: DuxConfig): DuxClient {
  return new DuxClient(config);
}

/**
 * Check if error is retryable (network errors, timeouts, 5xx)
 */
export function isRetryableError(error: any): boolean {
  if (!error) return false;

  // Network errors
  if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
    return true;
  }

  // No response (network failure)
  if (!error.response) {
    return true;
  }

  // 5xx server errors
  const status = error.response?.status;
  if (status && status >= 500 && status < 600) {
    return true;
  }

  // 429 Rate Limiting
  if (status === 429) {
    return true;
  }

  return false;
}

/**
 * Extract error message from Dux API error response
 */
export function extractErrorMessage(error: any): string {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  if (error.response?.data?.error) {
    return error.response.data.error;
  }

  if (error.message) {
    return error.message;
  }

  return 'Unknown error occurred while calling Dux API';
}
