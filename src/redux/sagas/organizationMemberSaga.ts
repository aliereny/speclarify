import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import {
  clearError,
  createOrganizationMemberFailure,
  createOrganizationMemberRequest,
  CreateOrganizationMemberRequestPayload,
  createOrganizationMemberSuccess,
  deleteOrganizationMemberFailure,
  deleteOrganizationMemberRequest,
  DeleteOrganizationMemberRequestPayload,
  deleteOrganizationMemberSuccess,
  fetchOrganizationMemberFailure,
  fetchOrganizationMemberRequest,
  FetchOrganizationMemberRequestPayload,
  fetchOrganizationMembersFailure,
  fetchOrganizationMembersRequest,
  FetchOrganizationMembersRequestPayload,
  fetchOrganizationMembersSuccess,
  fetchOrganizationMemberSuccess,
  OrganizationMember,
  updateOrganizationMemberFailure,
  updateOrganizationMemberRequest,
  UpdateOrganizationMemberRequestPayload,
  updateOrganizationMemberSuccess,
} from "@/redux/slices/organizationMemberSlice";
import { AxiosResponse } from "axios";
import { ApiResponse, PageResponse } from "@/redux/types";
import { errorMessage, navigateOutsideJSX } from "@/redux/utils";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiClient } from "@/redux/api/apiClient";
import { message } from "antd";

export function* fetchOrganizationMembersSaga(
  action: PayloadAction<FetchOrganizationMembersRequestPayload>,
) {
  try {
    const response: AxiosResponse<
      ApiResponse<PageResponse<OrganizationMember>>
    > = yield call(
      ApiClient.get,
      `/organizations/${action.payload.orgPath}/members`,
      {
        params: action.payload,
      },
    );
    yield put(fetchOrganizationMembersSuccess(response.data.data));
  } catch (e) {
    yield put(fetchOrganizationMembersFailure(errorMessage(e)));
  }
}

function* watchFetchOrganizationMembers() {
  yield takeLatest(
    fetchOrganizationMembersRequest.type,
    fetchOrganizationMembersSaga,
  );
}

export function* fetchOrganizationMemberSaga(
  action: PayloadAction<FetchOrganizationMemberRequestPayload>,
) {
  try {
    const response: AxiosResponse<ApiResponse<OrganizationMember>> = yield call(
      ApiClient.get,
      `/organizations/${action.payload.orgPath}/members/${action.payload.memberId}`,
    );
    yield put(fetchOrganizationMemberSuccess(response.data.data));
  } catch (e) {
    yield put(fetchOrganizationMemberFailure(errorMessage(e)));
  }
}

export function* watchFetchOrganizationMember() {
  yield takeLatest(
    fetchOrganizationMemberRequest.type,
    fetchOrganizationMemberSaga,
  );
}

export function* createOrganizationMemberSaga(
  action: PayloadAction<CreateOrganizationMemberRequestPayload>,
) {
  const { orgPath, ...rest } = action.payload;
  try {
    yield call(ApiClient.post, `/organizations/${orgPath}/members`, rest);
    yield put(createOrganizationMemberSuccess());
    yield call(navigateOutsideJSX, `/organizations/${orgPath}/members`);
  } catch (e) {
    yield put(createOrganizationMemberFailure(errorMessage(e)));
  }
}

export function* watchCreateOrganizationMember() {
  yield takeLatest(
    createOrganizationMemberRequest.type,
    createOrganizationMemberSaga,
  );
}

export function* updateOrganizationMemberSaga(
  action: PayloadAction<UpdateOrganizationMemberRequestPayload>,
) {
  const { orgPath, memberId, ...rest } = action.payload;
  try {
    yield call(
      ApiClient.put,
      `/organizations/${orgPath}/members/${memberId}`,
      rest,
    );
    yield put(updateOrganizationMemberSuccess());
    yield call(navigateOutsideJSX, `/organizations/${orgPath}/members`);
  } catch (e) {
    yield put(updateOrganizationMemberFailure(errorMessage(e)));
  }
}

export function* watchUpdateOrganizationMember() {
  yield takeLatest(
    updateOrganizationMemberRequest.type,
    updateOrganizationMemberSaga,
  );
}

export function* deleteOrganizationMemberSaga(
  action: PayloadAction<DeleteOrganizationMemberRequestPayload>,
) {
  try {
    yield call(
      ApiClient.delete,
      `/organizations/${action.payload.orgPath}/members/${action.payload.memberId}`,
    );
    yield put(deleteOrganizationMemberSuccess());
    yield put(
      fetchOrganizationMembersRequest({
        orgPath: action.payload.orgPath,
        pageNumber: 1,
        pageSize: 10,
      }),
    );
  } catch (e) {
    yield put(deleteOrganizationMemberFailure(errorMessage(e)));
  }
}

export function* watchDeleteOrganizationMember() {
  yield takeLatest(
    deleteOrganizationMemberRequest.type,
    deleteOrganizationMemberSaga,
  );
}

export function* errorHandlerSaga(action: PayloadAction<string>) {
  yield call(message.error, action.payload);
  yield put(clearError());
}

export function* watchErrorHandler() {
  yield takeLatest(
    [
      fetchOrganizationMembersFailure.type,
      fetchOrganizationMemberFailure.type,
      createOrganizationMemberFailure.type,
      updateOrganizationMemberFailure.type,
      deleteOrganizationMemberFailure.type,
    ],
    errorHandlerSaga,
  );
}

export function* organizationMemberSaga() {
  yield all([
    watchCreateOrganizationMember(),
    watchFetchOrganizationMember(),
    watchDeleteOrganizationMember(),
    watchFetchOrganizationMembers(),
    watchUpdateOrganizationMember(),
    watchErrorHandler(),
  ]);
}
