// src/services/projectService.ts
import { apiFetch } from './apiClient';
import { ApiResponse } from './types/api';

export interface Project {
  _id: string;
  name: string;
  description: string;
  type: string;
  status: string;
  created_at: string; // fecha de creación
  updated_at?: string;
  user_id: number;
}


// Crear proyecto
export async function createProject(
    data:{name:string;description:string;type:string;user_id:number}
  ):Promise<ApiResponse<Project>> {
  return await apiFetch<Project>('/api/v1/projects/create', {
    method: 'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(data),
  });
}


/**
 * Lista los proyectos de un usuario específico.
 * @param userId - ID del usuario.
 * @returns Respuesta de la API con la lista de proyectos.
 */
export async function listProjects(userId:number):Promise<ApiResponse<Project[]>> {
  return await apiFetch<Project[]>(`/api/v1/projects/list/${userId}`, { method: 'GET' });
}


/**
 * Obtiene el detalle de un proyecto específico.
 * @param projectId - ID del proyecto.
 * @returns Respuesta de la API con los detalles del proyecto.
 */
export async function getProject(project_id:string):Promise<ApiResponse<Project>> {
  return await apiFetch<Project>(`/api/v1/projects/get/${project_id}`, { method:'GET' });
}


/**
 * Actualiza un proyecto existente.
 * @param projectId - ID del proyecto a actualizar.
 * @param data - Datos actualizados del proyecto.
 * @returns Respuesta de la API con el proyecto actualizado.
 */
export async function updateProject( 
    project_id:string, 
    data:{name:string;description:string;type:string;}):Promise<ApiResponse<Project>> {

  return await apiFetch<Project>(`/api/v1/projects/update/${project_id}`, {
    method:'PUT',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(data),
  });
}


/**
 * Elimina un proyecto.
 * @param projectId - ID del proyecto a eliminar.
 * @returns Respuesta de la API confirmando la eliminación.
 */
export async function deleteProject(project_id:string):Promise<ApiResponse<unknown>> {
  return await apiFetch<unknown>(`/api/v1/projects/delete/${project_id}`, {method:'DELETE'});
}
