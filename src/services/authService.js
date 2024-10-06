import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;

export default {
  async login(credentials) {
    try {
      return await axios.post(`${API_URL}/users/login`, credentials);
    } catch (error) {
      throw new Error('Error al iniciar sesión. Verifique sus credenciales.');
    }
  },

  getToken() {
    return localStorage.getItem('token'); // Devuelve el token almacenado
  },

  logout(router) {
    localStorage.removeItem('token');
    router.push('/login');
  }
};
