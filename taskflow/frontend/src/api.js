import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
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
