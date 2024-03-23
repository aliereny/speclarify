import { all } from "@redux-saga/core/effects";
import { userSaga } from "./userSaga";
import { organizationSaga } from "@/redux/sagas/organizationSaga";
import { projectSaga } from "@/redux/sagas/projectSaga";
import { organizationMemberSaga } from "@/redux/sagas/organizationMemberSaga";
import { documentSaga } from "@/redux/sagas/documentSaga";
import { requirementSaga } from "@/redux/sagas/requirementSaga";
import { notificationSaga } from "@/redux/sagas/notificationSaga";

export function* RootSaga() {
  yield all([
    userSaga(),
    organizationSaga(),
    projectSaga(),
    organizationMemberSaga(),
    documentSaga(),
    requirementSaga(),
    notificationSaga(),
  ]);
}
