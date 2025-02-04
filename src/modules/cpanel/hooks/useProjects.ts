// src/hooks/useProjects.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listProjects, createProject, updateProject, deleteProject, getProject, Project } from '../services/projectService';;
import logger from '../../../services/logger';

import { ApiResponse } from '../services/types/api';
import { useGlobalContext } from "../context/GlobalContext"; // Importar el contexto global

interface UpdateData {
  projectId: string;
  data: {name: string;description: string;type: string;
  };
}

export function useProjects() {

  console.log('[HOOKS Calling useProjects ...]');

  const { userId } = useGlobalContext();// Acceder al user_id desde el contexto global
  const queryClient = useQueryClient();
  

  // Query para listar proyectos
  const {data, isLoading, isError, error } = useQuery<ApiResponse<Project[]>>({
    queryKey: ['projects', userId],
    queryFn: async () => {
      try {
        const response = await listProjects(userId);
        if (!response) {
          throw new Error('No response from listProjects');
        }
        return response;
      } catch (err) {
        console.error('ERROR: [HOOKS - listProjects] Error fetching projects:', err);
        return { success: false, data: [], error: { msg: 'Error fetching projects' } };
      }
    },
    staleTime: 60000, // 1 minuto, ajustable según necesidades
    refetchOnWindowFocus: false, // Evita recargar al cambiar de ventana
  });

  // Extraer la lista de proyectos del ApiResponse (si success=true)
  const projects = data?.success ? data.data : [];


  // Mutación para crear proyecto
  const createProjectMutation = useMutation<
    ApiResponse<Project>,
    Error, 
    { name:string; description:string; type:string; user_id:number } 
  >({
    mutationFn: createProject, // Función que ejecuta la mutación
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'], userId });
    },
    onError: (err: Error) => {
      console.error('ERROR: [HOOKS] Error creating project:', error);
      logger.error(err.message);
    }
  });


  // Mutación para actualizar proyecto
  const updateMutation = useMutation<ApiResponse<Project>, Error, UpdateData>({
    mutationFn: ({ projectId, data }) => updateProject(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'], userId });
    },
    onError: (err: Error) => {
      console.error('ERROR: [HOOKS] Error updating  project:', error);
      logger.error(err.message);
    }
  });


  // Mutación para eliminar proyecto
  const deleteMutation = useMutation<ApiResponse<unknown>, Error, string >({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'], userId });
    },
    onError: (err: Error) => {
      console.error('ERROR: [HOOKS] Error deleting project:', error);
      logger.error(err.message);
    }
  });


  // Función auxiliar para obtener detalle de un proyecto puntual
  // (se puede convertir en un useQuery separado si se requiere caching específico)
  async function fetchProjectDetail(projectId: string): Promise<Project> {    
      const resp = await getProject(projectId);

      if (!resp.success) {
        console.error('ERROR: [HOOKS] Error fetching project detail:', resp.error?.msg);
        throw new Error(resp.error?.msg || 'Error al obtener proyecto');
      }
      if (!resp.data) {
        console.error('ERROR: [HOOKS] Error fetching project detail: Project data is undefined');
        throw new Error('Project data is undefined');
      }
      return resp.data;
  }


  return {
    projects,
    isLoading,
    isError,
    error, // Tipado: Error de query
    // mutaciones expuestas como funciones asíncronas
    createProject: createProjectMutation.mutateAsync,
    updateProject: updateMutation.mutateAsync,
    deleteProject: deleteMutation.mutateAsync,
    fetchProjectDetail
  };
}
/*

export const useCreateProject = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (project: CreateProjectRequest) => clientProjects.createProject(project),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      onSuccess?.();
    },
  });
};*/