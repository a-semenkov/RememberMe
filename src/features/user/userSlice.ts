/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

interface IUser {
  user: string | null;
  name: string | null;
  photo: string | null;
  id: string | null;
}

const initialState: IUser = {
  user: null,
  name: null,
  photo: null,
  id: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const { id, name, user, photo } = action.payload;
      state.id = id;
      state.user = user;
      state.name = name;
      state.photo = photo;
    },
    logOut: (state) => {
      state.id = null;
      state.user = null;
      state.name = null;
      state.photo = null;
    },
  },
});

export const { login, logOut } = userSlice.actions;

export default userSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.user;
export const getUserId = (state: RootState) => state.user.id || '';

export const userLoggedIn = (state: RootState) => !!state.user.id;
