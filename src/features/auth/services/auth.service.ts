import { authHttpClient, httpClient } from '../../../app/lib/http/axios';
import type { LoginRequest, RefreshResponse, User } from '../types/auth.type';

export const authService = {
  async login(payload: LoginRequest): Promise<User> {
    const response = await httpClient.post<User>('/auth/login', payload, {
      withCredentials: true,
    });
    console.log('AUth Response', response);
    return response.data;
  },
  async logout(): Promise<void> {
    await httpClient.post('/auth/logout');
  },
  async refreshToken(): Promise<RefreshResponse> {
    const response = await authHttpClient.post('/auth/refresh', null, {
      withCredentials: true,
    });
    return response.data;
  },
  async getCurrentUser(): Promise<User> {
    const response = await httpClient.get<User>('/auth/me');
    return response.data;
  },
};
