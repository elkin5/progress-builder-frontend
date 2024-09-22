import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;

function getAuthHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export default {
  async getAllClients() {
    try {
      const response = await axios.get(`${API_URL}/clients`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  
  async getClientById(id) {
    try {
      const response = await axios.get(`${API_URL}/clients/${id}`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  async createClient(client) {
    try {
      const response = await axios.post(`${API_URL}/clients/register`, client, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  async updateClient(id, client) {
    try {
      const response = await axios.put(`${API_URL}/clients/${id}`, client, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  async deleteClient(id) {
    try {
      const response = await axios.delete(`${API_URL}/clients/${id}`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
};
