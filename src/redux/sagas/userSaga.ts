import { PayloadAction } from '@reduxjs/toolkit';
import {
  fetchCurrentUserFailure,
  fetchCurrentUserRequest,
  fetchCurrentUserSuccess,
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
import jwtAxios, { setAuthToken } from '@crema/services/auth';
import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { errorMessage, navigateOutsideJSX } from '../utils';
import { ApiResponse } from '@/redux/types';

function* signInSaga(action: PayloadAction<SignInRequestPayload>) {
  try {
    const response: AxiosResponse<ApiResponse<SignInSuccessPayload>> = yield call(
      jwtAxios.post,
      '/authentication/sign-in',
      action.payload,
    );

    yield put(signInSuccess(response.data.data));
    yield call(setAuthToken, response.data.data.accessToken);
  } catch (e) {
    yield put(signInFailure(errorMessage(e)));
  }
}

export function* watchSignIn() {
  yield takeLatest(signInRequest.type, signInSaga);
}

function* signUpSaga(action: PayloadAction<SignUpRequestPayload>) {
  try {
    yield call(
      jwtAxios.post,
      '/authentication/sign-up',
      action.payload,
    );

    yield put(signUpSuccess());
    yield call(navigateOutsideJSX, '/confirm-signup?email=' + action.payload.email);
  } catch (e) {
    yield put(signUpFailure(errorMessage(e)));
  }
}


export function* watchSignUp() {
  yield takeLatest(signUpRequest.type, signUpSaga);
}

function* signOutSaga() {
  try {
    yield call(jwtAxios.post, '/authentication/invalidate-token');
    yield put(signOutSuccess());
    yield call(setAuthToken, undefined);
  } catch (e) {
    yield put(signOutFailure(errorMessage(e)));
  }
}

export function* watchSignOut() {
  yield takeLatest(signOutRequest.type, signOutSaga);
}

function* updateProfileSaga(action: PayloadAction<UpdateProfileRequestPayload>) {
  try {
    yield call(jwtAxios.put, '/users/me', action.payload);
    yield put(updateProfileSuccess());
  } catch (e) {
    yield put(updateProfileFailure(errorMessage(e)));
  }
}

export function* watchUpdateProfile() {
  yield takeLatest(updateProfileRequest.type, updateProfileSaga);
}

export function* fetchCurrentUserSaga() {
  try {
    const response: AxiosResponse<ApiResponse<User>> = yield call(jwtAxios.get, '/users/me');
    yield put(fetchCurrentUserSuccess(response.data.data));
  } catch (e) {
    yield put(fetchCurrentUserFailure(errorMessage(e)));
  }

}

function* watchFetchCurrentUser() {
  yield takeLatest(fetchCurrentUserRequest.type, fetchCurrentUserSaga);
}

export function* verifyEmailSaga(action: PayloadAction<VerifyEmailRequestPayload>) {
  try {
    const response: AxiosResponse<ApiResponse<SignInSuccessPayload>> = yield call(jwtAxios.post, `/authentication/verify-email`, action.payload);
    yield put(verifyEmailSuccess(response.data.data));
    yield call(setAuthToken, response.data.data.accessToken);
  } catch (e) {
    yield put(verifyEmailFailure(errorMessage(e)));
  }
}

function* watchVerifyEmail() {
  yield takeLatest(verifyEmailRequest.type, verifyEmailSaga);
}

export function* userSaga() {
  yield all([watchSignIn(), watchSignUp(), watchSignOut(), watchUpdateProfile(), watchFetchCurrentUser(), watchVerifyEmail()]);
}