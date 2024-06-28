import { User } from '@/interfaces';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/store/consts/api';
const baseQuery = fetchBaseQuery({
	baseUrl: process.env.BACKEND_URL || 'http://localhost:3000',
	prepareHeaders: (headers) => {
		const token = localStorage.getItem('token'); 
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
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

		recoverPassword: builder.mutation({
			query: (email) => ({
				url: 'user/password-recovery',
				method: 'POST',
				body: { email },
			}),
		}),

		getAllUsers: builder.query<User[], { page: number; limit: number }>({
			query: ({ page, limit }) => ({
				url: `user/?page=${page}&limit=${limit}`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			}),
		}),

		getUserByEmail: builder.query<User, string>({
			query: (email) => ({
				url: `user/${email}`,
				method: 'GET',
			}),
		}),

		getUserStatus: builder.query<User, string>({
			query: () => ({
				url: `user/status`,
				method: 'GET',
			}),
		}),

		verifyToken: builder.query({
			query: (token) => ({
				url: 'user/verify_token',
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		}),

		hasBoughtProduct: builder.query<
			{ hasProduct: boolean },
			{ userId: string; productId: string }
		>({
			query: ({ userId, productId }) => ({
				url: `user/${userId}/${productId}`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			}),
		}),
	}),
});

export const {
	useLoginUserMutation,
	useRegisterUserMutation,
	useRecoverPasswordMutation,
	useGetAllUsersQuery,
	useGetUserByEmailQuery,
	useVerifyTokenQuery,
	useHasBoughtProductQuery,
	useGetUserStatusQuery
} = userApi;
