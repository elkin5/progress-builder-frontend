import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;

function getAuthHeader() {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export default {
    async getAllProjects() {
        try {
            const response = await axios.get(`${API_URL}/projects`, {
                headers: getAuthHeader(),
            });
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    },

    async getProjectById(id) {
        try {
            const response = await axios.get(`${API_URL}/projects/${id}`, {
                headers: getAuthHeader(),
            });
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    },

    async createProject(project) {
        try {
            const response = await axios.post(`${API_URL}/projects`, project, {
                headers: getAuthHeader(),
            });
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    },

    async updateProject(id, project) {
        try {
            const response = await axios.put(`${API_URL}/projects/${id}`, project, {
                headers: getAuthHeader(),
            });
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    },

    async deleteProject(id) {
        try {
            const response = await axios.delete(`${API_URL}/projects/${id}`, {
                headers: getAuthHeader(),
            });
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    }
};