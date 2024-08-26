import { Category, Product } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  tagTypes: ['Products', 'Categories'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/products' }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], { sort: string; limit?: number }>({
      query: ({ sort = 'asc', limit }) => ({
        url: '',
        params: {
          sort,
          limit,
        },
      }),
      providesTags: ['Products'],
    }),
    getProductsByCategory: builder.query<Product[], { category: string; sort: string; limit?: number }>({
      query: ({ category, sort = 'asc', limit }) => ({
        url: `/category/${category}`,
        params: {
          sort,
          limit,
        },
      }),
      providesTags: ['Products'],
    }),
    getCategories: builder.query<Category[], void>({
      query: () => `/categories`,
      providesTags: ['Categories'],
    }),
    getSingleProduct: builder.query<Product, string>({
      query: (itemId) => `/${itemId}`,
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  useGetSingleProductQuery,
  useLazyGetProductsQuery,
} = productApi;
