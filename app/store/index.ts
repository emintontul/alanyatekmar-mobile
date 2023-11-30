import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
import EncryptedStorage from 'react-native-encrypted-storage';
import {combineReducers} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';

import * as authRedux from './reducers/auth';
import * as requestRedux from './reducers/request';
import * as settingsRedux from './reducers/settings';

import {baseApi, rtkQueryErrorHandler, rtkQueryLoaderHandler} from '@/api';
import {tekmarApi} from '@/api/tekmarApi';

export {authRedux, settingsRedux, requestRedux};

const rootPersistConfig = {
  key: 'root',
  version: 1,
  blacklist: [baseApi.reducerPath, tekmarApi.reducerPath],
  storage: EncryptedStorage,
};

const settingsPersistConfig = {
  key: 'settings',
  version: 1,
  blacklist: ['appLoader'],
  storage: EncryptedStorage,
};

export const rootReducer = combineReducers({
  auth: authRedux.default,
  requestRedux: requestRedux.default,
  settings: persistReducer(settingsPersistConfig, settingsRedux.default),
  [tekmarApi.reducerPath]: tekmarApi.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(baseApi.middleware, rtkQueryErrorHandler, rtkQueryLoaderHandler),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
