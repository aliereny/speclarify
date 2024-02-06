import { RcFile } from "antd/lib/upload/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DocumentType {
  id: string;
  createdAt: string;
  url: string;
  name: string;
}

export interface DocumentState {
  documents: DocumentType[];
  loading: boolean;
  error: string | null;
}

const initialState: DocumentState = {
  documents: [],
  loading: false,
  error: null,
};

export interface FetchDocumentsRequestPayload {
  orgPath: string;
  projectPath: string;
}

export interface CreateDocumentRequestPayload {
  orgPath: string;
  projectPath: string;
  file: RcFile;
}

export interface DeleteDocumentRequestPayload {
  orgPath: string;
  projectPath: string;
  documentId: string;
}

const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    fetchDocumentsRequest: (
      state,
      action: PayloadAction<FetchDocumentsRequestPayload>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    fetchDocumentsSuccess: (state, action: PayloadAction<DocumentType[]>) => {
      state.documents = action.payload;
      state.loading = false;
    },
    fetchDocumentsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    createDocumentRequest: (
      state,
      action: PayloadAction<CreateDocumentRequestPayload>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    createDocumentSuccess: (state) => {
      state.loading = false;
    },
    createDocumentFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteDocumentRequest: (
      state,
      action: PayloadAction<DeleteDocumentRequestPayload>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    deleteDocumentSuccess: (state) => {
      state.loading = false;
    },
    deleteDocumentFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchDocumentsRequest,
  fetchDocumentsSuccess,
  fetchDocumentsFailure,
  createDocumentRequest,
  createDocumentSuccess,
  createDocumentFailure,
  deleteDocumentRequest,
  deleteDocumentSuccess,
  deleteDocumentFailure,
} = documentSlice.actions;

export const DocumentReducer = documentSlice.reducer;
