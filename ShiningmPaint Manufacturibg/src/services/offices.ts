import { apiService } from './api';

export interface Office {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    hours_mon_fri: string;
    hours_sat: string;
    hours_sun: string;
    is_primary: boolean;
    order_index: number;
}

export const officesService = {
    getOffices: async () => {
        try {
            const response: any = await apiService.get('/offices');
            return response;
        } catch (error) {
            console.error('Error fetching offices:', error);
            throw error;
        }
    }
};
