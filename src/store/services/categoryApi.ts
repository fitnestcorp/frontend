import { Category } from '@/interfaces';

import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/store/consts/api';

type CategoryWithNumber = [Category[], number];



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
			query: ({ formData, id }) => ({
				url: `category/${id}`,
				method: 'PATCH',
				body: formData,
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
				url: `category/id/${id}`,
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
