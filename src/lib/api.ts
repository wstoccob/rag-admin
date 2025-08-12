import { CONSTANTS } from './constants';
import { RagSource } from '@/types/ragSource';

// API client class for better error handling and type safety
export class ApiClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || 
        `HTTP ${response.status}: ${response.statusText}`
      );
    }

    return await response.json();
  }

  // Get all sources
  async getSources(): Promise<RagSource[]> {
    return this.request<RagSource[]>(CONSTANTS.API_ENDPOINTS.SOURCES);
  }

  // Update a source
  async updateSource(id: string, data: Partial<RagSource>): Promise<RagSource[]> {
    return this.request<RagSource[]>(
      CONSTANTS.API_ENDPOINTS.SOURCE_BY_ID(id),
      {
        method: 'PUT',
        body: JSON.stringify(data),
      }
    );
  }
}

// Export a singleton instance
export const apiClient = new ApiClient();
