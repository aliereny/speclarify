import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import {
  fetchNotificationsRequest,
  fetchNotificationsSuccess,
  fetchNotificationsFailure,
  updateNotificationStatusRequest,
  updateNotificationStatusSuccess,
  updateNotificationStatusFailure,
  markAllNotificationsAsReadSuccess,
  markAllNotificationsAsReadRequest,
  markAllNotificationsAsReadFailure,
  clearNotifications,
  FetchNotificationsRequestPayload,
  Notification,
  UpdateNotificationStatusRequestPayload,
} from "../slices/notificationSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse, PageResponse } from "@/redux/types";
import { AxiosResponse } from "axios";
import { ApiClient } from "@/redux/api/apiClient";
import { errorMessage } from "@/redux/utils";

function* fetchNotificationsSaga(
  action: PayloadAction<FetchNotificationsRequestPayload>,
) {
  try {
    const response: AxiosResponse<ApiResponse<PageResponse<Notification>>> =
      yield call(ApiClient.get, `/notifications`, {
        params: action.payload,
      });
    yield put(fetchNotificationsSuccess(response.data.data));
  } catch (e) {
    yield put(fetchNotificationsFailure(errorMessage(e)));
  }
}

function* watchFetchNotifications() {
  yield takeLatest(fetchNotificationsRequest.type, fetchNotificationsSaga);
}

function* updateNotificationStatusSaga({
  payload: { status, id },
}: PayloadAction<UpdateNotificationStatusRequestPayload>) {
  try {
    yield call(ApiClient.put, `/notifications/${id}/status`, {
      status,
    });
    yield put(
      updateNotificationStatusSuccess({
        status,
        id,
      }),
    );
  } catch (e) {
    yield put(updateNotificationStatusFailure(errorMessage(e)));
  }
}

function* watchUpdateNotificationStatus() {
  yield takeLatest(
    updateNotificationStatusRequest.type,
    updateNotificationStatusSaga,
  );
}

function* markAllNotificationsAsReadSaga() {
  try {
    yield call(ApiClient.put, `/notifications/mark-all-as-read`);
    yield put(markAllNotificationsAsReadSuccess());
  } catch (e) {
    yield put(markAllNotificationsAsReadFailure(errorMessage(e)));
  }
}

function* watchMarkAllNotificationsAsRead() {
  yield takeLatest(
    markAllNotificationsAsReadRequest.type,
    markAllNotificationsAsReadSaga,
  );
}

export function* notificationSaga() {
  yield all([
    watchFetchNotifications(),
    watchUpdateNotificationStatus(),
    watchMarkAllNotificationsAsRead(),
  ]);
}
