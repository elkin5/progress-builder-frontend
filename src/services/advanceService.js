import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;

function getAuthHeader() {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export default {
    async getAllAdvances() {
        try {
            const response = await axios.get(`${API_URL}/advances`, {
                headers: getAuthHeader(),
            });
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    },

    async getAdvanceById(id) {
        try {
            const response = await axios.get(`${API_URL}/advances/${id}`, {
                headers: getAuthHeader(),
            });
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    },

    async createAdvance(advance) {
        try {
            const response = await axios.post(`${API_URL}/advances`, advance, {
                headers: getAuthHeader(),
            });
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    },

    async updateAdvance(id, advance) {
        try {
            const response = await axios.put(`${API_URL}/advances/${id}`, advance, {
                headers: getAuthHeader(),
            });
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    },

    async deleteAdvance(id) {
        try {
            const response = await axios.delete(`${API_URL}/advances/${id}`, {
                headers: getAuthHeader(),
            });
            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    }
};