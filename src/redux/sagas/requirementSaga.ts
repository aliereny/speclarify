import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import {
  clearError,
  createRequirementFailure,
  createRequirementRequest,
  CreateRequirementRequestPayload,
  createRequirementSuccess,
  deleteRequirementFailure,
  deleteRequirementRequest,
  DeleteRequirementRequestPayload,
  deleteRequirementSuccess,
  exportRequirementsFailure,
  exportRequirementsRequest,
  ExportRequirementsRequestPayload,
  exportRequirementsSuccess,
  fetchRequirementFailure,
  fetchRequirementRequest,
  FetchRequirementRequestPayload,
  fetchRequirementsFailure,
  fetchRequirementsRequest,
  FetchRequirementsRequestPayload,
  fetchRequirementsSuccess,
  fetchRequirementSuccess,
  Requirement,
  updateRequirementFailure,
  updateRequirementRequest,
  UpdateRequirementRequestPayload,
  updateRequirementSuccess,
} from "@/redux/slices/requirementSlice";
import { AxiosResponse } from "axios";
import { ApiResponse, PageResponse } from "@/redux/types";
import { errorMessage, navigateOutsideJSX } from "@/redux/utils";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiClient } from "@/redux/api/apiClient";
import { message } from "antd";

function* fetchRequirementsSaga(
  action: PayloadAction<FetchRequirementsRequestPayload>,
) {
  try {
    const response: AxiosResponse<ApiResponse<PageResponse<Requirement>>> =
      yield call(
        ApiClient.get,
        `/organizations/${action.payload.orgPath}/projects/${action.payload.projectPath}/requirements`,
        {
          params: action.payload,
        },
      );
    yield put(fetchRequirementsSuccess(response.data.data));
  } catch (e) {
    yield put(fetchRequirementsFailure(errorMessage(e)));
  }
}

function* watchFetchRequirements() {
  yield takeLatest(fetchRequirementsRequest.type, fetchRequirementsSaga);
}

function* fetchRequirementSaga(
  action: PayloadAction<FetchRequirementRequestPayload>,
) {
  try {
    const response: AxiosResponse<ApiResponse<Requirement>> = yield call(
      ApiClient.get,
      `/organizations/${action.payload.orgPath}/projects/${action.payload.projectPath}/requirements/${action.payload.requirementId}`,
    );
    yield put(fetchRequirementSuccess(response.data.data));
  } catch (e) {
    yield put(fetchRequirementFailure(errorMessage(e)));
  }
}

function* watchFetchRequirement() {
  yield takeLatest(fetchRequirementRequest.type, fetchRequirementSaga);
}

function* createRequirementSaga(
  action: PayloadAction<CreateRequirementRequestPayload>,
) {
  try {
    const { orgPath, projectPath, ...data } = action.payload;
    yield call(
      ApiClient.post,
      `/organizations/${orgPath}/projects/${projectPath}/requirements`,
      data,
    );
    yield put(createRequirementSuccess());
    yield call(
      navigateOutsideJSX,
      `/organizations/${orgPath}/projects/${projectPath}/requirements`,
    );
  } catch (e) {
    yield put(createRequirementFailure(errorMessage(e)));
  }
}

function* watchCreateRequirement() {
  yield takeLatest(createRequirementRequest.type, createRequirementSaga);
}

function* updateRequirementSaga(
  action: PayloadAction<UpdateRequirementRequestPayload>,
) {
  try {
    const { orgPath, projectPath, ...data } = action.payload;
    yield call(
      ApiClient.put,
      `/organizations/${orgPath}/projects/${projectPath}/requirements/${action.payload.requirementId}`,
      data,
    );
    yield put(updateRequirementSuccess());
    yield call(
      navigateOutsideJSX,
      `/organizations/${action.payload.orgPath}/projects/${action.payload.projectPath}/requirements/${action.payload.requirementId}`,
    );
  } catch (e) {
    yield put(updateRequirementFailure(errorMessage(e)));
  }
}

function* watchUpdateRequirement() {
  yield takeLatest(updateRequirementRequest.type, updateRequirementSaga);
}

function* deleteRequirementSaga(
  action: PayloadAction<DeleteRequirementRequestPayload>,
) {
  try {
    yield call(
      ApiClient.delete,
      `/organizations/${action.payload.orgPath}/projects/${action.payload.projectPath}/requirements/${action.payload.requirementId}`,
    );
    yield put(deleteRequirementSuccess());
    yield put(
      fetchRequirementsRequest({
        orgPath: action.payload.orgPath,
        projectPath: action.payload.projectPath,
        pageNumber: 1,
        pageSize: 10,
      }),
    );
    yield call(
      navigateOutsideJSX,
      `/organizations/${action.payload.orgPath}/projects/${action.payload.projectPath}/requirements`,
    );
  } catch (e) {
    yield put(deleteRequirementFailure(errorMessage(e)));
  }
}

function* watchDeleteRequirement() {
  yield takeLatest(deleteRequirementRequest.type, deleteRequirementSaga);
}

function* exportRequirementsSaga(
  action: PayloadAction<ExportRequirementsRequestPayload>,
) {
  try {
    const response: AxiosResponse<ApiResponse<string>> = yield call(
      ApiClient.get,
      `/organizations/${action.payload.orgPath}/projects/${action.payload.projectPath}/requirements/export`,
    );
    yield put(exportRequirementsSuccess(response.data.data));
  } catch (e) {
    yield put(deleteRequirementFailure(errorMessage(e)));
  }
}

function* watchExportRequirement() {
  yield takeLatest(exportRequirementsRequest.type, exportRequirementsSaga);
}

function* errorHandlerSaga(action: PayloadAction<string>) {
  yield call(message.error, action.payload);
  yield put(clearError());
}

function* watchErrorHandler() {
  yield takeLatest(
    [
      fetchRequirementsFailure.type,
      fetchRequirementFailure.type,
      createRequirementFailure.type,
      updateRequirementFailure.type,
      deleteRequirementFailure.type,
      exportRequirementsFailure.type,
    ],
    errorHandlerSaga,
  );
}

export function* requirementSaga() {
  yield all([
    watchCreateRequirement(),
    watchFetchRequirement(),
    watchDeleteRequirement(),
    watchFetchRequirements(),
    watchUpdateRequirement(),
    watchExportRequirement(),
    watchErrorHandler(),
  ]);
}
