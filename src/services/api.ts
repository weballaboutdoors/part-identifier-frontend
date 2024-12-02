import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'X-API-Key': API_KEY
    }
});

export const identifyPart = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await api.post('/identify', formData);
        return response.data;
    } catch (error) {
        console.error('Error identifying part:', error);
        throw error;
    }
};

export const getHistory = async () => {
    try {
        const response = await api.get('/history');
        return response.data;
    } catch (error) {
        console.error('Error fetching history:', error);
        throw error;
    }
};