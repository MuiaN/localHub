import type { User } from '../types';
import { jwtDecode } from 'jwt-decode';

const API_URL = '/api';

interface AuthResponse {
  token: string;
  user: User;
}

interface DecodedToken {
  exp: number;
  iat: number;
  id: string;
}

export const authService = {
  clearStorage() {
    localStorage.clear();
    sessionStorage.clear();
  },

  isTokenValid(token: string | null): boolean {
    if (!token) return false;
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const currentTime = Date.now() / 1000;
      console.log('Token validation:', {
        exp: decoded.exp,
        currentTime,
        isValid: decoded.exp > currentTime
      });
      return decoded.exp > currentTime;
    } catch (error) {
      console.error('Token validation failed:', error);
      return false;
    }
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    this.clearStorage();

    console.log('Logging in:', email);
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Login failed:', error);
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();
    console.log('Login successful:', data);
    return data;
  },

  async register(email: string, password: string, name: string): Promise<AuthResponse> {
    this.clearStorage();

    console.log('Registering:', email);
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Registration failed:', error);
      throw new Error(error.message || 'Registration failed');
    }

    const data = await response.json();
    console.log('Registration successful:', data);
    return data;
  },

  async getProfile(token: string): Promise<User> {
    if (!token) {
      console.error('No authentication token');
      throw new Error('No authentication token');
    }

    if (!this.isTokenValid(token)) {
      console.error('Token is invalid or expired');
      this.clearStorage();
      throw new Error('Token is invalid or expired');
    }

    console.log('Getting profile with token:', token);
    try {
      const response = await fetch(`${API_URL}/auth/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Failed to get profile:', error);
        this.clearStorage();
        throw new Error(error.message || 'Failed to get profile');
      }

      const data = await response.json();
      console.log('Profile retrieved:', data);
      return data;
    } catch (error) {
      console.error('Profile request failed:', error);
      this.clearStorage();
      throw error;
    }
  },
}; 