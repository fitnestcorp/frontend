import { ShoppingCart } from '@/interfaces/ShoppingCart';

import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/store/consts/api';

type ShoppingCartWithNumber = [ShoppingCart[], number];

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
