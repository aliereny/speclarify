import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import {
  clearError,
  createProjectFailure,
  createProjectRequest,
  CreateProjectRequestPayload,
  createProjectSuccess,
  deleteProjectFailure,
  deleteProjectRequest,
  DeleteProjectRequestPayload,
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
} from "@/redux/slices/projectSlice";
import { AxiosResponse } from "axios";
import { ApiResponse, PageResponse } from "@/redux/types";
import { errorMessage, navigateOutsideJSX } from "@/redux/utils";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiClient } from "@/redux/api/apiClient";
import { message } from "antd";

function* fetchProjectsSaga(
  action: PayloadAction<FetchProjectsRequestPayload>,
) {
  try {
    const response: AxiosResponse<ApiResponse<PageResponse<Project>>> =
      yield call(
        ApiClient.get,
        `/organizations/${action.payload.orgPath}/projects`,
        {
          params: action.payload,
        },
      );
    yield put(fetchProjectsSuccess(response.data.data));
  } catch (e) {
    yield put(fetchProjectsFailure(errorMessage(e)));
  }
}

function* watchFetchProjects() {
  yield takeLatest(fetchProjectsRequest.type, fetchProjectsSaga);
}

function* fetchProjectSaga(action: PayloadAction<FetchProjectRequestPayload>) {
  try {
    const response: AxiosResponse<ApiResponse<Project>> = yield call(
      ApiClient.get,
      `/organizations/${action.payload.orgPath}/projects/${action.payload.projectPath}`,
    );
    yield put(fetchProjectSuccess(response.data.data));
  } catch (e) {
    yield put(fetchProjectFailure(errorMessage(e)));
  }
}

function* watchFetchProject() {
  yield takeLatest(fetchProjectRequest.type, fetchProjectSaga);
}

function* createProjectSaga(
  action: PayloadAction<CreateProjectRequestPayload>,
) {
  try {
    const formData = new FormData();
    formData.append("name", action.payload.name);
    formData.append("description", action.payload.description);
    if (action.payload.photo) {
      formData.append("photo", action.payload.photo);
    }
    yield call(
      ApiClient.post,
      `/organizations/${action.payload.orgPath}/projects`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    yield put(createProjectSuccess());
    yield call(
      navigateOutsideJSX,
      `/organizations/${action.payload.orgPath}/projects`,
    );
  } catch (e) {
    yield put(createProjectFailure(errorMessage(e)));
  }
}

function* watchCreateProject() {
  yield takeLatest(createProjectRequest.type, createProjectSaga);
}

function* updateProjectSaga(
  action: PayloadAction<UpdateProjectRequestPayload>,
) {
  try {
    const formData = new FormData();
    formData.append("name", action.payload.name);
    formData.append("description", action.payload.description);
    if (action.payload.photo) {
      formData.append("photo", action.payload.photo);
    }
    yield call(
      ApiClient.put,
      `/organizations/${action.payload.orgPath}/projects/${action.payload.projectPath}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    yield put(updateProjectSuccess());
    yield call(
      navigateOutsideJSX,
      `/organizations/${action.payload.orgPath}/projects`,
    );
  } catch (e) {
    yield put(updateProjectFailure(errorMessage(e)));
  }
}

function* watchUpdateProject() {
  yield takeLatest(updateProjectRequest.type, updateProjectSaga);
}

function* deleteProjectSaga(
  action: PayloadAction<DeleteProjectRequestPayload>,
) {
  try {
    yield call(
      ApiClient.delete,
      `/organizations/${action.payload.orgPath}/projects/${action.payload.projectPath}`,
    );
    yield put(deleteProjectSuccess());
    yield put(
      fetchProjectsRequest({
        orgPath: action.payload.orgPath,
        pageNumber: 1,
        pageSize: 10,
      }),
    );
    yield call(
      navigateOutsideJSX,
      `/organizations/${action.payload.orgPath}/projects`,
    );
  } catch (e) {
    yield put(deleteProjectFailure(errorMessage(e)));
  }
}

function* watchDeleteProject() {
  yield takeLatest(deleteProjectRequest.type, deleteProjectSaga);
}

function* errorHandlerSaga(action: PayloadAction<string>) {
  yield call(message.error, action.payload);
  yield put(clearError());
}

function* watchErrorHandler() {
  yield takeLatest(
    [
      fetchProjectsFailure.type,
      fetchProjectFailure.type,
      createProjectFailure.type,
      updateProjectFailure.type,
      deleteProjectFailure.type,
    ],
    errorHandlerSaga,
  );
}

export function* projectSaga() {
  yield all([
    watchCreateProject(),
    watchFetchProject(),
    watchDeleteProject(),
    watchFetchProjects(),
    watchUpdateProject(),
    watchErrorHandler(),
  ]);
}
