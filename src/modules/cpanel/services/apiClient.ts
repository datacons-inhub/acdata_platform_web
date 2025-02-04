// src/services/apiClient.ts
import { ENV } from '../../../config';
import { ApiResponse } from './types/api';
import logger from '../../../services/logger';

let token: string | null = null;

export function setToken(newToken: string | null) {
  token = newToken;
}

export async function apiFetch<T = unknown>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const url = `${ENV.API_BASE_URL}${endpoint}`;
  const headers = new Headers(options.headers || {});

  if (!headers.has('Accept')) headers.set('Accept', 'application/json');
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const finalOptions = { ...options, headers };
  logger.info(`API calling: ${url}`);

  try {
    const response = await fetch(url, finalOptions);
    const text = await response.text();
    let json: unknown = {};
    if (text) {
      try {
        json = JSON.parse(text);
      } catch (parseError) {
        logger.error(`Failed to parse JSON: ${String(parseError)}`);
        throw new Error('Invalid JSON response');
      }
    }

    const apiResponse = json as ApiResponse<T>;

    if (!response.ok) {
      logger.error(`API Error: ${response.status} - ${JSON.stringify(apiResponse)}`);
      return apiResponse; // ApiErrorResponse
    }

    return apiResponse; // ApiSuccessResponse<T>

  } catch (error: any) {
    logger.error(`Fetch error: ${error.message}`);
    throw error;
  }
}
