import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;

function getAuthHeader() {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
}

const axiosInstance = () => {
    return axios.create({
        baseURL: API_URL,
        headers: getAuthHeader(),
    });
};

export default axiosInstance;