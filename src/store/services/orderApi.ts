import { Order } from '@/interfaces/Order';
import { ResponseDto } from '@/interfaces/ResponseDto';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/store/consts/api';

type OrdersWithNumber = [Order[], number];


export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: `orders`,
        method: 'POST',
        body: order,
      }),
    }),

    updateOrder: builder.mutation({
      query: ({ id, updateOrderDto }) => ({
        url: `orders/${id}`,
        method: 'PATCH',
        body: updateOrderDto,
      }),
    }),

    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `orders/${id}`,
        method: 'DELETE',
      }),
    }),

    getAllOrders: builder.query<OrdersWithNumber, { page: number; limit: number }>({
      query: ({ page, limit }) => ({
        url: `orders?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
    }),

    getOrderById: builder.query<Order, string>({
      query: (id) => ({
        url: `orders/one/${id}`,
        method: 'GET',
      }),
    }),

    handlePayUResponse: builder.mutation({
      query: (data) => ({
        url: `orders/payu-response`,
        method: 'GET',
        params: data,
      }),
    }),

    handlePayUConfirmation: builder.mutation({
      query: (data) => ({
        url: `orders/payu-confirmation`,
        method: 'GET',
        params: data,
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useHandlePayUResponseMutation,
  useHandlePayUConfirmationMutation,
} = ordersApi;
