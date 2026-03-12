import axios from 'axios';
import toast from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: API,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.data?.detail) {
            toast.error(error.response.data.detail);
        } else if (error.message) {
            toast.error(error.message);
        }
        return Promise.reject(error);
    }
);

export default api;
