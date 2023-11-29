import {baseApi as api} from './baseApi';

const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    getCharacters: build.query({
      query: (page = 1, count = 10) => `character/?page=${page}&count=${count}`,
    }),
  }),
});

export const {useGetCharactersQuery} = injectedRtkApi;
