import {
  userSlice,
  initialState,
  registerUserThunk,
  loginUserThunk,
  updateUserThunk,
  logoutUserThunk,
  checkedUserAuthThunk,
  selectUser,
  selectIsAuthed,
  selectUserName
} from '../services/slices/authSlice/authSlice';
import { TUserResponse } from '../utils/burger-api';

// Тестовые данные
const userMock = {
  email: 'test@example.com',
  name: 'Test User'
};

const userResponseMock: TUserResponse = {
  success: true,
  user: userMock
};

describe('userSlice', () => {
  // Проверка начального состояния
  it('должен вернуть начальное состояние', () => {
    const state = userSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  // Проверка registerUserThunk.pending
  it('должен установить isLoading в true при registerUserThunk.pending', () => {
    const action = { type: registerUserThunk.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.isAuthed).toBe(false);
  });

  // Проверка registerUserThunk.rejected
  it('должен установить isLoading в false и isAuthed в true при registerUserThunk.rejected', () => {
    const action = { type: registerUserThunk.rejected.type };
    const state = userSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.isAuthed).toBe(true);
  });

  // Проверка registerUserThunk.fulfilled
  it('должен загрузить пользователя и установить isAuthed в true при registerUserThunk.fulfilled', () => {
    const action = {
      type: registerUserThunk.fulfilled.type,
      payload: userResponseMock
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.isAuthed).toBe(true);
    expect(state.user).toEqual(userMock);
  });

  // Проверка loginUserThunk.pending
  it('должен установить isLoading в true при loginUserThunk.pending', () => {
    const action = { type: loginUserThunk.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.isAuthed).toBe(false);
  });

  // Проверка loginUserThunk.fulfilled
  it('должен загрузить пользователя и установить isAuthed в true при loginUserThunk.fulfilled', () => {
    const action = {
      type: loginUserThunk.fulfilled.type,
      payload: userResponseMock
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.isAuthed).toBe(true);
    expect(state.user).toEqual(userMock);
  });

  // Проверка updateUserThunk.fulfilled
  it('должен обновить информацию о пользователе при updateUserThunk.fulfilled', () => {
    const action = {
      type: updateUserThunk.fulfilled.type,
      payload: userResponseMock
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.user).toEqual(userMock);
  });

  // Проверка logoutUserThunk.fulfilled
  it('должен сбросить информацию о пользователе при logoutUserThunk.fulfilled', () => {
    const initialStateWithUser = {
      ...initialState,
      user: userMock,
      isAuthed: true
    };

    const action = { type: logoutUserThunk.fulfilled.type };
    const state = userSlice.reducer(initialStateWithUser, action);
    expect(state.user).toBeNull();
    expect(state.isAuthed).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  // Проверка селектора selectUser
  it('должен корректно выбирать пользователя с помощью selectUser', () => {
    const state = { user: { ...initialState, user: userMock } };
    expect(selectUser(state)).toEqual(userMock);
  });

  // Проверка селектора selectIsAuthed
  it('должен корректно возвращать состояние авторизации с помощью selectIsAuthed', () => {
    const state = { user: { ...initialState, isAuthed: true } };
    expect(selectIsAuthed(state)).toBe(true);
  });

  // Проверка селектора selectUserName
  it('должен корректно возвращать имя пользователя с помощью selectUserName', () => {
    const state = { user: { ...initialState, user: userMock } };
    expect(selectUserName(state)).toBe('Test User');
  });
});
