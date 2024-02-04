import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import {
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
} from '@/redux/slices/organizationSlice';
import jwtAxios from '@crema/services/auth';
import { AxiosResponse } from 'axios';
import { ApiResponse, PageResponse } from '@/redux/types';
import { errorMessage, navigateOutsideJSX } from '@/redux/utils';
import { PayloadAction } from '@reduxjs/toolkit';

export function* fetchOrganizationsSaga(action: PayloadAction<FetchOrganizationsRequestPayload>) {
  try {
    const response: AxiosResponse<ApiResponse<PageResponse<Organization>>> = yield call(jwtAxios.get, '/organizations', {
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

export function* fetchOrganizationSaga(action: PayloadAction<string>) {
  try {
    const response: AxiosResponse<ApiResponse<Organization>> = yield call(jwtAxios.get, `/organizations/${action.payload}`);
    yield put(fetchOrganizationSuccess(response.data.data));
  } catch (e) {
    yield put(fetchOrganizationFailure(errorMessage(e)));
  }
}

export function* watchFetchOrganization() {
  yield takeLatest(fetchOrganizationRequest.type, fetchOrganizationSaga);
}

export function* createOrganizationSaga(action: PayloadAction<CreateOrganizationRequestPayload>) {
  try {
    const formData = new FormData();
    formData.append('name', action.payload.name);
    formData.append('email', action.payload.email);
    formData.append('address', action.payload.address);
    formData.append('phoneNumber', action.payload.phoneNumber);
    formData.append('website', action.payload.website);
    if (action.payload.photo) {
      formData.append('photo', action.payload.photo);
    }
    yield call(jwtAxios.post, '/organizations', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    yield put(createOrganizationSuccess());
    yield call(navigateOutsideJSX, '/organizations');
  } catch (e) {
    yield put(createOrganizationFailure(errorMessage(e)));
  }
}

export function* watchCreateOrganization() {
  yield takeLatest(createOrganizationRequest.type, createOrganizationSaga);
}


export function* updateOrganizationSaga(action: PayloadAction<UpdateOrganizationRequestPayload>) {
  try {
    const formData = new FormData();
    formData.append('name', action.payload.name);
    formData.append('email', action.payload.email);
    formData.append('address', action.payload.address);
    formData.append('phoneNumber', action.payload.phoneNumber);
    formData.append('website', action.payload.website);
    if (action.payload.photo) {
      formData.append('photo', action.payload.photo);
    }
    yield call(jwtAxios.put, `/organizations/${action.payload.path}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    yield put(updateOrganizationSuccess());
    yield call(navigateOutsideJSX, '/organizations');
  } catch (e) {
    yield put(updateOrganizationFailure(errorMessage(e)));
  }
}

export function* watchUpdateOrganization() {
  yield takeLatest(updateOrganizationRequest.type, updateOrganizationSaga);
}

export function* deleteOrganizationSaga(action: PayloadAction<string>) {
  try {
    yield call(jwtAxios.delete, `/organizations/${action.payload}`);
    yield put(deleteOrganizationSuccess());
    yield put(fetchOrganizationsRequest({
      pageNumber: 1,
      pageSize: 10,
    }));
  } catch (e) {
    yield put(deleteOrganizationFailure(errorMessage(e)));
  }
}

export function* watchDeleteOrganization() {
  yield takeLatest(deleteOrganizationRequest.type, deleteOrganizationSaga);
}

export function* organizationSaga() {
  yield all([watchCreateOrganization(), watchFetchOrganization(), watchDeleteOrganization(), watchFetchOrganizations(), watchUpdateOrganization()]);
}