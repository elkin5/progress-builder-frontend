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

  async logout(router) {
    try {
      // Remover el token del localStorage
      localStorage.removeItem('token');

      // Limpiar cualquier caché del navegador (opcional)
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        for (let name of cacheNames) {
          await caches.delete(name); // Eliminar todas las cachés
        }
      }

      // Limpiar el estado de Vuex (si usas Vuex) o cualquier otra información almacenada

      // Redirigir al login
      router.push('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  },
};
