import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { createSelector } from "reselect";

interface GlobalState {
  language: string;
  theme: string;
}

const initialState: GlobalState = {
  language: "en",
  theme: "light",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setCurrentLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
  },
});

//Selectors
export const getGlobalState = (state: RootState) => state.global;

export const getCurrentLanguage = createSelector(
  getGlobalState,
  (global) => global.language
);

export const getCurrentTheme = createSelector(
  getGlobalState,
  (global) => global.theme
);

export const { setCurrentLanguage, setTheme } = globalSlice.actions;

export default globalSlice.reducer;
