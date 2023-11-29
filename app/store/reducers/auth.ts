import {createSlice} from '@reduxjs/toolkit';

import {LoginUserResponseModel} from '@/api/kingdomApi';

export interface IAuthState {
  user?: LoginUserResponseModel;
  token?: string;
}

export const initialState: IAuthState = {
  user: undefined,
  token: '',
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: state => {
      state.user = undefined;
      state.token = '';
    },
  },
});

const {actions, reducer} = authSlice;
export const {login, logout} = actions;

export default reducer;
