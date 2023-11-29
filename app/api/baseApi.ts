import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {baseURL} from './config';
import type {RootState} from '../store';

import {serialize} from '@/utils/query-string-generator';

const baseApi = createApi({
  reducerPath: 'baseApiReducer',
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    paramsSerializer: (params: Record<string, unknown>) => {
      return serialize(params);
    },
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState)?.auth?.token || '';
      if (token) {
        headers.set('Token', token);
      }
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export {baseApi};
