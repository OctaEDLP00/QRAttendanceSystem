// frontend/src/lib/auth.ts - Authentication utilities using Astro Actions

import { apiClient } from '~/services/api';
import type { LoginResponse } from '~/types';

const AUTH_STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  TOKEN_EXPIRY: 'tokenExpiry',
  USER: 'user',
  REMEMBER_ME: 'rememberMe',
} as const;

export class AuthManager {
  static isClient(): boolean {
    return typeof window !== 'undefined';
  }

  static setAuthData(response: LoginResponse, rememberMe: boolean = false): void {
    if (!this.isClient()) return;

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, response.tokens.accessToken);
      localStorage.setItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN, response.tokens.refreshToken);
      localStorage.setItem(
        AUTH_STORAGE_KEYS.TOKEN_EXPIRY,
        (Date.now() + response.tokens.expiresIn * 1000).toString()
      );
      localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(response.user));

      if (rememberMe) {
        localStorage.setItem(AUTH_STORAGE_KEYS.REMEMBER_ME, 'true');
      }
    }
  }

  static clearAuthData(): void {
    if (!this.isClient() || typeof localStorage === 'undefined') return;

    localStorage.removeItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(AUTH_STORAGE_KEYS.TOKEN_EXPIRY);
    localStorage.removeItem(AUTH_STORAGE_KEYS.USER);
    localStorage.removeItem(AUTH_STORAGE_KEYS.REMEMBER_ME);
  }

  static getAccessToken(): string | null {
    if (!this.isClient() || typeof localStorage === 'undefined') return null;
    return localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
  }

  static getUser() {
    if (!this.isClient() || typeof localStorage === 'undefined') return null;
    const user = localStorage.getItem(AUTH_STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  }

  static isTokenExpired(): boolean {
    if (!this.isClient() || typeof localStorage === 'undefined') return true;
    const expiry = localStorage.getItem(AUTH_STORAGE_KEYS.TOKEN_EXPIRY);
    if (!expiry) return true;
    return Date.now() > parseInt(expiry);
  }

  static async ensureValidToken(): Promise<boolean> {
    if (this.isTokenExpired()) {
      const response = await apiClient.refreshToken();
      return response.success;
    }
    return true;
  }

  static shouldRemember(): boolean {
    if (!this.isClient() || typeof localStorage === 'undefined') return false;
    return localStorage.getItem(AUTH_STORAGE_KEYS.REMEMBER_ME) === 'true';
  }
}
