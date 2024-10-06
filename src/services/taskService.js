import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;

function getAuthHeader() {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export default {
    async getAllTasks() {
        try {
            const response = await axios.get(`${API_URL}/tasks`, {
                headers: getAuthHeader(),
            });
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    },

    async getTaskById(id) {
        try {
            const response = await axios.get(`${API_URL}/tasks/${id}`, {
                headers: getAuthHeader(),
            });
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    },

    async createTask(task) {
        try {
            const response = await axios.post(`${API_URL}/tasks`, task, {
                headers: getAuthHeader(),
            });
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    },

    async updateTask(id, task) {
        try {
            const response = await axios.put(`${API_URL}/tasks/${id}`, task, {
                headers: getAuthHeader(),
            });
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    },

    async deleteTask(id) {
        try {
            const response = await axios.delete(`${API_URL}/tasks/${id}`, {
                headers: getAuthHeader(),
            });
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    }
};