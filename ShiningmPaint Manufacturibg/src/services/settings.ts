import { apiService } from './api';

export const settingsService = {
    // Get all settings
    getSettings: async () => {
        try {
            const response: any = await apiService.get('/settings');
            return response;
        } catch (error) {
            console.error('Error fetching settings:', error);
            throw error;
        }
    }
};
