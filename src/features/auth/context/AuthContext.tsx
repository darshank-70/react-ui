import { createContext } from 'react';
import type { AuthContextValue } from '../types/auth.type';
export const AuthContext = createContext<AuthContextValue | null>(null);
