import { createAction } from '@reduxjs/toolkit';
import {
  CREATE_NEW_TASK,
  GET_TASK_DETAIL,
  GET_TASK_LIST,
  GET_TODO_FOLDER_LIST,
  GET_TODO_LABEL_LIST,
  GET_TODO_PRIORITY_LIST,
  GET_TODO_STAFF_LIST,
  GET_TODO_STATUS_LIST,
  TOGGLE_TODO_DRAWER,
  UPDATE_TASK_DETAIL,
  UPDATE_TASK_FOLDER,
  UPDATE_TASK_LABEL,
  UPDATE_TASK_STARRED_STATUS,
} from '@crema/actions/Todo.action';
import {
  FolderObjType,
  LabelObjType,
  PriorityObjType,
  StaffObjType,
  StatusObjType,
  TodoObjType,
} from '@crema/models/apps/Todo';

export const GetTaskListAction = createAction<{
  data: TodoObjType[];
  count: number;
}>(GET_TASK_LIST);

export const GetFolderListAction =
  createAction<FolderObjType[]>(GET_TODO_FOLDER_LIST);

export const TodoToggleDrawerAction = createAction<boolean>(TOGGLE_TODO_DRAWER);

export const GetTodoStatusAction =
  createAction<StatusObjType[]>(GET_TODO_STATUS_LIST);

export const GetTodoLabelAction =
  createAction<LabelObjType[]>(GET_TODO_LABEL_LIST);

export const GetTodoStaffAction =
  createAction<StaffObjType[]>(GET_TODO_STAFF_LIST);

export const GetTodoPriorityAction = createAction<PriorityObjType[]>(
  GET_TODO_PRIORITY_LIST
);

export const CreateTaskAction = createAction<TodoObjType>(CREATE_NEW_TASK);

export const UpdateTaskFolderAction = createAction<{
  data: TodoObjType[];
  count: number;
}>(UPDATE_TASK_FOLDER);

export const UpdateTaskLabelAction =
  createAction<TodoObjType[]>(UPDATE_TASK_LABEL);

export const UpdateTaskStarredAction = createAction<{
  data: TodoObjType[];
  folderName: string;
}>(UPDATE_TASK_STARRED_STATUS);

export const GetTaskAction = createAction<TodoObjType>(GET_TASK_DETAIL);

export const UpdateTaskDetailAction = createAction<{
  data: TodoObjType[];
  task: TodoObjType;
}>(UPDATE_TASK_DETAIL);
