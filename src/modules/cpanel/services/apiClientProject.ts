import { apiFetch } from './apiClient';

export type Project2 = {
    _id: string;
    name: string;
    description: string;
    status: string,
    type: string;
    created_at: string;
    updated_at?: string;
    user_id: number;
};

export type CreateProjectRequest = {
    name: string;
    description: string;
    type: string;
    user_id: number;
};
  
export const clientProjects = {

    async createProject(project: CreateProjectRequest) {
        const res = await apiFetch<Project2>('/api/v1/projects/create', {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(project),
        });
        if (!res.success) {
          const errorResponse = await res.error;
          throw new Error(errorResponse.msg);
        }
        const json = await res.data;
        return json as Project2;
      },
    
};