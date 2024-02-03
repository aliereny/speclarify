import { all } from '@redux-saga/core/effects';
import { userSaga } from './userSaga';

export function* RootSaga() {
  yield all([
    userSaga(),
  ]);
}