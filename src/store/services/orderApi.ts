import { Order } from '@/interfaces/Order';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type OrdersWithNumber = [Order[], number];

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.BACKEND_URL || 'http://localhost:3000',
  prepareHeaders: (headers) => {
		const token = localStorage.getItem('token'); 
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
	},
  responseHandler: async (response) => {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }
    return response.text();
  },
});

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

    handlePayUResponse: builder.mutation<void, CreateResponseDto>({
      query: (data) => ({
        url: `orders/payu-response`,
        method: 'GET',
        params: data,
      }),
    }),

    handlePayUConfirmation: builder.mutation<void, CreateResponseDto>({
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
