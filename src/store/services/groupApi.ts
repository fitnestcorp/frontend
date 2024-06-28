import { Group } from '@/interfaces';

import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/store/consts/api';

type GroupWithNumber = [Group[], number];



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
