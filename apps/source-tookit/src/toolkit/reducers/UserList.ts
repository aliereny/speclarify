import { GET_USER_LIST } from '@crema/constants/ActionTypes';
import { UserList } from '@crema/models/Apps';
import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState: {
  usersList: UserList[];
} = {
  usersList: [],
};

export const GetUserListAction = createAction<UserList[]>(GET_USER_LIST);

const userListReducer = createReducer(initialState, (builder) => {
  builder.addCase(GetUserListAction, (state, action) => {
    state.usersList = action.payload;
  });
});

export default userListReducer;
