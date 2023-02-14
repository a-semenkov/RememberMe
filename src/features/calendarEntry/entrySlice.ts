/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

interface IEntry {
  mood: string | null;
  caption: string | null;
  preview: string | null;
}

const initialState: IEntry = {
  mood: null,
  caption: null,
  preview: null,
};

const entrySlice = createSlice({
  name: 'entry',
  initialState,
  reducers: {
    setCaption: (state, action) => {
      state.caption = action.payload;
    },
    setMood: (state, action) => {
      state.mood = action.payload;
    },
    clearMood: (state) => {
      state.mood = null;
    },

    setPreview: (state, action) => {
      state.preview = action.payload;
    },

    clear: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { clear, setCaption, setMood, clearMood, setPreview } =
  entrySlice.actions;

export default entrySlice.reducer;

export const getEntryState = (state: RootState) => state.entry;

export const getPreview = (state: RootState) => state.entry.preview;

export const getMood = (state: RootState) => state.entry.mood;
export const getCaption = (state: RootState) => state.entry.caption;

export const isEmptyEntryState = (state: RootState) =>
  !Object.values(state.entry).some((i) => i);

export const isEntryFilled = (state: RootState) =>
  Object.values(state.entry).every((i) => i);
