import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import {
  createDocumentFailure,
  createDocumentRequest,
  CreateDocumentRequestPayload,
  createDocumentSuccess,
  deleteDocumentFailure,
  deleteDocumentRequest,
  DeleteDocumentRequestPayload,
  deleteDocumentSuccess,
  DocumentType,
  fetchDocumentsFailure,
  fetchDocumentsRequest,
  FetchDocumentsRequestPayload,
  fetchDocumentsSuccess,
} from "@/redux/slices/documentSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import { clearError } from "@/redux/slices/projectSlice";
import { AxiosResponse } from "axios";
import { ApiResponse } from "@/redux/types";
import { ApiClient } from "@/redux/api/apiClient";
import { errorMessage } from "@/redux/utils";

function* createDocumentSaga(
  action: PayloadAction<CreateDocumentRequestPayload>,
) {
  try {
    const formData = new FormData();
    formData.append("file", action.payload.file);
    yield call(
      ApiClient.post,
      `/organizations/${action.payload.orgPath}/projects/${action.payload.projectPath}/documents`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    yield put(createDocumentSuccess());
  } catch (e) {
    yield put(createDocumentFailure(errorMessage(e)));
  }
}

function* watchCreateDocument() {
  yield takeLatest(createDocumentRequest.type, createDocumentSaga);
}

function* deleteDocumentSaga(
  action: PayloadAction<DeleteDocumentRequestPayload>,
) {
  try {
    yield call(
      ApiClient.delete,
      `/organizations/${action.payload.orgPath}/projects/${action.payload.projectPath}/documents/${action.payload.documentId}`,
    );
    yield put(deleteDocumentSuccess());
    yield put(
      fetchDocumentsRequest({
        orgPath: action.payload.orgPath,
        projectPath: action.payload.projectPath,
      }),
    );
  } catch (e) {
    yield put(deleteDocumentFailure(errorMessage(e)));
  }
}

function* watchDeleteDocument() {
  yield takeLatest(deleteDocumentRequest.type, deleteDocumentSaga);
}

function* fetchDocumentsSaga(
  action: PayloadAction<FetchDocumentsRequestPayload>,
) {
  try {
    const response: AxiosResponse<ApiResponse<DocumentType[]>> = yield call(
      ApiClient.get,
      `/organizations/${action.payload.orgPath}/projects/${action.payload.projectPath}/documents`,
    );
    yield put(fetchDocumentsSuccess(response.data.data));
  } catch (e) {
    yield put(fetchDocumentsFailure(errorMessage(e)));
  }
}

function* watchGetDocuments() {
  yield takeLatest(fetchDocumentsRequest.type, fetchDocumentsSaga);
}

function* errorHandlerSaga(action: PayloadAction<string>) {
  yield call(message.error, action.payload);
  yield put(clearError());
}

function* watchErrorHandler() {
  yield takeLatest(
    [
      fetchDocumentsFailure.type,
      createDocumentFailure.type,
      deleteDocumentFailure.type,
    ],
    errorHandlerSaga,
  );
}

export function* documentSaga() {
  yield all([
    watchCreateDocument(),
    watchDeleteDocument(),
    watchGetDocuments(),
    watchErrorHandler(),
  ]);
}
