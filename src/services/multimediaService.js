import axiosInstance from '@/services/axiosInstance';


export default {
    async uploadMultimediaFile(formData, onUploadProgress) {
        try {
            const response = await axiosInstance().post('/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress, // Progreso de la subida
            });
            return response.data;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    },

    async getFilesByAdvance(advanceId) {
        try {
            const response = await axiosInstance().get(`/files/by-advance/${advanceId}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener archivos multimedia:', error);
            throw error;
        }
    },
};