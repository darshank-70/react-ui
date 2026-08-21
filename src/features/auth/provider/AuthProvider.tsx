import { useEffect, useState } from 'react';
import type { User, AuthContextValue, AuthStatus } from '../types/auth.type';
import { AuthContext } from '../context/AuthContext';
import { authService, type LoginRequest } from '../services/auth.service';
import { tokenStorage } from '../token-storage';

type AuthProviderProps = {
  children: React.ReactNode;
};
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');
  console.log(status);
  const login = async (payload: LoginRequest) => {
    const response: User = await authService.login(payload);
    setUser(response);
    setStatus('authenticated');
    tokenStorage.setAccessToken(response.accessToken);
    // if (email === 'admin@devhub.com' && password === 'password123') {
    //   const user: User = {
    //     id: '1',
    //     name: 'DevHub Admin',
    //     email,
    //   };
    //   setUser(user);
    //   setStatus('authenticated');
    //   return;
    // } else {
    //   throw new Error('Invalid credentials');
    // }
  };
  // const initializeAuth = async () => {
  //   // Temporary implementation.
  //   // Later this will validate/restore the real session.
  //   // setStatus('unauthenticated');

  //   // using auth and implementing now.
  //   try {
  //     const user = await authService.getCurrentUser();
  //     setUser(user);
  //     setStatus('authenticated');
  //   } catch (error) {
  //     console.log(error);
  //     setUser(null);
  //     setStatus('unauthenticated');
  //   }
  // };
  useEffect(() => {
    const initialize = async () => {
      try {
        const user = await authService.getCurrentUser();

        setUser(user);
        setStatus('authenticated');
      } catch {
        setUser(null);
        setStatus('unauthenticated');
      }
    };

    initialize();
  }, []);
  // const logout: Promise<void> = () => {
  //   return new Promise((resolve: () => void) => {
  //     setUser(null);
  //     setStatus('unauthenticated');
  //     resolve();
  //   });
  // };
  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error(error);
    } finally {
      tokenStorage.clearAccessToken();
      setUser(null);
      setStatus('unauthenticated');
    }
  };
  const value: AuthContextValue = {
    user,
    status,
    login,
    logout,
    // initializeAuth,
    // Because consumers shouldn't be able to randomly say: initializeAuth().
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
