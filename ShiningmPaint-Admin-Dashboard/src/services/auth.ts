import { apiService } from './api';
import type { User, LoginForm } from '../types';

export interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  async login(credentials: LoginForm): Promise<AuthResponse> {
    const response: any = await apiService.post('/auth/login', credentials);

    if (response.success && response.token) {
      localStorage.setItem('token', response.token);

      // Transform backend user format to frontend format
      const backendUser: any = response.user;
      const user: User = {
        id: backendUser.id,
        email: backendUser.email,
        firstName: backendUser.first_name,
        lastName: backendUser.last_name,
        role: backendUser.role,
        avatar: backendUser.avatar
      };

      localStorage.setItem('user', JSON.stringify(user));

      return {
        user,
        token: response.token
      };
    }

    throw new Error('Login failed');
  },

  async logout(): Promise<void> {
    try {
      await apiService.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  async getCurrentUser(): Promise<User> {
    const response: any = await apiService.get('/auth/me');

    if (response.success) {
      const backendUser: any = response.data;
      return {
        id: backendUser.id,
        email: backendUser.email,
        firstName: backendUser.first_name,
        lastName: backendUser.last_name,
        role: backendUser.role,
        avatar: backendUser.avatar
      };
    }

    throw new Error('Failed to get current user');
  },

  async refreshToken(): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/refresh');
    if (response.success && response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async forgotPassword(email: string): Promise<void> {
    await apiService.post('/auth/forgot-password', { email });
  },

  async resetPassword(token: string, password: string): Promise<void> {
    await apiService.post('/auth/reset-password', { token, password });
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await apiService.put('/auth/password', {
      currentPassword,
      newPassword,
    });
  },

  getStoredUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getStoredToken(): string | null {
    return localStorage.getItem('token');
  },

  isAuthenticated(): boolean {
    return !!this.getStoredToken();
  },
};
