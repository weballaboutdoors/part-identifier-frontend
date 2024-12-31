import axios from 'axios';

const API_BASE_URL = 'https://part-identifier-app-09f6c3e0b9b0.herokuapp.com/api/v1';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'X-API-Key': process.env.REACT_APP_API_KEY
    }
});

export const identifyPart = async (formData: FormData) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${API_BASE_URL}/identify`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-API-Key': process.env.REACT_APP_API_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};