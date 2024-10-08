import axiosInstance from '@/services/axiosInstance';

export default {
    async getAllAdvances(page = 1, pageSize = 10) {
        try {
            const response = await axiosInstance().get(`/advances?page=${page}&pageSize=${pageSize}`);
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener los avances.');
        }
    },

    async getAdvanceById(id) {
        try {
            const response = await axiosInstance().get(`/advances/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener el avance.');
        }
    },

    async createAdvance(advance) {
        try {
            console.log(advance)
            const response = await axiosInstance().post('/advances/register', advance);
            return response.data;
        } catch (error) {
            throw new Error('Error al crear el avance.');
        }
    },

    async updateAdvance(id, advance) {
        try {
            const response = await axiosInstance().put(`/advances/${id}`, advance);
            return response.data;
        } catch (error) {
            throw new Error('Error al actualizar el avance.');
        }
    },

    async deleteAdvance(id) {
        try {
            const response = await axiosInstance().delete(`/advances/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Error al eliminar el avance.');
        }
    }
};