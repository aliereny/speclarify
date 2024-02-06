import { PayloadAction } from "@reduxjs/toolkit";
import {
  changePasswordFailure,
  changePasswordRequest,
  ChangePasswordRequestPayload,
  changePasswordSuccess,
  clearError,
  fetchCurrentUserFailure,
  fetchCurrentUserRequest,
  fetchCurrentUserSuccess,
  refreshTokenFailure,
  refreshTokenRequest,
  refreshTokenSuccess,
  signInFailure,
  signInRequest,
  SignInRequestPayload,
  signInSuccess,
  SignInSuccessPayload,
  signOutFailure,
  signOutRequest,
  signOutSuccess,
  signUpFailure,
  signUpRequest,
  SignUpRequestPayload,
  signUpSuccess,
  updateProfileFailure,
  updateProfileRequest,
  UpdateProfileRequestPayload,
  updateProfileSuccess,
  User,
  verifyEmailFailure,
  verifyEmailRequest,
  VerifyEmailRequestPayload,
  verifyEmailSuccess,
} from "@/redux/slices/userSlice";
import { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import { errorMessage, navigateOutsideJSX } from "../utils";
import { ApiResponse } from "@/redux/types";
import { ApiClient } from "@/redux/api/apiClient";
import { message } from "antd";

function* signInSaga(action: PayloadAction<SignInRequestPayload>) {
  try {
    const response: AxiosResponse<ApiResponse<SignInSuccessPayload>> =
      yield call(ApiClient.post, "/authentication/sign-in", action.payload);

    const { refreshToken, ...rest } = response.data.data;
    yield put(
      signInSuccess(action.payload.rememberMe ? response.data.data : rest),
    );
    yield call(navigateOutsideJSX, "/organizations");
  } catch (e) {
    yield put(signInFailure(errorMessage(e)));
  }
}

function* watchSignIn() {
  yield takeLatest(signInRequest.type, signInSaga);
}

function* signUpSaga(action: PayloadAction<SignUpRequestPayload>) {
  try {
    yield call(ApiClient.post, "/authentication/sign-up", action.payload);

    yield put(signUpSuccess());
    yield call(navigateOutsideJSX, "/email-sent?email=" + action.payload.email);
  } catch (e) {
    yield put(signUpFailure(errorMessage(e)));
  }
}

function* watchSignUp() {
  yield takeLatest(signUpRequest.type, signUpSaga);
}

function* signOutSaga() {
  try {
    yield call(ApiClient.post, "/authentication/invalidate-token");
    yield put(signOutSuccess());
  } catch (e) {
    yield put(signOutFailure(errorMessage(e)));
  }
}

function* watchSignOut() {
  yield takeLatest(signOutRequest.type, signOutSaga);
}

function* updateProfileSaga(
  action: PayloadAction<UpdateProfileRequestPayload>,
) {
  try {
    const formData = new FormData();
    formData.append("name", action.payload.name);
    formData.append("email", action.payload.email);
    if (action.payload.photo) {
      formData.append("photo", action.payload.photo);
    }
    yield call(ApiClient.put, "/users/me", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    yield put(updateProfileSuccess());
    yield put(fetchCurrentUserRequest());
  } catch (e) {
    yield put(updateProfileFailure(errorMessage(e)));
  }
}

function* watchUpdateProfile() {
  yield takeLatest(updateProfileRequest.type, updateProfileSaga);
}

function* fetchCurrentUserSaga() {
  try {
    const response: AxiosResponse<ApiResponse<User>> = yield call(
      ApiClient.get,
      "/users/me",
    );
    yield put(fetchCurrentUserSuccess(response.data.data));
  } catch (e) {
    yield put(fetchCurrentUserFailure(errorMessage(e)));
  }
}

function* watchFetchCurrentUser() {
  yield takeLatest(fetchCurrentUserRequest.type, fetchCurrentUserSaga);
}

function* verifyEmailSaga(action: PayloadAction<VerifyEmailRequestPayload>) {
  try {
    const response: AxiosResponse<ApiResponse<SignInSuccessPayload>> =
      yield call(
        ApiClient.post,
        `/authentication/verify-email`,
        action.payload,
      );
    yield put(verifyEmailSuccess(response.data.data));
    yield call(navigateOutsideJSX, "/organizations");
  } catch (e) {
    yield put(verifyEmailFailure(errorMessage(e)));
  }
}

function* watchVerifyEmail() {
  yield takeLatest(verifyEmailRequest.type, verifyEmailSaga);
}

function* refreshTokenSaga(action: PayloadAction<string>) {
  try {
    const response: AxiosResponse<
      ApiResponse<{
        accessToken: string;
      }>
    > = yield call(ApiClient.post, "/authentication/refresh-token", {
      refreshToken: action.payload,
    });
    yield put(refreshTokenSuccess(response.data.data.accessToken));
  } catch (e) {
    yield put(refreshTokenFailure(errorMessage(e)));
  }
}

function* watchRefreshToken() {
  yield takeLatest(refreshTokenRequest.type, refreshTokenSaga);
}

function* changePasswordSaga(
  action: PayloadAction<ChangePasswordRequestPayload>,
) {
  try {
    const response: AxiosResponse<ApiResponse> = yield call(
      ApiClient.put,
      `/users/me/password`,
      action.payload,
    );
    yield put(changePasswordSuccess());
    yield put(signOutRequest());
    yield call(navigateOutsideJSX, "/signin");
  } catch (e) {
    yield put(changePasswordFailure(errorMessage(e)));
  }
}

function* watchChangePassword() {
  yield takeLatest(changePasswordRequest.type, changePasswordSaga);
}

function* errorHandlerSaga(action: PayloadAction<string>) {
  yield call(message.error, action.payload);
  yield put(clearError());
}

function* watchErrorHandler() {
  yield takeLatest(
    [
      signInFailure.type,
      signUpFailure.type,
      signOutFailure.type,
      updateProfileFailure.type,
      fetchCurrentUserFailure.type,
      verifyEmailFailure.type,
      refreshTokenFailure.type,
      changePasswordFailure.type,
    ],
    errorHandlerSaga,
  );
}

export function* userSaga() {
  yield all([
    watchSignIn(),
    watchSignUp(),
    watchSignOut(),
    watchUpdateProfile(),
    watchFetchCurrentUser(),
    watchVerifyEmail(),
    watchRefreshToken(),
    watchChangePassword(),
    watchErrorHandler(),
  ]);
}
