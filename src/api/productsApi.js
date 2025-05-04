import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
 reducerPath: 'productsApi',
 baseQuery: fetchBaseQuery({ baseUrl: "https://67fbd1781f8b41c81684f5de.mockapi.io/api/v1/" }),
 endpoints: (builder) => ({
   getProducts: builder.query({
     query: () => 'products',
   }),
   createProduct: builder.mutation({
     query: (newProduct) => ({
       url: 'products',
       method: 'POST',
       body: newProduct,
     }),
   }),
 }),
});

export const { useGetProductsQuery, useCreateProductMutation } = productsApi;