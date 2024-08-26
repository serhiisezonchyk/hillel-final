import {
  CitiesNP,
  GetCitiesResponse,
  GetWarehousesResponse,
  NovaPostReqBodyGetCities,
  NovaPostReqBodyGetWarehouses,
  WarhousesNP,
} from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const novapostApi = createApi({
  reducerPath: 'novapostApi',
  tagTypes: ['Cities', 'Warehouses'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.novaposhta.ua/v2.0/json/' }),
  endpoints: (builder) => ({
    getCities: builder.query<CitiesNP[], { limit?: number; page?: number; findByString?: string }>({
      query: ({ limit = 10, page = 1, findByString = '' }) => ({
        method: 'POST',
        url: '',
        body: {
          apiKey: import.meta.env.NP_API_KEY,
          modelName: 'AddressGeneral',
          calledMethod: 'getCities',
          methodProperties: {
            FindByString: findByString,
            Page: page,
            Limit: limit,
          },
        } as NovaPostReqBodyGetCities,
      }),
      transformResponse: (response: GetCitiesResponse): CitiesNP[] => {
        return response.success ? response.data : [];
      },
      providesTags: ['Cities'],
    }),
    getWarehouses: builder.query<
      WarhousesNP[],
      { limit?: number; page?: number; findByString?: string; cityRef: string }
    >({
      query: ({ limit = 10, page = 1, findByString, cityRef }) => ({
        method: 'POST',
        url: '',
        body: {
          apiKey: import.meta.env.NP_API_KEY,
          modelName: 'AddressGeneral',
          calledMethod: 'getWarehouses',
          methodProperties: {
            FindByString: findByString,
            Page: page,
            Limit: limit,
            CityRef: cityRef,
          },
        } as NovaPostReqBodyGetWarehouses,
      }),
      transformResponse: (response: GetWarehousesResponse): WarhousesNP[] => {
        return response.success ? response.data : [];
      },
      providesTags: ['Warehouses'],
    }),
  }),
});

export const { useGetCitiesQuery, useLazyGetCitiesQuery, useGetWarehousesQuery, useLazyGetWarehousesQuery } = novapostApi;
