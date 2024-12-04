import axios from 'axios';
import logger from '../utils/logger';
//import { getToken } from './authService';
import apiClient from './apiClient';


//const API_BASE_URL = import.meta.env.VITE_API_BASE_URL|| 'http://localhost:8000';

interface SyncUserResponse {
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

export const syncUser = async (user_id: number): Promise<SyncUserResponse | ErrorResponse> => {
  /*const token = getToken();
  if (!token) {
    logger.error('No access token available');
    throw new Error('No access token available');
  }*/

  try {
    console.log('[syncUser] user_id', user_id);
    if (!user_id || user_id <= 0) {
      throw new Error('El userId no es válido.');
    }

    logger.info(`[syncUser] Starting sync for user ${user_id}`);
    console.log(`/api/v1/sync_user/${user_id}`);
    const response = await apiClient.get<SyncUserResponse>(`/api/v1/sync_user/${user_id}`, {
      /*headers: {
        Authorization: `Bearer ${token}`,
      },*/
    });
    console.log('[syncUser] Respuesta del servicio de sincronización:', response.data);
    logger.info(`Sync successful for user ${user_id}: ${response.data.message}`);
    console.log('response', response.data);
    return response.data;
  } catch (error: any) {
    console.log('error', error);
    if (axios.isAxiosError(error)) {
      logger.error(`Error syncing user ${user_id}: ${error.response?.data?.message || 'Unknown error'}`);
      return {
        success: false,
        error: {
          code: error.response?.status || 500,
          message: error.response?.data?.message || 'Unknown error',
        },
      };
    } else {
      logger.error(`Unexpected error syncing user ${user_id}: ${error.message}`);
      return {
        success: false,
        error: {
          code: 500,
          message: 'Unexpected error',
        },
      };
    }
  }
};