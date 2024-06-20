import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Category } from '@/interfaces';

type CategoryWithNumber = [Category[], number];

const baseQuery = fetchBaseQuery({
	baseUrl: process.env.BACKEND_URL || 'http://localhost:3000',
	prepareHeaders: (headers, { getState }) => {
		return headers;
	},
});

export const categoryApi = createApi({
	reducerPath: 'categoryApi',
	baseQuery: baseQuery,
	endpoints: (builder) => ({
		createCategory: builder.mutation({
			query: (category) => ({
				url: `category`,
				method: 'POST',
				body: category,
			}),
		}),

		updateCategory: builder.mutation({
			query: ({ category, id }) => ({
				url: `category/${id}`,
				method: 'PUT',
				body: category,
			}),
		}),

		deleteCategory: builder.mutation({
			query: (id) => ({
				url: `category/${id}`,
				method: 'DELETE',
			}),
		}),

		getAllCategories: builder.query<
			CategoryWithNumber,
			{ page: number; limit: number }
		>({
			query: ({ page, limit }) => ({
				url: `category?page=${page}&limit=${limit}`,
				method: 'GET',
			}),
		}),

		getCategoryByName: builder.query<Category, string>({
			query: (name) => ({
				url: `category/${name}`,
				method: 'GET',
			}),
		}),

		getCategoryById: builder.query<Category, string>({
			query: (id) => ({
				url: `category/${id}`,
				method: 'GET',
			}),
		}),
	}),
});

export const {
	useCreateCategoryMutation,
	useUpdateCategoryMutation,
	useDeleteCategoryMutation,
	useGetAllCategoriesQuery,
	useGetCategoryByNameQuery,
	useGetCategoryByIdQuery,
} = categoryApi;
