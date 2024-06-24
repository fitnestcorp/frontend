import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ShoppingCart } from '@/interfaces';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.BACKEND_URL || 'http://localhost:3000',
  prepareHeaders: (headers, { getState }) => {
    return headers;
  },
});

export const shoppingCartApi = createApi({
  reducerPath: 'shoppingCartApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    createShoppingCart: builder.mutation({
      query: (shoppingCart) => ({
        url: `shoppingcart`,
        method: 'POST',
        body: shoppingCart,
      }),
    }),

    updateShoppingCart: builder.mutation({
      query: ({ id, ...updateShoppingCartDto }) => ({
        url: `shoppingcart/${id}`,
        method: 'PATCH',
        body: updateShoppingCartDto,
      }),
    }),

    deleteShoppingCart: builder.mutation({
      query: (id) => ({
        url: `shoppingcart/${id}`,
        method: 'DELETE',
      }),
    }),

    getAllShoppingCarts: builder.query<ShoppingCart[], void>({
      query: () => ({
        url: `shoppingcart`,
        method: 'GET',
      }),
    }),

    getShoppingCartById: builder.query<ShoppingCart, string>({
      query: (id) => ({
        url: `shoppingcart/${id}`,
        method: 'GET',
      }),
    }),

    getShoppingCartByUserId: builder.query<ShoppingCart, string>({
      query: (userId) => ({
        url: `shoppingcart/user/${userId}`,
        method: 'GET',
      }),
    }),

    buyShoppingCart: builder.mutation({
      query: (id) => ({
        url: `shoppingcart/${id}`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useCreateShoppingCartMutation,
  useUpdateShoppingCartMutation,
  useDeleteShoppingCartMutation,
  useGetAllShoppingCartsQuery,
  useGetShoppingCartByIdQuery,
  useGetShoppingCartByUserIdQuery,
  useBuyShoppingCartMutation,
} = shoppingCartApi;
