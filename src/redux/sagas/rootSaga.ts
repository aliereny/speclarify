import { all } from '@redux-saga/core/effects';
import { userSaga } from './userSaga';
import { organizationSaga } from '@/redux/sagas/organizationSaga';
import { projectSaga } from '@/redux/sagas/projectSaga';
import { organizationMemberSaga } from '@/redux/sagas/organizationMemberSaga';

export function* RootSaga() {
  yield all([
    userSaga(),
    organizationSaga(),
    projectSaga(),
    organizationMemberSaga(),
  ]);
}