import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CartItem } from '@/interfaces';

interface CartState {
	items: CartItem[];
}

const initialState: CartState = {
	items: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setCart: (state, action: PayloadAction<{ items: CartItem[] }>) => {
			state.items = action.payload.items;
		},
		addItem: (state, action: PayloadAction<{ item: CartItem }>) => {
			state.items.push(action.payload.item);
		},
		removeItem: (state, action: PayloadAction<{ id: string }>) => {
			state.items = state.items.filter(
				(item) => item.id !== action.payload.id
			);
		},
		updateItem: (
			state,
			action: PayloadAction<{ id: string; quantity: number }>
		) => {
			state.items = state.items.map((item) => {
				if (item.id === action.payload.id) {
					return { ...item, quantity: action.payload.quantity };
				}
				return item;
			});
		},
		clearCart: (state) => {
			state.items = [];
		},
	},
});

export const { setCart, addItem, removeItem, updateItem, clearCart } =
	cartSlice.actions;
export default cartSlice.reducer;
