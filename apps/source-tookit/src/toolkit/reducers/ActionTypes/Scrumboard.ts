import {
  ADD_BOARD_LIST,
  ADD_LIST_CARD,
  ADD_NEW_BOARD,
  DELETE_BOARD,
  DELETE_LIST,
  DELETE_LIST_CARD,
  EDIT_BOARD_DETAIL,
  EDIT_BOARD_LIST,
  EDIT_LIST_CARD,
  GET_BOARD_DETAIL,
  GET_BOARDS,
  GET_MEMBER_LIST,
  GET_SCRUM_LABEL_LIST,
} from '@crema/actions/Scrumboard.actions';
import {
  BoardObjType,
  LabelObjType,
  MemberObjType,
} from '@crema/models/apps/ScrumbBoard';
import { createAction } from '@reduxjs/toolkit';

export const GetMemberListAction =
  createAction<MemberObjType[]>(GET_MEMBER_LIST);

export const GetScrumLabelAction =
  createAction<LabelObjType[]>(GET_SCRUM_LABEL_LIST);

export const GetBoardsAction = createAction<BoardObjType[]>(GET_BOARDS);

export const GetBoardDetailAction =
  createAction<BoardObjType>(GET_BOARD_DETAIL);

export const AddNewBoardAction = createAction<BoardObjType[]>(ADD_NEW_BOARD);

export const EditBoardDetailAction =
  createAction<BoardObjType>(EDIT_BOARD_DETAIL);

export const DeleteBoardAction = createAction<number>(DELETE_BOARD);

export const DeleteScrumListAction = createAction<BoardObjType>(DELETE_LIST);

export const AddBoardListAction = createAction<BoardObjType>(ADD_BOARD_LIST);

export const EditBoardListAction = createAction<BoardObjType>(EDIT_BOARD_LIST);

export const AddListCardAction = createAction<BoardObjType>(ADD_LIST_CARD);

export const EditListCardAction = createAction<BoardObjType>(EDIT_LIST_CARD);

export const DeleteListCardAction =
  createAction<BoardObjType>(DELETE_LIST_CARD);
