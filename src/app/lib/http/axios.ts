import axios from 'axios';
import { tokenStorage } from '../../../features/auth/token-storage';
export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10_000,
  timeoutErrorMessage: 'Timeout error',
});

// Adding the request Interceptor for providing Access Token.
httpClient.interceptors.request.use((config) => {
  const accessToken = tokenStorage.getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
