// src/hooks/useFiles.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listFiles, uploadFiles, deleteFile } from '../services/fileService';
import { ApiResponse } from '../services/types/api';
import logger from '../../../services/logger';
import { useGlobalContext } from '../context/GlobalContext';

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

export function useFiles() {

  console.log('[HOOKS Calling useFiles ...]');
  const { userId } = useGlobalContext();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery<ApiResponse<FileRecord[]>>({
    queryKey: ['files', userId],    
    queryFn: async () => {
      try {
        const response = await listFiles(userId);
        if (!response) {
          throw new Error('No response from listProjects');
        }
        return response;
      } catch (err) {
        console.error('ERROR: [HOOKS - listProjects] Error fetching projects:', err);
        return { success: false, data: [], error: { msg: 'Error fetching projects' } };
      }
    },
    staleTime: 30000,

  });
  const allFiles = data?.success ? data.data : [];  


  const uploadMutation = useMutation<ApiResponse<unknown>, Error, { projectId: string; files: File[] }>({
    mutationFn: ({ projectId, files }) => uploadFiles(userId, projectId, files),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files', userId] });
      logger.info('Archivos subidos con éxito');
      
    },
    onError: (err: Error) => {
      logger.error(err.message);
    },
    
  });
/*
  const deleteMutation = useMutation<ApiResponse<unknown>, Error, string>({
    mutationFn: (fileId) => deleteFile(fileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files', userId] });
      logger.info('Archivo eliminado con éxito');
    },
    onError: (err: Error) => {
      logger.error(err.message);
    },
  });

  const deleteFileById = async (fileId: string) => {
    if (!fileId) {
      logger.warn('No file ID provided for deletion');
      return;
    }
    try {
      await deleteMutation.mutateAsync(fileId);
    } catch (err) {
      if (err instanceof Error) {
        logger.error(`Error deleting file: ${err.message}`);
      } else {
        logger.error('Error deleting file: Unknown error');
      }
    }
  };*/


  const deleteMutation = useMutation<ApiResponse<unknown>, Error, string>({
    mutationFn: (fileId) => deleteFile(fileId),
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files', userId] });
      logger.info('Archivo eliminado con éxito');
    },
    onError: (err: Error) => {
      logger.error(err.message);
    },
  });
  

  return {
    allFiles,
    isLoading,
    isError,
    error,
    uploadFiles: uploadMutation.mutateAsync,
    deleteFile: deleteMutation.mutateAsync,

  };
}
