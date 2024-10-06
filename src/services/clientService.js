import axiosInstance from '@/services/axiosInstance';

export default {
  async getAllClients(page = 1, pageSize = 10) {
    try {
      const response = await axiosInstance().get(`/clients?page=${page}&pageSize=${pageSize}`);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener los clientes.');
    }
  },

  async getClientById(id) {
    try {
      const response = await axiosInstance().get(`/clients/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener el cliente.');
    }
  },

  async createClient(client) {
    try {
      const response = await axiosInstance().post('/clients/register', client);
      return response.data;
    } catch (error) {
      throw new Error('Error al crear el cliente.');
    }
  },

  async updateClient(id, client) {
    try {
      const response = await axiosInstance().put(`/clients/${id}`, client);
      return response.data;
    } catch (error) {
      throw new Error('Error al actualizar el cliente.');
    }
  },

  async deleteClient(id) {
    try {
      const response = await axiosInstance().delete(`/clients/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error al eliminar el cliente.');
    }
  }
};