import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  CurrentUserResponse,
  fetchCurrentUser as apiFetchCurrentUser,
  forgetPassword as apiforgetPassword,
  ForgetPasswordPayload,
  login,
  LoginPayload,
  logout,
  singup,
  SingupPayload,
  User,
  sendPasswordResetOTP,
} from 'src/entities/User';

export interface AuthState {
  user?: User;
  error?: string;
  isLoggingIn: boolean;
  isFetchingUser: boolean;
}

export const singupUserAction = createAsyncThunk<
  User,
  SingupPayload,
  { rejectValue: Error; state: AuthState }
>('auth/register', (payload) => {
  return singup(payload);
});

export const loginUserAction = createAsyncThunk<
  User,
  LoginPayload,
  { rejectValue: Error; state: AuthState }
>('auth/login', (payload) => {
  return login(payload);
});

export const logoutUserAction = createAsyncThunk<
  undefined,
  undefined,
  { rejectValue: Error; state: AuthState }
>('auth/logout', logout);

export const fetchCurrentUser = createAsyncThunk<
  CurrentUserResponse,
  undefined,
  { rejectValue: Error; state: AuthState }
>('auth/fetchCurrentUser', apiFetchCurrentUser);

export const sendPasswordResetOTPAction = createAsyncThunk<undefined, string>(
  'auth/sendPasswordResetOTP',
  sendPasswordResetOTP,
);

export const forgetPasswordAction = createAsyncThunk<undefined, ForgetPasswordPayload>(
  'auth/forgetPassword',
  apiforgetPassword,
);

const initialState: AuthState = {
  isFetchingUser: true,
  isLoggingIn: false,
};

export default createSlice({
  extraReducers: (builder) => {
    builder.addCase(singupUserAction.pending, (state) => {
      state.isLoggingIn = true;
    });

    builder.addCase(singupUserAction.rejected, (state, { payload }) => {
      state.isLoggingIn = false;
      state.error = payload?.message;
    });

    builder.addCase(singupUserAction.fulfilled, (state, { payload }) => {
      state.isLoggingIn = false;
      state.user = payload;
    });

    builder.addCase(loginUserAction.pending, (state) => {
      state.isLoggingIn = true;
    });

    builder.addCase(loginUserAction.rejected, (state, { payload }) => {
      state.isLoggingIn = false;
      state.error = payload?.message;
    });

    builder.addCase(loginUserAction.fulfilled, (state, { payload }) => {
      state.isLoggingIn = false;
      state.user = payload;
    });

    builder.addCase(logoutUserAction.fulfilled, () => {
      return initialState;
    });

    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.isFetchingUser = true;
    });

    builder.addCase(fetchCurrentUser.rejected, (state, { payload }) => {
      state.isFetchingUser = false;
      state.error = payload?.message;
    });

    builder.addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
      state.isFetchingUser = false;
      state.user = payload.user;
    });
  },
  initialState,
  name: 'auth',
  reducers: {},
});
