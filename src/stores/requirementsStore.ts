import * as requirementsService from "../services/requirementsService";
import { persist } from "zustand/middleware";
import {create} from "zustand";

export interface Requirement {
  id: number;
  title: string;
  text: string;
}

export interface RequirementsState {
  requirements: Requirement[];
  loading: boolean;
  error: string | null;
  fetchRequirements: (projectId: number) => Promise<void>;
  parsePdf: (projectId: number, file: File) => Promise<boolean>;
}

export const useRequirementsStore = create(
  persist<RequirementsState>(
    (set) => ({
      requirements: [],
      loading: false,
      error: null,
      fetchRequirements: async (projectId) => {
        set({ loading: true, error: null });
        try {
          const requirements =
            await requirementsService.getProjectRequirements(projectId);
          set({ requirements });
        } catch (error) {
          set({ error: "Failed to fetch requirements" });
        } finally {
          set({ loading: false });
        }
      },
      parsePdf: async (projectId, file) => {
        set({ loading: true, error: null });
        try {
          await requirementsService.parsePDF(projectId, file);
          const requirements =
            await requirementsService.getProjectRequirements(projectId);
          set({ requirements });
          return true;
        } catch (error) {
          set({ error: "Failed to parse PDF" });
          return false;
        } finally {
          set({ loading: false });
        }
      },
    }),
    { name: "requirements" },
  ),
);
