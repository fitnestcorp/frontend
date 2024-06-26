import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShoppingCartItem } from '@/interfaces/ShoppingCartItem';

interface CartState {
	items: ShoppingCartItem[];
}

const initialState: CartState = {
	items: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setCart: (state, action: PayloadAction<{ items: ShoppingCartItem[] }>) => {
			state.items = action.payload.items;
		},
		addItem: (state, action: PayloadAction<{ item: ShoppingCartItem }>) => {
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
		updateShoppingCart: (
			state,
			action: PayloadAction<{ items: ShoppingCartItem[] }>
		) => {
			state.items = action.payload.items;
		},
	},
});

export const { setCart, addItem, removeItem, updateItem, clearCart, updateShoppingCart } =
	cartSlice.actions;
export default cartSlice.reducer;
