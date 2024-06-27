import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Group } from '@/interfaces';

type GroupWithNumber = [Group[], number];

const baseQuery = fetchBaseQuery({
	baseUrl: process.env.BACKEND_URL || 'http://localhost:3000',
	prepareHeaders: (headers, { getState }) => {
		return headers;
	},
});

export const groupApi = createApi({
	reducerPath: 'groupApi',
	baseQuery: baseQuery,
	endpoints: (builder) => ({
		createGroup: builder.mutation({
			query: (group) => ({
				url: `group`,
				method: 'POST',
				body: group,
			}),
		}),

		updateGroup: builder.mutation({
			query: ({ formData, id }) => ({
				url: `group/${id}`,
				method: 'PATCH',
				body: formData,
			}),
		}),

		deleteGroup: builder.mutation({
			query: (id) => ({
				url: `group/${id}`,
				method: 'DELETE',
			}),
		}),

		getAllGroups: builder.query<
			GroupWithNumber,
			{ page: number; limit: number }
		>({
			query: ({ page, limit }) => ({
				url: `group?page=${page}&limit=${limit}`,
				method: 'GET',
			}),
		}),

		getGroupByName: builder.query<Group, string>({
			query: (name) => ({
				url: `group/${name}`,
				method: 'GET',
			}),
		}),

		getGroupById: builder.query<Group, string>({
			query: (id) => ({
				url: `group/id/${id}`,
				method: 'GET',
			}),
		}),
	}),
});

export const {
	useCreateGroupMutation,
	useUpdateGroupMutation,
	useDeleteGroupMutation,
	useGetAllGroupsQuery,
	useGetGroupByNameQuery,
	useGetGroupByIdQuery,
} = groupApi;
