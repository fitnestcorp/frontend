import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL = process.env.BACKEND_URL;

export const baseQuery = fetchBaseQuery({
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