import { apiService } from './api';

export interface Office {
    id?: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    hours_mon_fri: string;
    hours_sat: string;
    hours_sun: string;
    is_primary: boolean;
    order_index?: number;
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
    },

    createOffice: async (office: Office) => {
        try {
            const response: any = await apiService.post('/offices', office);
            return response;
        } catch (error) {
            console.error('Error creating office:', error);
            throw error;
        }
    },

    updateOffice: async (id: number, office: Office) => {
        try {
            const response: any = await apiService.put(`/offices/${id}`, office);
            return response;
        } catch (error) {
            console.error('Error updating office:', error);
            throw error;
        }
    },

    deleteOffice: async (id: number) => {
        try {
            const response: any = await apiService.delete(`/offices/${id}`);
            return response;
        } catch (error) {
            console.error('Error deleting office:', error);
            throw error;
        }
    }
};
