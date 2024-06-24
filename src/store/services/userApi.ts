import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { User } from '@/interfaces';
import { verify } from 'crypto';

const baseQuery = fetchBaseQuery({
	baseUrl: process.env.BACKEND_URL || 'http://localhost:3000', //Va a fallar el env porque no tenemos el redux persist
	//pero lo voy a dejar asi xd hay que recordar cambiarlo
	prepareHeaders: (headers, { getState }) => {
		return headers;
	},
});

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: baseQuery,
	endpoints: (builder) => ({
		loginUser: builder.mutation({
			query: (credentials) => ({
				url: 'user/login',
				method: 'POST',
				body: credentials,
			}),
			onQueryStarted: async (arg, { queryFulfilled }) => {
				try {
					const { data } = await queryFulfilled;
					localStorage.setItem('token', data.token);
				} catch (error) {
					console.error('Error storing token', error);
				}
			},
		}),

		registerUser: builder.mutation({
			query: (credentials) => ({
				url: 'user/register',
				method: 'POST',
				body: credentials,
			}),
			onQueryStarted: async (arg, { queryFulfilled }) => {
				try {
					const { data } = await queryFulfilled;
					localStorage.setItem('token', data.token);
				} catch (error) {
					console.error('Error storing token', error);
				}
			},
		}),

		getAllUsers: builder.query<User[], { page: number; limit: number }>({
			query: ({ page, limit }) => ({
				url: `users?page=${page}&limit=${limit}`,
				method: 'GET',
			}),
		}),

		getUserByEmail: builder.query<User, string>({
			query: (email) => ({
				url: `users/${email}`,
				method: 'GET',
			}),
		}),

		verifyToken: builder.query({
			query: (token) => ({
				url: 'auth/client/verify_token',
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		}),
	}),
});

export const {
	useLoginUserMutation,
	useRegisterUserMutation,
	useGetAllUsersQuery,
	useGetUserByEmailQuery,
	useVerifyTokenQuery,
} = userApi;
