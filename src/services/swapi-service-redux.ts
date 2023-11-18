// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPlanetsAPI } from '../types';

// Define a service using a base URL and expected endpoints
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

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllPlanetsQuery } = planetsApi;
