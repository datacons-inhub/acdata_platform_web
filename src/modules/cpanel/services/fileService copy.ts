// src/services/fileService.ts
import { apiFetch } from './apiClient';
import { ApiResponse } from './types/api';
import logger from '../../../services/logger';

export async function uploadFiles(userId: number, projectId: string, files: File[]): Promise<ApiResponse<unknown>> {
  logger.info(`Subiendo archivos para user: ${userId}, project: ${projectId}`);
  
  const formData = new FormData();
  files.forEach(f => formData.append('files', f));

  try {
    const response = await apiFetch<unknown>(`/api/v1/upload/file/create/${userId}`, {
      method: 'POST',
      body: formData
      // El apiClient establecerá la cabecera Authorization y Accept, no Content-Type (por FormData)
    });

    return response;
  } catch (err: any) {
    logger.error(err.message);
    throw err;
  }
}

export interface FileRecord {
  filename: string;
  content_type: string;
  size: number;
  storage_path: string;
  upload_date: string;
  project_id: string;
  user_id: number;
  _id: string;
}

export async function listFiles(userId: number): Promise<ApiResponse<FileRecord[]>> {
  logger.info(`Listando archivos para user: ${userId}, `);
  try {
    console.log('[listFiles] userId _',userId,);
    const response = await apiFetch<FileRecord[]>(`/api/v1/upload/file/list/${userId}`, {
      method: 'GET'
    });
    console.log('[listFiles] response _',response);
    return response;
  } catch (err: any) {
    logger.error(err.message);
    throw err;
  }
}


export async function deleteFile(file_id: string): Promise<ApiResponse<unknown>> {
  logger.info(`Eliminando archivo ${file_id}...`);
  try {
    const response = await apiFetch<unknown>(`/api/v1/upload/file/delete/${file_id}`, {
      method: 'DELETE'
    });
    return response;
  } catch (err: any) {
    logger.error(err.message);
    throw err;
  }
}