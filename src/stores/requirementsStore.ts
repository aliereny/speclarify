import create from 'zustand';
import * as requirementsService from '../services/requirementsService';

export interface Requirement {
    id: number;
    text: string;
}

export interface RequirementsState {
    requirements: Requirement[];
    loading: boolean;
    error: string | null;
    fetchRequirements: (projectId: number) => Promise<void>;
    parsePdf: (projectId: number, file: File) => Promise<void>;
}

export const useRequirementsStore = create<RequirementsState>((set) => ({
    requirements: [],
    loading: false,
    error: null,
    fetchRequirements: async (projectId) => {
        set({ loading: true, error: null });
        try {
            const requirements = await requirementsService.getProjectRequirements(projectId);
            set({ requirements });
        } catch (error) {
            set({ error: 'Failed to fetch requirements' });
        } finally {
            set({ loading: false });
        }
    },
    parsePdf: async (projectId, file) => {
        set({ loading: true, error: null });
        try {
            await requirementsService.parsePDF(projectId, file);
            const requirements = await requirementsService.getProjectRequirements(projectId);
            set({ requirements });
        } catch (error) {
            set({ error: 'Failed to parse PDF' });
        } finally {
            set({ loading: false });
        }
    },
}));
