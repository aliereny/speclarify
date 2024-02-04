import { all } from '@redux-saga/core/effects';
import { userSaga } from './userSaga';
import { organizationSaga } from '@/redux/sagas/organizationSaga';

export function* RootSaga() {
  yield all([
    userSaga(),
    organizationSaga(),
  ]);
}