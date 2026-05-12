import { createContext, type Dispatch } from 'react';
import type { AuthState, AuthAction } from './authReducer';

export interface AuthContextValue {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
