import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Cart } from '@/interfaces';

type CartWithNumber = [Cart, number];

const baseQuery = fetchBaseQuery({
	baseUrl: process.env.BACKEND_URL || 'http://localhost:3000',
	prepareHeaders: (headers, { getState }) => {
		return headers;
	},
});

export const cartApi = createApi({
	reducerPath: 'cartApi',
	baseQuery: baseQuery,
	endpoints: (builder) => ({
		getCart: builder.query<CartWithNumber, string>({
			query: (userId) => ({
				url: `shoppingcart/user/${userId}`,
				method: 'GET',
			}),
		}),
		addToCart: builder.mutation({
			query: ({ userId, productId, quantity }) => ({
				url: `shoppingcart`,
				method: 'POST',
				body: { userId, productId, quantity },
			}),
		}),
	}),
});

export const { useGetCartQuery, useAddToCartMutation } = cartApi;
