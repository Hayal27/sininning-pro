import { apiService } from './api';
import type { HeroSection, ApiResponse } from '../types';

export const heroService = {
    async getHero(): Promise<HeroSection> {
        const response = await apiService.get<HeroSection>('/hero');
        // Normalize data if necessary (e.g., ensure images is an array if strings)
        // The backend returns { success: true, data: { ... } }
        // apiService.get returns response.data, which is { success: true, data: ... }
        // Wait, let's double check apiService.get implementation
        return response.data;
    },

    async updateHero(id: number, data: Partial<HeroSection>): Promise<HeroSection> {
        const response = await apiService.put<HeroSection>(`/hero/${id}`, data);
        return response.data;
    },

    async uploadHeroImage(file: File): Promise<string> {
        // Determine which upload endpoint to use. uploadRoutes.js has /single
        // apiService.uploadFile sends to given url
        const response = await apiService.uploadFile('/upload/single', file);
        // Assuming the response structure from uploadController:
        // usually { success: true, data: { file: "filename.jpg", url: "..." } } or similar
        // But typically it returns the relative path or full URL.
        // If I look at uploadController, I can know for sure. 
        // For now, I'll assume standard format matching other services if any.
        // If not, I can just console.log the response in UI to debug or check uploadController now.

        // Backend returns { success: true, data: { fileUrl: "..." } }
        if (response.data && (response.data as any).fileUrl) {
            return (response.data as any).fileUrl;
        }
        return '';
    }
};
