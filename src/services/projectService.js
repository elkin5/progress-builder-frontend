import axiosInstance from '@/services/axiosInstance';

export default {
    async getAllProjects(page = 1, pageSize = 10) {
        try {
            const response = await axiosInstance().get(`/projects?page=${page}&pageSize=${pageSize}`);
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener los proyectos.');
        }
    },

    async getProjectById(id) {
        try {
            const response = await axiosInstance().get(`/projects/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener el proyecto.');
        }
    },

    async createProject(project) {
        try {
            const response = await axiosInstance().post('/projects', project);
            return response.data;
        } catch (error) {
            throw new Error('Error al crear el proyecto.');
        }
    },

    async updateProject(id, project) {
        try {
            const response = await axiosInstance().put(`/projects/${id}`, project);
            return response.data;
        } catch (error) {
            throw new Error('Error al actualizar el proyecto.');
        }
    },

    async deleteProject(id) {
        try {
            const response = await axiosInstance().delete(`/projects/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Error al eliminar el proyecto.');
        }
    }
};