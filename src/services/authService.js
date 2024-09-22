import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;

export default {
  async login(credentials) {
    try {
      const response = await axios.post(`${API_URL}/users/login`, credentials);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },

  getToken() {
    return localStorage.getItem('token'); // Devuelve el token almacenado
  },

  getUserEmail() {
    const token = this.getToken();
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1])); // Decodifica el JWT
      return decoded.email; // Devuelve el correo del usuario
    }
    return null; // Si no hay token, devuelve null
  },

  logout(router) {
    localStorage.removeItem('token');
    router.push('/login');
  }
};
