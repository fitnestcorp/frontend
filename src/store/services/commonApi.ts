import { Address } from '@/interfaces/Address';
import { City } from '@/interfaces/City';
import { Department } from '@/interfaces/Department';

import { createApi } from '@reduxjs/toolkit/query/react';


type AddressWithNumber = [Address[], number]; 


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

    createAddress: builder.mutation<Address, { address: {phone_number: string;address: string;zip_code: string;city_name: string;}, userId: string | undefined }>({
      
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
