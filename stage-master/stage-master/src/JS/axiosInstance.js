import axios from 'axios';



const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
});
axiosInstance.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return config;
});




export default axiosInstance;