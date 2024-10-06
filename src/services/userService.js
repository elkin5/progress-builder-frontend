import axiosInstance from '@/services/axiosInstance';

export default {
  async getAllUsers() {
    try {
      const response = await axiosInstance().get('/users');
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new Error('No se encontraron usuarios.');
      } else {
        throw new Error('Error al obtener los usuarios. Intente más tarde.');
      }
    }
  },

  async getUserById(id) {
    try {
      const response = await axiosInstance().get(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener el usuario.');
    }
  },

  async createUser(user) {
    try {
      const response = await axiosInstance().post('/users/register', user);
      return response.data;
    } catch (error) {
      throw new Error('Error al crear el usuario. Verifique los datos.');
    }
  },

  async updateUser(id, user) {
    try {
      const response = await axiosInstance().put(`/users/${id}`, user);
      return response.data;
    } catch (error) {
      throw new Error('Error al actualizar el usuario.');
    }
  },

  async deleteUser(id) {
    try {
      const response = await axiosInstance().delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error al eliminar el usuario.');
    }
  }
};