// API configuration with environment-specific URLs
const getAPIBaseURL = () => {
  // In production, try environment variable first, then fallback to production URL
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Production fallback
  if (import.meta.env.PROD) {
    return 'https://solanouns-api.vercel.app';
  }
  
  // Development default
  return 'http://localhost:3001';
};

const API_BASE_URL = getAPIBaseURL();

export interface SolanounMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
}

export interface SolanounToken {
  tokenId: number;
  name: string;
  image: string;
  metadata: string;
}

export interface TokenListResponse {
  tokens: SolanounToken[];
  pagination: {
    limit: number;
    offset: number;
    total: number;
  };
}

export class SolanounsAPI {
  static async getMetadata(tokenId: number): Promise<SolanounMetadata> {
    const response = await fetch(`${API_BASE_URL}/metadata/${tokenId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch metadata for token ${tokenId}`);
    }
    return response.json();
  }

  static getImageUrl(tokenId: number): string {
    return `${API_BASE_URL}/image/${tokenId}`;
  }

  static async getTokens(limit = 10, offset = 0): Promise<TokenListResponse> {
    const response = await fetch(`${API_BASE_URL}/tokens?limit=${limit}&offset=${offset}`);
    if (!response.ok) {
      throw new Error('Failed to fetch tokens');
    }
    return response.json();
  }

  static async healthCheck(): Promise<{ status: string; service: string }> {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) {
      throw new Error('API health check failed');
    }
    return response.json();
  }
}