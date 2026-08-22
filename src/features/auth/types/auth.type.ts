export type LoginRequest = {
  username: string;
  password: string;
  expiresInMins?: number;
};
export type RefreshResponse = {
  accessToken: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string; // JWT accessToken (for backward compatibility) in response and cookies
  refreshToken: string; // refreshToken in response and cookies
};

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';
// because just because user is Null we cant consider user is not authenticated
export type AuthContextValue = {
  user: User | null;
  status: AuthStatus;
  // initializeAuth?: () => Promise<void>;
  login: (payload: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
};
