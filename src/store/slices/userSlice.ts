import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '@/interfaces';

interface UserState {
	user: User | null;
}

const initialState: UserState = {
	user: null,
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
		},
		clearUser: (state) => {
			state.user = null;
		},
	},
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
