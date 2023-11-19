import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPlanetsAPI } from '../types';

export const planetsApi = createApi({
  reducerPath: 'planetsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api' }),
  endpoints: (builder) => ({
    getAllPlanets: builder.query<IPlanetsAPI, Record<string, string | number>>({
      query: ({ page, searchPhrase }: { page: number; searchPhrase: string }) =>
        `planets/?page=${page}&search=${searchPhrase}`,
    }),
  }),
});

export const { useGetAllPlanetsQuery } = planetsApi;
