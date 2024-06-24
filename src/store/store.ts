import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import userReducer from './slices/userSlice';
import { userApi } from './services/userApi';
import { productApi } from './services/productApi';
import { categoryApi } from './services/categoryApi';
import { groupApi } from './services/groupApi';
import { cartApi } from './services/cartApi';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
	reducer: {
		[categoryApi.reducerPath]: categoryApi.reducer,
		[groupApi.reducerPath]: groupApi.reducer,
		[productApi.reducerPath]: productApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		[cartApi.reducerPath]: cartApi.reducer,
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
			cartApi.middleware
		),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
