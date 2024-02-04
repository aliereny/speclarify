import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
  isVerified: boolean;
  photo?: string;
}

export interface UserState {
  accessToken: string | null;
  refreshToken: string | null;
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  accessToken: null,
  refreshToken: null,
  currentUser: null,
  loading: false,
  error: null,
};

export interface SignInRequestPayload {
  email: string;
  password: string;
}

export interface SignInSuccessPayload {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface SignUpRequestPayload {
  email: string;
  password: string;
  name: string;
  photo?: Blob;
}

export interface UpdateProfileRequestPayload {
  name: string;
  photo?: Blob;
}

export interface VerifyEmailRequestPayload {
  email: string;
  code: string;
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInRequest: (state, action: PayloadAction<SignInRequestPayload>) => {
      state.loading = true;
    },
    signInSuccess: (state, action: PayloadAction<SignInSuccessPayload>) => {
      state.loading = false;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.currentUser = action.payload.user;
    },
    signInFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    signUpRequest: (state, action: PayloadAction<SignUpRequestPayload>) => {
      state.loading = true;
    },
    signUpSuccess: (state) => {
      state.loading = false;
    },
    signUpFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOutRequest: (state) => {
      state.loading = true;
    },
    signOutSuccess: (state) => {
      state.loading = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.currentUser = null;
    },
    signOutFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfileRequest: (state, action: PayloadAction<UpdateProfileRequestPayload>) => {
      state.loading = true;
    },
    updateProfileSuccess: (state) => {
      state.loading = false;
    },
    updateProfileFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchCurrentUserRequest: (state) => {
      state.loading = true;
    },
    fetchCurrentUserSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    fetchCurrentUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    verifyEmailRequest: (state, action: PayloadAction<VerifyEmailRequestPayload>) => {
      state.loading = true;
    },
    verifyEmailSuccess: (state, action: PayloadAction<SignInSuccessPayload>) => {
      state.loading = false;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.currentUser = action.payload.user;
    },
    verifyEmailFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    refreshTokenRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
    },
    refreshTokenSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.accessToken = action.payload;
    },
    refreshTokenFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  signInRequest,
  signInSuccess,
  signInFailure,
  signOutRequest,
  signOutSuccess,
  signOutFailure,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
  fetchCurrentUserRequest,
  fetchCurrentUserSuccess,
  fetchCurrentUserFailure,
  verifyEmailRequest,
  verifyEmailSuccess,
  verifyEmailFailure,
  refreshTokenRequest,
  refreshTokenSuccess,
  refreshTokenFailure,
} = userSlice.actions;

export const UserReducer = userSlice.reducer;