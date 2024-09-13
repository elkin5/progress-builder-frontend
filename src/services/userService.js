import axios from 'axios';

const API_URL = 'https://example.com/api/users'; // URL de tu API

export default {
  getAllUsers() {
    return axios.get(API_URL);
  },
  getUserById(id) {
    return axios.get(`${API_URL}/${id}`);
  },
  createUser(user) {
    return axios.post(API_URL, user);
  },
  updateUser(id, user) {
    return axios.put(`${API_URL}/${id}`, user);
  },
  deleteUser(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
};
