import { Address } from '@/interfaces/Address';
import { City } from '@/interfaces/City';
import { Department } from '@/interfaces/Department';

import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/store/consts/api';

type AddressWithNumber = [Address[], number]; // TODO: unused

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
