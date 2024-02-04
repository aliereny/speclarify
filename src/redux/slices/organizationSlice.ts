import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PageResponse } from '@/redux/types';
import { RcFile } from 'antd/lib/upload/interface';

export interface Organization {
  id: string;
  name: string;
  email: string;
  path: string;
  photo?: string;
  createdAt: string;
  address: string;
  phoneNumber: string;
  website: string;
}

export interface OrganizationState {
  organizations: PageResponse<Organization>;
  currentOrganization: Organization | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrganizationState = {
  organizations: {
    items: [],
    totalItems: 0,
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
  },
  currentOrganization: null,
  loading: false,
  error: null,
};

export interface FetchOrganizationsRequestPayload {
  search?: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface CreateOrganizationRequestPayload {
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  website: string;
  photo?: RcFile;
}

export interface UpdateOrganizationRequestPayload {
  path: string;
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  website: string;
  photo?: RcFile;
}

const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
    fetchOrganizationsRequest: (state, action: PayloadAction<FetchOrganizationsRequestPayload>) => {
      state.loading = true;
      state.error = null;
    },
    fetchOrganizationsSuccess: (state, action: PayloadAction<PageResponse<Organization>>) => {
      state.organizations = action.payload;
      state.loading = false;
    },
    fetchOrganizationsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchOrganizationRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    fetchOrganizationSuccess: (state, action: PayloadAction<Organization>) => {
      state.currentOrganization = action.payload;
      state.loading = false;
    },
    fetchOrganizationFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    createOrganizationRequest: (state, action: PayloadAction<CreateOrganizationRequestPayload>) => {
      state.loading = true;
      state.error = null;
    },
    createOrganizationSuccess: (state) => {
      state.loading = false;
    },
    createOrganizationFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateOrganizationRequest: (state, action: PayloadAction<UpdateOrganizationRequestPayload>) => {
      state.loading = true;
      state.error = null;
    },
    updateOrganizationSuccess: (state) => {
      state.loading = false;
    },
    updateOrganizationFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteOrganizationRequest: (state: OrganizationState, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    deleteOrganizationSuccess: (state) => {
      state.loading = false;
    },
    deleteOrganizationFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchOrganizationsRequest,
  createOrganizationRequest,
  createOrganizationSuccess,
  deleteOrganizationSuccess,
  deleteOrganizationFailure,
  fetchOrganizationFailure,
  deleteOrganizationRequest,
  updateOrganizationFailure,
  createOrganizationFailure,
  fetchOrganizationsSuccess,
  updateOrganizationRequest,
  updateOrganizationSuccess,
  fetchOrganizationSuccess,
  fetchOrganizationsFailure,
  fetchOrganizationRequest,
} = organizationSlice.actions;

export const OrganizationReducer = organizationSlice.reducer;