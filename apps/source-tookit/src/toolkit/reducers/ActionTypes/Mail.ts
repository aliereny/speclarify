import { createAction } from '@reduxjs/toolkit';
import {
  CHANGE_READ_STATUS,
  COMPOSE_MAIL,
  GET_CONNECTION_LIST,
  GET_FOLDER_LIST,
  GET_LABEL_LIST,
  GET_MAIL_DETAIL,
  GET_MAIL_LIST,
  NULLIFY_MAIL,
  TOGGLE_MAIL_DRAWER,
  UPDATE_MAIL_FOLDER,
  UPDATE_MAIL_LABEL,
  UPDATE_STARRED_STATUS,
  UPDATED_MAIL_DETAIL,
} from '@crema/actions/Mail.action';
import {
  MailObjType,
  LabelObjType,
  FolderObjType,
  ConnectionObjType,
} from '@crema/models/apps/Mail';

export const GetMailListAction = createAction<{
  data: MailObjType[];
  count: number;
}>(GET_MAIL_LIST);

export const GetFolderListAction =
  createAction<FolderObjType[]>(GET_FOLDER_LIST);

export const ToggleDrawerAction = createAction<boolean>(TOGGLE_MAIL_DRAWER);

export const GetLabelAction = createAction<LabelObjType[]>(GET_LABEL_LIST);

export const GetConnectionAction =
  createAction<ConnectionObjType[]>(GET_CONNECTION_LIST);

export const ComposeMailAction = createAction<{
  pathname: string;
  data: MailObjType;
}>(COMPOSE_MAIL);

export const UpdateMailFolderAction =
  createAction<number[]>(UPDATE_MAIL_FOLDER);

export const UpdateMailLabelAction =
  createAction<MailObjType[]>(UPDATE_MAIL_LABEL);

export const ChangeReadMailAction =
  createAction<MailObjType[]>(CHANGE_READ_STATUS);

export const UpdateStartedAction = createAction<{
  data: MailObjType[];
  folderName: string;
}>(UPDATE_STARRED_STATUS);

export const GetMailAction = createAction<MailObjType>(GET_MAIL_DETAIL);

export const UpdateMailAction = createAction<MailObjType>(UPDATED_MAIL_DETAIL);

export const NullifyMailAction = createAction<MailObjType>(NULLIFY_MAIL);
