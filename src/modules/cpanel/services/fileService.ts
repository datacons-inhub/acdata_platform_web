// src/services/fileService.ts
import { apiFetch } from './apiClient';
import { ApiResponse } from './types/api';
import logger from '../../../services/logger';

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


// Subir archivos
export async function uploadFiles(userId: number, projectId: string, files: File[]): Promise<ApiResponse<unknown>> {
  logger.info(`Subiendo archivos para user: ${userId}, project: ${projectId}`);
  
  const formData = new FormData();
  files.forEach(f => formData.append('files', f));

  return  await apiFetch<unknown>(`/api/v1/upload/file/create/${userId}`, {
    method: 'POST',
    body: formData
    // El apiClient establecerá la cabecera Authorization y Accept, no Content-Type (por FormData)
  });

}


export async function listFiles(userId: number): Promise<ApiResponse<FileRecord[]>> {

  console.log('[listFiles] userId _',userId,);
  return await apiFetch<FileRecord[]>(`/api/v1/upload/file/list/${userId}`, {
    method: 'GET'
  });

}


export async function deleteFile(file_id: string): Promise<ApiResponse<unknown>> {
  logger.info(`Eliminando archivo ${file_id}...`);
  return await apiFetch<unknown>(`/api/v1/upload/file/delete/${file_id}`, {
    method: 'DELETE'
  });

}