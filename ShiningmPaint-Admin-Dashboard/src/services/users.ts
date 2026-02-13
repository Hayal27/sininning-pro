import { apiService } from './api';
import type { User, ApiResponse, PaginatedResponse } from '../types';

export interface UserFilters {
    role?: string;
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
}

export interface UserFormData {
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    phone?: string;
    is_active?: boolean;
    password?: string;
}

// Helper to transform backend user to frontend user
const transformUser = (user: any): User => ({
    id: user.id,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
    role: user.role,
    phone: user.phone,
    avatar: user.avatar,
    isActive: user.is_active ? true : false, // ensure boolean
    createdAt: user.created_at,
    updatedAt: user.updated_at
});

export const userService = {
    getUsers: async (filters?: UserFilters) => {
        const response: any = await apiService.get<any>('/users', { params: filters });
        // Transform the list of users
        if (response.success && response.data) {
            return {
                ...response,
                data: response.data.map(transformUser)
            } as unknown as PaginatedResponse<User>;
        }
        return response as unknown as PaginatedResponse<User>;
    },

    getUser: async (id: number) => {
        const response = await apiService.get<any>(`/users/${id}`);
        if (response.success && response.data) {
            return {
                ...response,
                data: transformUser(response.data)
            } as ApiResponse<User>;
        }
        return response as ApiResponse<User>;
    },

    createUser: async (data: UserFormData) => {
        const response = await apiService.post<any>('/users', data);
        if (response.success && response.data) {
            return {
                ...response,
                data: transformUser(response.data)
            } as ApiResponse<User>;
        }
        return response as ApiResponse<User>;
    },

    updateUser: async (id: number, data: Partial<UserFormData>) => {
        const response = await apiService.put<any>(`/users/${id}`, data);
        if (response.success && response.data) {
            return {
                ...response,
                data: transformUser(response.data)
            } as ApiResponse<User>;
        }
        return response as ApiResponse<User>;
    },

    deleteUser: async (id: number) => {
        return apiService.delete<ApiResponse<void>>(`/users/${id}`);
    },

    resetPassword: async (id: number) => {
        return apiService.post<ApiResponse<{ newPassword: string }>>(`/users/${id}/reset-password`);
    }
};
