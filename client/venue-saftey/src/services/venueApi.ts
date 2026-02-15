import type { VenueSummary, Venue } from '../types/venueModels';

// Backend API base URL
const BACKEND_URL = 'https://venue-saftey-backend.vercel.app';
// const BACKEND_URL = 'http://localhost:3000';
export const venueApi = {
    async getAllVenues(): Promise<VenueSummary[]> {
        if (!BACKEND_URL) {
            console.warn('BACKEND_URL not configured');
            return [];
        }
        try {
            console.log('Fetching all venues from API:', `${BACKEND_URL}/api/venues`);
            const res = await fetch(`${BACKEND_URL}/api/venues`);
            console.log('API response for all venues:', res);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        } catch (err) {
            console.error('Failed to fetch venues:', err);
            return [];
        }
    },

    async getVenue(venueId: string): Promise<Venue | null> {
        if (!BACKEND_URL) {
            console.warn('BACKEND_URL not configured');
            return null;
        }
        try {
            const res = await fetch(`${BACKEND_URL}/api/venues/${venueId}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        } catch (err) {
            console.error('Failed to fetch venue:', err);
            return null;
        }
    }
};
