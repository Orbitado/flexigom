import type { DuxConfig } from "../types";

export function getAuthHeaders(config: DuxConfig): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: config.apiToken,
  };

  if (config.environment) {
    headers["X-Environment"] = config.environment;
  }

  return headers;
}

export function validateToken(token: string | undefined): void {
  if (!token || token.trim() === "") {
    throw new Error("DUX_API_TOKEN is not configured in environment variables");
  }
}

export function loadDuxConfig(): DuxConfig {
  const apiToken = process.env.DUX_API_TOKEN;
  const baseUrl =
    process.env.DUX_API_BASE_URL ||
    "https://erp.duxsoftware.com.ar/WSERP/rest/services";
  const environment = (process.env.DUX_ENVIRONMENT || "production") as
    | "production"
    | "test";
  const retryAttempts = parseInt(process.env.DUX_RETRY_ATTEMPTS || "3", 10);
  const timeout = parseInt(process.env.DUX_TIMEOUT_MS || "30000", 10);

  validateToken(apiToken);

  return {
    baseUrl,
    apiToken: apiToken!,
    environment,
    retryAttempts,
    timeout,
  };
}
