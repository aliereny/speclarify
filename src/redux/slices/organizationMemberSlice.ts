import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PageResponse } from "@/redux/types";
import { User } from "@/redux/slices/userSlice";

export enum OrganizationRole {
  Owner = "owner",
  Admin = "admin",
  Editor = "editor",
  Viewer = "viewer",
}

export interface OrganizationMember {
  id: string;
  user: User;
  role: OrganizationRole;
  joinedAt: string;
}

export interface OrganizationMemberState {
  organizationMembers: PageResponse<OrganizationMember>;
  currentOrganizationMember: OrganizationMember | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrganizationMemberState = {
  organizationMembers: {
    items: [],
    totalItems: 0,
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    lastPage: true,
    firstPage: true,
  },
  currentOrganizationMember: null,
  loading: false,
  error: null,
};

export interface FetchOrganizationMembersRequestPayload {
  search?: string;
  pageNumber?: number;
  pageSize?: number;
  orgPath: string;
}

export interface CreateOrganizationMemberRequestPayload {
  email: string;
  role: OrganizationRole;
  orgPath: string;
}

export interface UpdateOrganizationMemberRequestPayload {
  memberId: string;
  orgPath: string;
  role: OrganizationRole;
}

export interface FetchOrganizationMemberRequestPayload {
  orgPath: string;
  memberId: string;
}

export interface DeleteOrganizationMemberRequestPayload {
  orgPath: string;
  memberId: string;
}

const organizationMemberSlice = createSlice({
  name: "organizationMember",
  initialState,
  reducers: {
    fetchOrganizationMembersRequest: (
      state,
      action: PayloadAction<FetchOrganizationMembersRequestPayload>,
    ) => {
      state.loading = true;
      state.organizationMembers = {
        ...state.organizationMembers,
        currentPage: action.payload.pageNumber || 1,
        pageSize: action.payload.pageSize || 10,
      };
      state.error = null;
    },
    fetchOrganizationMembersSuccess: (
      state,
      action: PayloadAction<PageResponse<OrganizationMember>>,
    ) => {
      state.organizationMembers = action.payload;
      state.loading = false;
    },
    fetchOrganizationMembersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchOrganizationMemberRequest: (
      state,
      action: PayloadAction<FetchOrganizationMemberRequestPayload>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    fetchOrganizationMemberSuccess: (
      state,
      action: PayloadAction<OrganizationMember>,
    ) => {
      state.currentOrganizationMember = action.payload;
      state.loading = false;
    },
    fetchOrganizationMemberFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    createOrganizationMemberRequest: (
      state,
      action: PayloadAction<CreateOrganizationMemberRequestPayload>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    createOrganizationMemberSuccess: (state) => {
      state.loading = false;
    },
    createOrganizationMemberFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateOrganizationMemberRequest: (
      state,
      action: PayloadAction<UpdateOrganizationMemberRequestPayload>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    updateOrganizationMemberSuccess: (state) => {
      state.loading = false;
    },
    updateOrganizationMemberFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteOrganizationMemberRequest: (
      state: OrganizationMemberState,
      action: PayloadAction<DeleteOrganizationMemberRequestPayload>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    deleteOrganizationMemberSuccess: (state) => {
      state.loading = false;
    },
    deleteOrganizationMemberFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchOrganizationMembersRequest,
  createOrganizationMemberRequest,
  createOrganizationMemberSuccess,
  deleteOrganizationMemberSuccess,
  deleteOrganizationMemberFailure,
  fetchOrganizationMemberFailure,
  deleteOrganizationMemberRequest,
  updateOrganizationMemberFailure,
  createOrganizationMemberFailure,
  fetchOrganizationMembersSuccess,
  updateOrganizationMemberRequest,
  updateOrganizationMemberSuccess,
  fetchOrganizationMemberSuccess,
  fetchOrganizationMembersFailure,
  fetchOrganizationMemberRequest,
  clearError,
} = organizationMemberSlice.actions;

export const OrganizationMemberReducer = organizationMemberSlice.reducer;
