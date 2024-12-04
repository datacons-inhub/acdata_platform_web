// src/services/fileService.ts
import apiClient from './apiClient';

interface FileResponse {
    success: boolean;
    message: string;
    data: {
      _id: string;
      user_id: number;
      email: string;
      registration_date: string;
      update_date: string;
    };
  }
  
interface ErrorResponse {
    success: boolean;
    error: {
      code: number;
      message: string;
    };
  }

export const uploadFiles = async (
    user_id: number,
    project_id: number,
    files: File[]
  ): Promise<any> => {
    const formData = new FormData();
    files.forEach((file) => {
        console.log('file', file);
        formData.append('files', file);
    });
  
    try {
        console.log(`/api/v1/projects/${user_id}/${project_id}/file/create`);
      const response = await apiClient.post(`/api/v1/projects/${user_id}/${project_id}/file/create`, 
        formData, 
        {
        headers: {
            'Content-Type': 'multipart/form-data',
            // Authorization: `Bearer ${token}`,
          },
      });
  
      return response.data;

    } catch (error) {
      console.error('Error al cargar los archivos:', error.message);
      throw error;
    }
  };