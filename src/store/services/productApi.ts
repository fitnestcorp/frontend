import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
	baseUrl: process.env.BACKEND_URL || 'http://localhost:3000',
	prepareHeaders: (headers, { getState }) => {
		return headers;
	},
});

export const productApi = createApi({
	reducerPath: 'ProductApi',
	baseQuery: baseQuery,
	endpoints: (builder) => ({
		getAllProducts: builder.query({
			query: ({ page, limit }) => ({
				url: ``, //TODO definir la url
				method: 'GET',
			}),
		}),

		getProduct: builder.query({
			query: (id) => ({
				url: ``, //TODO definir la url
				method: 'GET',
			}),
		}),

		createProduct: builder.mutation({
			query: (product) => ({
				url: ``, //TODO definir la url
				method: 'POST',
				body: product,
			}),
		}),

		updateProduct: builder.mutation({
			query: (product) => ({
				url: ``, //TODO definir la url
				method: 'PUT',
				body: product,
			}),
		}),

		deleteProduct: builder.mutation({
			query: (id) => ({
				url: ``, //TODO definir la url
				method: 'DELETE',
			}),
		}),
	}),
});

export const {
	useGetAllProductsQuery,
	useGetProductQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useDeleteProductMutation,
} = productApi;
