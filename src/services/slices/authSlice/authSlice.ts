import {
  getUserApi,
  TRegisterData,
  updateUserApi,
  registerUserApi,
  TLoginData,
  loginUserApi,
  logoutApi,
  TUserResponse
} from '../../../utils/burger-api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthState } from './authSlice.typings';

export const checkedUserAuthThunk = createAsyncThunk(
  'user/checkUser',
  async () => getUserApi()
);

export const updateUserThunk = createAsyncThunk(
  'user/updateUser',
  async ({ email, name, password }: TRegisterData) =>
    await updateUserApi({ email, name, password })
);

export const registerUserThunk = createAsyncThunk(
  'user/registerUser',
  async ({ email, name, password }: TRegisterData) =>
    await registerUserApi({ email, name, password })
);

export const loginUserThunk = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData) =>
    await loginUserApi({ email, password })
);

export const logoutUserThunk = createAsyncThunk(`user/logoutUser`, async () =>
  logoutApi()
);

export const initialState: IAuthState = {
  isAuthed: false,
  isLoading: false,
  user: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectUser: (sliceState: IAuthState) => sliceState.user,
    selectIsAuthed: (sliceState: IAuthState) => sliceState.isAuthed,
    selectUserName: (sliceState: IAuthState) => sliceState.user?.name
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
        state.isAuthed = false;
      })
      .addCase(registerUserThunk.rejected, (state) => {
        state.isLoading = false;
        state.isAuthed = true;
      })
      .addCase(
        registerUserThunk.fulfilled,
        (state, action: PayloadAction<TUserResponse>) => {
          state.isLoading = false;
          state.isAuthed = true;
          state.user = action.payload.user;
        }
      )

      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.isAuthed = false;
      })
      .addCase(loginUserThunk.rejected, (state) => {
        state.isLoading = false;
        state.isAuthed = true;
      })
      .addCase(
        loginUserThunk.fulfilled,
        (state, action: PayloadAction<TUserResponse>) => {
          state.isLoading = false;
          state.isAuthed = true;
          state.user = action.payload.user;
        }
      )

      .addCase(updateUserThunk.pending, (state) => {
        state.isLoading = true;
        state.isAuthed = false;
      })
      .addCase(updateUserThunk.rejected, (state) => {
        state.isLoading = false;
        state.isAuthed = true;
      })
      .addCase(
        updateUserThunk.fulfilled,
        (state, action: PayloadAction<TUserResponse>) => {
          state.isLoading = false;
          state.isAuthed = true;
          state.user = action.payload.user;
        }
      )

      .addCase(checkedUserAuthThunk.pending, (state) => {
        state.isLoading = true;
        state.isAuthed = false;
      })
      .addCase(checkedUserAuthThunk.rejected, (state) => {
        state.isLoading = false;
        state.isAuthed = true;
      })
      .addCase(
        checkedUserAuthThunk.fulfilled,
        (state, action: PayloadAction<TUserResponse>) => {
          state.isLoading = false;
          state.isAuthed = true;
          state.user = action.payload.user;
        }
      )

      .addCase(logoutUserThunk.pending, (state) => {
        state.isLoading = true;
        state.isAuthed = false;
      })
      .addCase(logoutUserThunk.rejected, (state) => {
        state.isLoading = false;
        state.isAuthed = true;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
        state.isAuthed = true;
      });
  }
});

export const { selectUser, selectIsAuthed, selectUserName } =
  userSlice.selectors;
