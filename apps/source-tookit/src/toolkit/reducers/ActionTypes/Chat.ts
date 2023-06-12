import {
  ADD_NEW_MESSAGE,
  DELETE_MESSAGE,
  DELETE_USER_MESSAGES,
  EDIT_MESSAGE,
  GET_CONNECTIONS_LIST,
  GET_USER_MESSAGES,
  SELECT_USER,
  TOGGLE_CHAT_DRAWER,
} from '@crema/actions/Chat.actions';
import { ConnectionObjType, MessageObjType } from '@crema/models/apps/Chat';
import { createAction } from '@reduxjs/toolkit';

export const ConnectionListAction =
  createAction<ConnectionObjType[]>(GET_CONNECTIONS_LIST);

export const ToggleDrawerAction = createAction(TOGGLE_CHAT_DRAWER);

export const GetUserAction = createAction<MessageObjType>(GET_USER_MESSAGES);

export const AddNewAction = createAction<{
  data: {
    connectionData: ConnectionObjType;
    userMessages: MessageObjType;
  };
}>(ADD_NEW_MESSAGE);

export const EditAction = createAction<{
  data: {
    connectionData: ConnectionObjType;
    userMessages: MessageObjType;
  };
}>(EDIT_MESSAGE);

export const DeleteAction = createAction<{
  connectionData: ConnectionObjType;
  userMessages: MessageObjType;
}>(DELETE_MESSAGE);

export const DeleteUserAction =
  createAction<ConnectionObjType>(DELETE_USER_MESSAGES);

export const SelectAction = createAction<ConnectionObjType>(SELECT_USER);
