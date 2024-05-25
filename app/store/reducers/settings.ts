import {createSlice} from '@reduxjs/toolkit';

import {i18next} from '@/lang';

interface ISettingsState {
  language: string;
  theme: 'light' | 'dark';
  appLoader: boolean;
  bottomTabDisplay: boolean;
  connectedPrinter?: string;
  pairedAddress?: string;
}

const initialState: ISettingsState = {
  language: 'tr',
  theme: 'light',
  appLoader: false,
  bottomTabDisplay: true,
  connectedPrinter: "",
  pairedAddress: "",
};

const settingsSlice = createSlice({
  name: 'settingsSlice',
  initialState,
  reducers: {
    changeLanguage: (state, action: {payload: string}) => {
      i18next.changeLanguage(action.payload);
      state.language = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    changeLoadingState: (state, action: {payload: boolean}) => {
      state.appLoader = action.payload;
    },
    changeBottomTabDisplay: (state, action: {payload: boolean}) => {
      state.bottomTabDisplay = action.payload;
    },
    // setConnectedPrinter is connected to the printer
    setConnectedPrinter: (state, action: {payload: string}) => {
      state.connectedPrinter = action.payload;
    },
    setPairedAddress: (state, action: {payload: string}) => {
      state.pairedAddress = action.payload;
    }

  },
});

const {actions, reducer} = settingsSlice;
export const {changeLanguage, changeLoadingState, setTheme, changeBottomTabDisplay, setConnectedPrinter} = actions;

export default reducer;
