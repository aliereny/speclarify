import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import {
  clearError,
  createOrganizationFailure,
  createOrganizationRequest,
  CreateOrganizationRequestPayload,
  createOrganizationSuccess,
  deleteOrganizationFailure,
  deleteOrganizationRequest,
  deleteOrganizationSuccess,
  fetchOrganizationFailure,
  fetchOrganizationRequest,
  fetchOrganizationsFailure,
  fetchOrganizationsRequest,
  FetchOrganizationsRequestPayload,
  fetchOrganizationsSuccess,
  fetchOrganizationSuccess,
  Organization,
  updateOrganizationFailure,
  updateOrganizationRequest,
  UpdateOrganizationRequestPayload,
  updateOrganizationSuccess,
} from "@/redux/slices/organizationSlice";
import { AxiosResponse } from "axios";
import { ApiResponse, PageResponse } from "@/redux/types";
import { errorMessage, navigateOutsideJSX } from "@/redux/utils";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiClient } from "@/redux/api/apiClient";
import { message } from "antd";

function* fetchOrganizationsSaga(
  action: PayloadAction<FetchOrganizationsRequestPayload>,
) {
  try {
    const response: AxiosResponse<ApiResponse<PageResponse<Organization>>> =
      yield call(ApiClient.get, "/organizations", {
        params: action.payload,
      });
    yield put(fetchOrganizationsSuccess(response.data.data));
  } catch (e) {
    yield put(fetchOrganizationsFailure(errorMessage(e)));
  }
}

function* watchFetchOrganizations() {
  yield takeLatest(fetchOrganizationsRequest.type, fetchOrganizationsSaga);
}

function* fetchOrganizationSaga(action: PayloadAction<string>) {
  try {
    const response: AxiosResponse<ApiResponse<Organization>> = yield call(
      ApiClient.get,
      `/organizations/${action.payload}`,
    );
    yield put(fetchOrganizationSuccess(response.data.data));
  } catch (e) {
    yield put(fetchOrganizationFailure(errorMessage(e)));
  }
}

function* watchFetchOrganization() {
  yield takeLatest(fetchOrganizationRequest.type, fetchOrganizationSaga);
}

function* createOrganizationSaga(
  action: PayloadAction<CreateOrganizationRequestPayload>,
) {
  try {
    const formData = new FormData();
    formData.append("name", action.payload.name);
    formData.append("email", action.payload.email);
    formData.append("address", action.payload.address);
    formData.append("phoneNumber", action.payload.phoneNumber);
    formData.append("website", action.payload.website);
    if (action.payload.photo) {
      formData.append("photo", action.payload.photo);
    }
    yield call(ApiClient.post, "/organizations", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    yield put(createOrganizationSuccess());
    yield call(navigateOutsideJSX, "/organizations");
  } catch (e) {
    yield put(createOrganizationFailure(errorMessage(e)));
  }
}

function* watchCreateOrganization() {
  yield takeLatest(createOrganizationRequest.type, createOrganizationSaga);
}

function* updateOrganizationSaga(
  action: PayloadAction<UpdateOrganizationRequestPayload>,
) {
  try {
    const formData = new FormData();
    formData.append("name", action.payload.name);
    formData.append("email", action.payload.email);
    formData.append("address", action.payload.address);
    formData.append("phoneNumber", action.payload.phoneNumber);
    formData.append("website", action.payload.website);
    if (action.payload.photo) {
      formData.append("photo", action.payload.photo);
    }
    yield call(
      ApiClient.put,
      `/organizations/${action.payload.path}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    yield put(updateOrganizationSuccess());
    yield call(navigateOutsideJSX, "/organizations");
  } catch (e) {
    yield put(updateOrganizationFailure(errorMessage(e)));
  }
}

function* watchUpdateOrganization() {
  yield takeLatest(updateOrganizationRequest.type, updateOrganizationSaga);
}

function* deleteOrganizationSaga(action: PayloadAction<string>) {
  try {
    yield call(ApiClient.delete, `/organizations/${action.payload}`);
    yield put(deleteOrganizationSuccess());
    yield put(
      fetchOrganizationsRequest({
        pageNumber: 1,
        pageSize: 10,
      }),
    );
  } catch (e) {
    yield put(deleteOrganizationFailure(errorMessage(e)));
  }
}

function* watchDeleteOrganization() {
  yield takeLatest(deleteOrganizationRequest.type, deleteOrganizationSaga);
}

function* errorHandlerSaga(action: PayloadAction<string>) {
  yield call(message.error, action.payload);
  yield put(clearError());
}

function* watchErrorHandler() {
  yield takeLatest(
    [
      fetchOrganizationsFailure.type,
      fetchOrganizationFailure.type,
      createOrganizationFailure.type,
      updateOrganizationFailure.type,
      deleteOrganizationFailure.type,
    ],
    errorHandlerSaga,
  );
}

export function* organizationSaga() {
  yield all([
    watchCreateOrganization(),
    watchFetchOrganization(),
    watchDeleteOrganization(),
    watchFetchOrganizations(),
    watchUpdateOrganization(),
    watchErrorHandler(),
  ]);
}
