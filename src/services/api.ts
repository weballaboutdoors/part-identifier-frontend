import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://part-identifier-app-09f6c3e0b9b0.herokuapp.com/api/v1'  // Replace with your Heroku URL
  : 'http://localhost:8000/api/v1';

export const identifyPart = async (formData: FormData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/v1/identify`, formData, {
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

