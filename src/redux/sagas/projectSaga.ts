import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import {
  createProjectFailure,
  createProjectRequest,
  CreateProjectRequestPayload,
  createProjectSuccess,
  deleteProjectFailure,
  deleteProjectRequest, DeleteProjectRequestPayload,
  deleteProjectSuccess,
  fetchProjectFailure,
  fetchProjectRequest,
  FetchProjectRequestPayload,
  fetchProjectsFailure,
  fetchProjectsRequest,
  FetchProjectsRequestPayload,
  fetchProjectsSuccess,
  fetchProjectSuccess,
  Project,
  updateProjectFailure,
  updateProjectRequest,
  UpdateProjectRequestPayload,
  updateProjectSuccess,
} from '@/redux/slices/projectSlice';
import jwtAxios from '@crema/services/auth';
import { AxiosResponse } from 'axios';
import { ApiResponse, PageResponse } from '@/redux/types';
import { errorMessage, navigateOutsideJSX } from '@/redux/utils';
import { PayloadAction } from '@reduxjs/toolkit';

export function* fetchProjectsSaga(action: PayloadAction<FetchProjectsRequestPayload>) {
  try {
    const response: AxiosResponse<ApiResponse<PageResponse<Project>>> = yield call(jwtAxios.get, `/organizations/${action.payload.orgPath}/projects`, {
      params: action.payload,
    });
    yield put(fetchProjectsSuccess(response.data.data));
  } catch (e) {
    yield put(fetchProjectsFailure(errorMessage(e)));
  }
}

function* watchFetchProjects() {
  yield takeLatest(fetchProjectsRequest.type, fetchProjectsSaga);
}

export function* fetchProjectSaga(action: PayloadAction<FetchProjectRequestPayload>) {
  try {
    const response: AxiosResponse<ApiResponse<Project>> = yield call(jwtAxios.get, `/organizations/${action.payload.orgPath}/projects/${action.payload.projectPath}`);
    yield put(fetchProjectSuccess(response.data.data));
  } catch (e) {
    yield put(fetchProjectFailure(errorMessage(e)));
  }
}

export function* watchFetchProject() {
  yield takeLatest(fetchProjectRequest.type, fetchProjectSaga);
}

export function* createProjectSaga(action: PayloadAction<CreateProjectRequestPayload>) {
  try {
    const formData = new FormData();
    formData.append('name', action.payload.name);
    formData.append('description', action.payload.description);
    if (action.payload.photo) {
      formData.append('photo', action.payload.photo);
    }
    yield call(jwtAxios.post, `/organizations/${action.payload.orgPath}/projects`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    yield put(createProjectSuccess());
    yield call(navigateOutsideJSX, `/organizations/${action.payload.orgPath}/projects`);
  } catch (e) {
    yield put(createProjectFailure(errorMessage(e)));
  }
}

export function* watchCreateProject() {
  yield takeLatest(createProjectRequest.type, createProjectSaga);
}


export function* updateProjectSaga(action: PayloadAction<UpdateProjectRequestPayload>) {
  try {
    const formData = new FormData();
    formData.append('name', action.payload.name);
    formData.append('description', action.payload.description);
    if (action.payload.photo) {
      formData.append('photo', action.payload.photo);
    }
    yield call(jwtAxios.put, `/organizations/${action.payload.orgPath}/projects/${action.payload.projectPath}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    yield put(updateProjectSuccess());
    yield call(navigateOutsideJSX, `/organizations/${action.payload.orgPath}/projects`);
  } catch (e) {
    yield put(updateProjectFailure(errorMessage(e)));
  }
}

export function* watchUpdateProject() {
  yield takeLatest(updateProjectRequest.type, updateProjectSaga);
}

export function* deleteProjectSaga(action: PayloadAction<DeleteProjectRequestPayload>) {
  try {
    yield call(jwtAxios.delete, `/organizations/${action.payload.orgPath}/projects/${action.payload.projectPath}`);
    yield put(deleteProjectSuccess());
    yield put(fetchProjectsRequest({
      orgPath: action.payload.orgPath,
      pageNumber: 1,
      pageSize: 10,
    }));
  } catch (e) {
    yield put(deleteProjectFailure(errorMessage(e)));
  }
}

export function* watchDeleteProject() {
  yield takeLatest(deleteProjectRequest.type, deleteProjectSaga);
}

export function* projectSaga() {
  yield all([watchCreateProject(), watchFetchProject(), watchDeleteProject(), watchFetchProjects(), watchUpdateProject()]);
}