import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PageResponse } from "@/redux/types";

export enum Priority {
  Optional = "Optional",
  Low = "Low",
  Medium = "Medium",
  High = "High",
  Critical = "Critical",
}

export enum RequirementType {
  FunctionalPerformance = "Functional/Performance",
  Interface = "Interface",
  Process = "Process",
  Quality = "Quality (Non-Functional)",
  Usability = "Usability/Quality-in-Use",
  HumanFactors = "Human Factors",
}

export interface Requirement {
  id: string;
  createdAt: string;
  identifier: string;
  description: string;
  priority: Priority;
  type: RequirementType;
}

export interface RequirementState {
  requirements: PageResponse<Requirement>;
  currentRequirement: Requirement | null;
  loading: boolean;
  error: string | null;
  exportUrl: string | null;
}

const initialState: RequirementState = {
  requirements: {
    items: [],
    totalItems: 0,
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
  },
  currentRequirement: null,
  loading: false,
  error: null,
  exportUrl: null,
};

export interface FetchRequirementsRequestPayload {
  search?: string;
  pageNumber?: number;
  pageSize?: number;
  orgPath: string;
  projectPath: string;
}

export interface CreateRequirementRequestPayload {
  identifier: string;
  description: string;
  orgPath: string;
  projectPath: string;
}

export interface UpdateRequirementRequestPayload {
  identifier: string;
  description: string;
  orgPath: string;
  projectPath: string;
  requirementId: string;
  priority: Priority;
  type: RequirementType;
}

export interface FetchRequirementRequestPayload {
  orgPath: string;
  projectPath: string;
  requirementId: string;
}

export interface DeleteRequirementRequestPayload {
  orgPath: string;
  projectPath: string;
  requirementId: string;
}

export interface ExportRequirementsRequestPayload {
  orgPath: string;
  projectPath: string;
}

const requirementSlice = createSlice({
  name: "requirement",
  initialState,
  reducers: {
    fetchRequirementsRequest: (
      state,
      action: PayloadAction<FetchRequirementsRequestPayload>,
    ) => {
      state.loading = true;
      state.requirements = {
        ...state.requirements,
        currentPage: action.payload.pageNumber || 1,
        pageSize: action.payload.pageSize || 10,
      };
      state.error = null;
    },
    fetchRequirementsSuccess: (
      state,
      action: PayloadAction<PageResponse<Requirement>>,
    ) => {
      state.requirements = action.payload;
      state.loading = false;
    },
    fetchRequirementsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchRequirementRequest: (
      state,
      action: PayloadAction<FetchRequirementRequestPayload>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    fetchRequirementSuccess: (state, action: PayloadAction<Requirement>) => {
      state.currentRequirement = action.payload;
      state.loading = false;
    },
    fetchRequirementFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    createRequirementRequest: (
      state,
      action: PayloadAction<CreateRequirementRequestPayload>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    createRequirementSuccess: (state) => {
      state.loading = false;
    },
    createRequirementFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateRequirementRequest: (
      state,
      action: PayloadAction<UpdateRequirementRequestPayload>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    updateRequirementSuccess: (state) => {
      state.loading = false;
    },
    updateRequirementFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteRequirementRequest: (
      state: RequirementState,
      action: PayloadAction<DeleteRequirementRequestPayload>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    deleteRequirementSuccess: (state) => {
      state.loading = false;
    },
    deleteRequirementFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    exportRequirementsRequest: (
      state,
      action: PayloadAction<ExportRequirementsRequestPayload>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    exportRequirementsSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.exportUrl = action.payload;
    },
    exportRequirementsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchRequirementsRequest,
  createRequirementRequest,
  createRequirementSuccess,
  deleteRequirementSuccess,
  deleteRequirementFailure,
  fetchRequirementFailure,
  deleteRequirementRequest,
  updateRequirementFailure,
  createRequirementFailure,
  fetchRequirementsSuccess,
  updateRequirementRequest,
  updateRequirementSuccess,
  fetchRequirementSuccess,
  fetchRequirementsFailure,
  fetchRequirementRequest,
  exportRequirementsSuccess,
  exportRequirementsRequest,
  exportRequirementsFailure,
  clearError,
} = requirementSlice.actions;

export const RequirementReducer = requirementSlice.reducer;
