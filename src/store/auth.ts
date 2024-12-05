import { create } from 'zustand';
import type { User } from '../types';
import { authService } from '../services/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  token: null,

  login: async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      if (!response.token || !authService.isTokenValid(response.token)) {
        throw new Error('Invalid token received from server');
      }
      
      set({ 
        user: response.user, 
        isAuthenticated: true,
        token: response.token
      });
    } catch (error) {
      console.error('Login failed:', error);
      authService.clearStorage();
      set({ user: null, isAuthenticated: false, token: null });
      throw error;
    }
  },

  register: async (email: string, password: string, name: string) => {
    try {
      const response = await authService.register(email, password, name);
      if (!response.token || !authService.isTokenValid(response.token)) {
        throw new Error('Invalid token received from server');
      }
      
      set({ 
        user: response.user, 
        isAuthenticated: true,
        token: response.token
      });
    } catch (error) {
      console.error('Registration failed:', error);
      authService.clearStorage();
      set({ user: null, isAuthenticated: false, token: null });
      throw error;
    }
  },

  logout: () => {
    authService.clearStorage();
    set({ user: null, isAuthenticated: false, token: null });
  },
}));