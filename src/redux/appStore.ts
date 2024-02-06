import createSagaMiddleware from "@redux-saga/core";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootSaga } from "./sagas/rootSaga";
import { UserReducer } from "./slices/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { OrganizationReducer } from "@/redux/slices/organizationSlice";
import { ProjectReducer } from "@/redux/slices/projectSlice";
import { OrganizationMemberReducer } from "@/redux/slices/organizationMemberSlice";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage,
};

const combinedReducer = combineReducers({
  user: UserReducer,
  organizations: OrganizationReducer,
  projects: ProjectReducer,
  organizationMembers: OrganizationMemberReducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const AppStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(RootSaga);

export const AppPersistor = persistStore(AppStore);

export type RootState = ReturnType<typeof AppStore.getState>;
export type AppDispatch = typeof AppStore.dispatch;
export type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
