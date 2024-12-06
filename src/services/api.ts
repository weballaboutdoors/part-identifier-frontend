import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const API_BASE_URL = 'http://localhost:8000/api/v1';
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'X-API-Key': API_KEY
    }
});

export const identifyPart = async (formData: FormData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/identify`, formData, {
        headers: {
          'X-API-Key': API_KEY,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
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