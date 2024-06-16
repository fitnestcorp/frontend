import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '@/interfaces';

interface UserState {
	user: User | null;
	token: string | null;
	role: string | null;
}

const initialState: UserState = {
	user: null,
	token: null,
	role: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (
			state,
			action: PayloadAction<{ user: any; role: string }>
		) => {
			state.user = action.payload.user;
			state.role = action.payload.role;
		},
		setToken: (state, action: PayloadAction<string | null>) => {
			state.token = action.payload;
		},
		clearUser: (state) => {
			state.user = null;
			state.token = null;
			state.role = null;
		},
	},
});

export const { setUser, setToken, clearUser } = userSlice.actions;
export default userSlice.reducer;
