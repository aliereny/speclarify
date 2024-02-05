import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PageResponse } from '@/redux/types';
import { RcFile } from 'antd/lib/upload/interface';

export interface Project {
  id: string;
  name: string;
  path: string;
  description: string;
  photo?: string;
  createdAt: string;
}

export interface ProjectState {
  projects: PageResponse<Project>;
  currentProject: Project | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: {
    items: [],
    totalItems: 0,
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
  },
  currentProject: null,
  loading: false,
  error: null,
};

export interface FetchProjectsRequestPayload {
  search?: string;
  pageNumber?: number;
  pageSize?: number;
  orgPath: string;
}

export interface CreateProjectRequestPayload {
  name: string;
  description: string;
  photo?: RcFile;
  orgPath: string;
}

export interface UpdateProjectRequestPayload {
  projectPath: string;
  orgPath: string;
  name: string;
  description: string;
  photo?: RcFile;
}

export interface FetchProjectRequestPayload {
  orgPath: string;
  projectPath: string;
}

export interface DeleteProjectRequestPayload {
  orgPath: string;
  projectPath: string;
}

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    fetchProjectsRequest: (
      state,
      action: PayloadAction<FetchProjectsRequestPayload>,
    ) => {
      state.loading = true;
      state.projects = {
        ...state.projects,
        currentPage: action.payload.pageNumber || 1,
        pageSize: action.payload.pageSize || 10,
      };
      state.error = null;
    },
    fetchProjectsSuccess: (
      state,
      action: PayloadAction<PageResponse<Project>>,
    ) => {
      state.projects = action.payload;
      state.loading = false;
    },
    fetchProjectsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchProjectRequest: (
      state,
      action: PayloadAction<FetchProjectRequestPayload>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    fetchProjectSuccess: (state, action: PayloadAction<Project>) => {
      state.currentProject = action.payload;
      state.loading = false;
    },
    fetchProjectFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    createProjectRequest: (
      state,
      action: PayloadAction<CreateProjectRequestPayload>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    createProjectSuccess: (state) => {
      state.loading = false;
    },
    createProjectFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProjectRequest: (
      state,
      action: PayloadAction<UpdateProjectRequestPayload>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    updateProjectSuccess: (state) => {
      state.loading = false;
    },
    updateProjectFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteProjectRequest: (
      state: ProjectState,
      action: PayloadAction<DeleteProjectRequestPayload>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    deleteProjectSuccess: (state) => {
      state.loading = false;
    },
    deleteProjectFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchProjectsRequest,
  createProjectRequest,
  createProjectSuccess,
  deleteProjectSuccess,
  deleteProjectFailure,
  fetchProjectFailure,
  deleteProjectRequest,
  updateProjectFailure,
  createProjectFailure,
  fetchProjectsSuccess,
  updateProjectRequest,
  updateProjectSuccess,
  fetchProjectSuccess,
  fetchProjectsFailure,
  fetchProjectRequest,
} = projectSlice.actions;

export const ProjectReducer = projectSlice.reducer;
