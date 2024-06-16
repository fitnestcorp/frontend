import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({ baseUrl: process.env.BACKEND_URL }),
	endpoints: (builder) => ({
		loginUser: builder.mutation({
			query: (credentials) => ({
				url: 'auth/login',
				method: 'POST',
				body: credentials,
			}),
		}),
		registerUser: builder.mutation({
			query: (credentials) => ({
				url: 'auth/register',
				method: 'POST',
				body: credentials,
			}),
		}),

		findByEmail: builder.query({
			query: (email) => ({
				url: `users/${email}`,
				method: 'GET',
			}),
		}),
	}),
});

export const {
	useLoginUserMutation,
	useRegisterUserMutation,
	useFindByEmailQuery,
} = userApi;
