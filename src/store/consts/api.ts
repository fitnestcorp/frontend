import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL = process.env.BACKEND_URL;

export const baseQuery = fetchBaseQuery({
	baseUrl: BACKEND_URL,
	prepareHeaders: (headers, { getState }) => {
		return headers;
	},
});