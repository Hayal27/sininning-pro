import { apiService } from './api';
import type { HeroSection } from '../types/index';

export const heroService = {
    // Get active hero section
    async getActiveHero(): Promise<HeroSection> {
        const response = await apiService.get('/hero');
        return response.data;
    },
};
