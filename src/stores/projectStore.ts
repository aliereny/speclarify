import create from "zustand";
import * as projectsService from "../services/projectsService";
import { persist } from "zustand/middleware";

export interface Project {
  id: number;
  name: string;
}

interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  addProject: (name: string) => Promise<void>;
  updateProject: (projectId: number, name: string) => Promise<void>;
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
      addProject: async (name: string) => {
        try {
          const response = await projectsService.createProject(name);
          const newProject = await projectsService.getProject(response.project_id);
          const projects = get().projects;
          set({ projects: [...projects, newProject] });
        } catch (error) {
          set({ error: "Failed to add project" });
        }
      },
      updateProject: async (projectId: number, name: string) => {
        try {
          await projectsService.updateProject(projectId, name);
          const projects = get().projects.map((p) =>
            p.id === projectId ? { ...p, name } : p,
          );
          set({ projects });
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
