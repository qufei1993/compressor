import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Theme } from '../../constants';
import { darkTheme, lightTheme } from '../../styles/theme.css';
import { TThemeName } from '../../types';

type TTheme = {
  name: TThemeName;
  customTheme: typeof darkTheme | typeof lightTheme;
};
const initialState: TTheme = {
  name: Theme.Light,
  customTheme: lightTheme,
};

export const themeSlice = createSlice({
  name: 'theme',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    update: (state: TTheme) => {
      const themeName = state.name;

      if (themeName === Theme.Light) {
        state.name = Theme.Dark;
        state.customTheme = darkTheme;
      } else {
        state.name = Theme.Light;
        state.customTheme = lightTheme;
      }
    },
    updateByThemeName: (state: TTheme, action: PayloadAction<TThemeName>) => {
      const themeName = action.payload;
      state.name = themeName;
      state.customTheme = themeName === Theme.Dark ? darkTheme : lightTheme;
    },
  },
});

export const { update, updateByThemeName } = themeSlice.actions;

export default themeSlice.reducer;
