import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://part-identifier-app-09f6c3e0b9b0.herokuapp.com/api/v1'
  : 'http://localhost:8000/api/v1';

export const identifyPart = async (formData: FormData) => {
    try {
        // Remove withCredentials since we're not using cookies/auth sessions
        const response = await axios.post(`${API_BASE_URL}/identify`, formData, {
            headers: {
                'X-API-Key': API_KEY,
                // Let axios set the correct Content-Type for FormData
                'Accept': 'application/json',
            },
            // Remove withCredentials: true
        });
        console.log('API Response:', response.data);
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