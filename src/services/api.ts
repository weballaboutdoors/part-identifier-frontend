import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://part-identifier-app-09f6c3e0b9b0.herokuapp.com/api/v1'
  : 'http://localhost:8000/api/v1';

console.log('Current API URL:', API_BASE_URL); // Debug log

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'X-API-Key': API_KEY,
        'Accept': 'application/json'
    }
});

export const identifyPart = async (formData: FormData) => {
    try {
        const response = await api.post('/identify', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};