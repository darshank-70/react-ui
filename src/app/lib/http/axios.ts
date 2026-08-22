import axios from 'axios';
import { tokenStorage } from '../../../features/auth/token-storage';
import type { InternalAxiosRequestConfig } from 'axios';
import { authService } from '../../../features/auth/services/auth.service';

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10_000,
  timeoutErrorMessage: 'Timeout error',
  withCredentials: true,
});

export const authHttpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, //for cookies to move across domains / Cross-Origin Resource Sharing.
  // withCredentials is default false,
  // no need to set it explicitly if same domain
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10_000,
  timeoutErrorMessage: 'Auth Timeout error',
});

// Adding the request Interceptor for providing Access Token. use(onFulfilled, onRejected, options)
httpClient.interceptors.request.use((config) => {
  const accessToken = tokenStorage.getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 401 Interceptor for the refreshtoken, use(onFulfilled, onRejected)
httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.info('[Error Response Interceptor]: ', error);
    const originalRequest = error.config as RetryableRequestConfig;
    if (originalRequest._retry || error.response?.status !== 401) {
      // retry is done already or status code is not 401
      return Promise.reject(error);
      // because the request is not retryable and status code is 401
    }
    originalRequest._retry = true;
    console.log('[Retrying Request]: ', originalRequest);
    // refresh token
    try {
      const response = await authService.refreshToken();
      tokenStorage.setAccessToken(response.accessToken);
      return httpClient(originalRequest);
    } catch (error) {
      return Promise.reject(error);
    }
  },
);
