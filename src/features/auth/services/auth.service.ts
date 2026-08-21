import { httpClient } from '../../../app/lib/http/axios';
import type { User } from '../types/auth.type';
export type LoginRequest = {
  username: string;
  password: string;
  expiresInMins?: number;
};

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
  async getCurrentUser(): Promise<User> {
    const response = await httpClient.get<User>('/auth/me');
    return response.data;
  },
};
