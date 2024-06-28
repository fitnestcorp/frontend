import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';
import { userApi } from './services/userApi';
import { productApi } from './services/productApi';
import { categoryApi } from './services/categoryApi';
import { groupApi } from './services/groupApi';
import { shoppingCartApi } from './services/shoppingCartApi';
import { commonApi } from './services/commonApi';
import { ordersApi } from './services/orderApi';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
	reducer: {
		cart: cartReducer,
		[categoryApi.reducerPath]: categoryApi.reducer,
		[groupApi.reducerPath]: groupApi.reducer,
		[productApi.reducerPath]: productApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		[shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
		[commonApi.reducerPath]: commonApi.reducer,
		[ordersApi.reducerPath]: ordersApi.reducer,
		user: persistedReducer,
		
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(
			userApi.middleware,
			productApi.middleware,
			categoryApi.middleware,
			groupApi.middleware,
			shoppingCartApi.middleware,
			commonApi.middleware,
			ordersApi.middleware,
		),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
