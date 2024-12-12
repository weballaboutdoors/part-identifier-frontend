import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const API_BASE_URL = process.env.REACT_APP_API_URL;

export const identifyPart = async (formData: FormData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/identify`, formData, {
            headers: {
                'X-API-Key': API_KEY,
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            },
            withCredentials: true
        });
        console.log('API Response:', response.data); // Debug log
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        if (axios.isAxiosError(error)) {
            console.error('Response data:', error.response?.data);
            console.error('Response status:', error.response?.status);
        }
        throw error;
    }
};

