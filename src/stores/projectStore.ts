import create from "zustand";
import * as projectsService from "../services/projectsService";
import { persist } from "zustand/middleware";

export interface Project {
  id: number;
  name: string;
  description: string;
  created_at: string;
  number_of_requirements: number;
}

interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  addProject: (name: string, description: string) => Promise<Project>;
  updateProject: (
    projectId: number,
    name: string,
    description: string,
  ) => Promise<Project>;
  deleteProject: (projectId: number) => Promise<void>;
}

export const useProjectStore = create(
  persist<ProjectState>(
    (set, get) => ({
      projects: [],
      loading: false,
      error: null,
      fetchProjects: async () => {
        set({ loading: true, error: null });
        try {
          const projects = await projectsService.getAllProjects();
          set({ projects });
        } catch (error) {
          set({ error: "Failed to fetch projects" });
        } finally {
          set({ loading: false });
        }
      },
      addProject: async (name: string, description: string) => {
        try {
          const response = await projectsService.createProject(
            name,
            description,
          );
          const newProject = await projectsService.getProject(
            response.project_id,
          );
          const projects = get().projects;
          set({ projects: [...projects, newProject] });
          return newProject;
        } catch (error) {
          set({ error: "Failed to add project" });
        }
      },
      updateProject: async (
        projectId: number,
        name: string,
        description: string,
      ) => {
        try {
          await projectsService.updateProject(projectId, name, description);
          const newProject = await projectsService.getProject(projectId);
          const projects = get().projects.map((p) =>
            p.id === projectId ? newProject : p,
          );
          set({ projects });
          return newProject;
        } catch (error) {
          set({ error: "Failed to update project" });
        }
      },
      deleteProject: async (projectId: number) => {
        try {
          await projectsService.deleteProject(projectId);
          const projects = get().projects.filter((p) => p.id !== projectId);
          set({ projects });
        } catch (error) {
          set({ error: "Failed to delete project" });
        }
      },
    }),
    { name: "projectStore" },
  ),
);
