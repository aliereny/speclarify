import createSagaMiddleware from '@redux-saga/core';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootSaga } from './sagas/rootSaga';
import { UserReducer } from './slices/userSlice';

const sagaMiddleware = createSagaMiddleware();

export const AppStore = configureStore({
  reducer: combineReducers({
    user: UserReducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(RootSaga);

export type RootState = ReturnType<typeof AppStore.getState>;
export type AppDispatch = typeof AppStore.dispatch;
export type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


