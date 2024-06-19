import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


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
                url: 'auth/client/login',
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
                url: 'auth/client/register',
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
        findByEmail: builder.query({
            query: (email) => ({
                url: `users/${email}`,
                method: 'GET',
            }),
        }),
        getAllProducts: builder.query({
            query: ({page, limit}) => ({
                url: `product?page=${page}&limit=${limit}`,
                method: 'GET',
            }),
        }),
        getAllGroups: builder.query({
            query: ({page, limit}) => ({
                url: `product/group/all?page=${page}&limit=${limit}`,
                method: 'GET',
            }),
        }),
        getAGroups: builder.query({
            query: ({name}) => ({
                url: `product/group/${name}`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useLoginUserMutation,
    useRegisterUserMutation,
    useFindByEmailQuery,
    useGetAllProductsQuery,
    useGetAllGroupsQuery,
    useGetAGroupsQuery
} = userApi;