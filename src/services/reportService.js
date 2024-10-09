import axiosInstance from '@/services/axiosInstance';

export default {
    async getCountUsersByType() {
        try {
            const response = await axiosInstance().get(`/users/query/count-by-type`);
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener la información.');
        }
    },

    async getCountClientsByType() {
        try {
            const response = await axiosInstance().get(`/clients/query/count-by-type`);
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener la información.');
        }
    },

    async getCountTaskCompleteByProject(projectId) {
        try {
            const response =
                await axiosInstance().get(`/project/query/count-tasks-by-project/${projectId}`);
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener la información.');
        }
    },
};