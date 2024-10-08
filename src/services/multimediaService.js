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
};