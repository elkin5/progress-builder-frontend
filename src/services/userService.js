import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;

function getAuthHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export default {
  async getAllUsers() {
    try {
      const response = await axios.get(`${API_URL}/users`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  
  async getUserById(id) {
    try {
      const response = await axios.get(`${API_URL}/users/${id}`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  async createUser(user) {
    try {
      const response = await axios.post(`${API_URL}/users/register`, user, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  async updateUser(id, user) {
    try {
      const response = await axios.put(`${API_URL}/users/${id}`, user, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  async deleteUser(id) {
    try {
      const response = await axios.delete(`${API_URL}/users/${id}`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
};
