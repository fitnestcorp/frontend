import { Address } from '@/interfaces/Address';
import { City } from '@/interfaces/City';
import { Department } from '@/interfaces/Department';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


type AddressWithNumber = [Address[], number];

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.BACKEND_URL || 'http://localhost:3000',
  prepareHeaders: (headers, { getState }) => {
    return headers;
  },
});

export const commonApi = createApi({
  reducerPath: 'commonApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getAllCities: builder.query<City[], void>({
      query: () => ({
        url: 'city',
        method: 'GET',
      }),
    }),

    getAllDepartments: builder.query<Department[], void>({
      query: () => ({
        url: 'department',
        method: 'GET',
      }),
    }),

    getAddressesByUserId: builder.query<Address[], string>({
      query: (userId) => ({
        url: `address/user/${userId}`,
        method: 'GET',
      }),
    }),

    createAddress: builder.mutation<Address, { address: Address, userId: string }>({
      query: ({ address, userId }) => ({
        url: `address/user/${userId}`,
        method: 'POST',
        body: address,
      }),
    }),
  }),
});

export const {
  useGetAllCitiesQuery,
  useGetAllDepartmentsQuery,
  useGetAddressesByUserIdQuery,
  useCreateAddressMutation,
} = commonApi;
