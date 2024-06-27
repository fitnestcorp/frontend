import { ShoppingCart } from '@/interfaces/ShoppingCart';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type ShoppingCartWithNumber = [ShoppingCart[], number];

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
      query: ({ userId, updateShoppingCartDto }) => ({
        url: `shoppingcart/${userId}`,
        method: 'PATCH',
        body: updateShoppingCartDto,
      }),
    }),

    deleteShoppingCart: builder.mutation({
      query: (userId) => ({
        url: `shoppingcart/${userId}`,
        method: 'DELETE',
      }),
    }),

    getAllShoppingCarts: builder.query<ShoppingCartWithNumber, { page: number; limit: number }>({
      query: ({ page, limit }) => ({
        url: `shoppingcart?page=${page}&limit=${limit}`,
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
      query: (userId) => ({
        url: `shoppingcart/${userId}`,
        method: 'POST',
      }),
    }),

    removeItem: builder.mutation({
      query: ({ userId, productId }) => ({
        url: `shoppingcart/${userId}/${productId}`,
        method: 'DELETE',
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
  useRemoveItemMutation, 
} = shoppingCartApi;
