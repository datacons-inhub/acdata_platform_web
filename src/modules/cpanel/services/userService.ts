// src/services/userService.ts
import { apiFetch } from './apiClient';
import { ApiResponse } from './types/api';
import logger from '../../../services/logger';

interface SyncUserData {
  id: string;
  email: string;
  registration_date: string;
  update_date: string;
}

export async function syncUser(userId: number): Promise<SyncUserData> {

  const response: ApiResponse<SyncUserData> = await apiFetch<SyncUserData>(`/api/v1/sync_user/${userId}`, {
    method: 'GET'
  });

  if (!response.success) {
    throw new Error(response.error?.msg || 'Sync user failed');
  }

  logger.info('User synced successfully.');
  
  // Acá response.data es SyncUserData
  return response.data!;
}

