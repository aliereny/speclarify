import { PayloadAction } from '@reduxjs/toolkit';
import {
  changePasswordFailure,
  changePasswordRequest,
  ChangePasswordRequestPayload,
  changePasswordSuccess,
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
} from '../slices/userSlice';
import { AxiosResponse } from 'axios';
import jwtAxios from '@crema/services/auth';
import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { errorMessage, navigateOutsideJSX } from '../utils';
import { ApiResponse } from '@/redux/types';

function* signInSaga(action: PayloadAction<SignInRequestPayload>) {
  try {
    const response: AxiosResponse<ApiResponse<SignInSuccessPayload>> =
      yield call(jwtAxios.post, '/authentication/sign-in', action.payload);

    yield put(signInSuccess(response.data.data));
  } catch (e) {
    yield put(signInFailure(errorMessage(e)));
  }
}

function* watchSignIn() {
  yield takeLatest(signInRequest.type, signInSaga);
}

function* signUpSaga(action: PayloadAction<SignUpRequestPayload>) {
  try {
    yield call(jwtAxios.post, '/authentication/sign-up', action.payload);

    yield put(signUpSuccess());
    yield call(
      navigateOutsideJSX,
      '/confirm-signup?email=' + action.payload.email,
    );
  } catch (e) {
    yield put(signUpFailure(errorMessage(e)));
  }
}

function* watchSignUp() {
  yield takeLatest(signUpRequest.type, signUpSaga);
}

function* signOutSaga() {
  try {
    yield call(jwtAxios.post, '/authentication/invalidate-token');
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
    formData.append('name', action.payload.name);
    formData.append('email', action.payload.email);
    if (action.payload.photo) {
      formData.append('photo', action.payload.photo);
    }
    yield call(jwtAxios.put, '/users/me', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
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
      jwtAxios.get,
      '/users/me',
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
      yield call(jwtAxios.post, `/authentication/verify-email`, action.payload);
    yield put(verifyEmailSuccess(response.data.data));
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
    > = yield call(jwtAxios.post, '/authentication/refresh-token', {
      refreshToken: action.payload,
    });
    yield put(refreshTokenSuccess(response.data.data.accessToken));
  } catch (e) {
    yield put(refreshTokenFailure(errorMessage(e)));
  }
}

export function* watchRefreshToken() {
  yield takeLatest(refreshTokenRequest.type, refreshTokenSaga);
}

export function* changePasswordSaga(
  action: PayloadAction<ChangePasswordRequestPayload>,
) {
  try {
    const response: AxiosResponse<ApiResponse> = yield call(
      jwtAxios.put,
      `/users/me/password`,
      action.payload,
    );
    yield put(changePasswordSuccess());
    yield put(signOutRequest());
    yield call(navigateOutsideJSX, '/signin');
  } catch (e) {
    yield put(changePasswordFailure(errorMessage(e)));
  }
}

export function* watchChangePassword() {
  yield takeLatest(changePasswordRequest.type, changePasswordSaga);
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
  ]);
}
