import axiosInstance from '@/services/axiosInstance';

export default {
    async getAllTasks(page = 1, pageSize = 10) {
        try {
            const response = await axiosInstance().get(`/tasks?page=${page}&pageSize=${pageSize}`);
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener las tareas.');
        }
    },

    async getTaskById(id) {
        try {
            const response = await axiosInstance().get(`/tasks/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener la tarea.');
        }
    },

    async createTask(task) {
        try {
            const response = await axiosInstance().post('/tasks', task);
            return response.data;
        } catch (error) {
            throw new Error('Error al crear la tarea. Verifique los datos.');
        }
    },

    async updateTask(id, task) {
        try {
            const response = await axiosInstance().put(`/tasks/${id}`, task);
            return response.data;
        } catch (error) {
            throw new Error('Error al actualizar la tarea.');
        }
    },

    async deleteTask(id) {
        try {
            const response = await axiosInstance().delete(`/tasks/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Error al eliminar la tarea.');
        }
    }
};