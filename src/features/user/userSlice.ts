import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit';


interface userState {
	username: string;
	avatar: string;
}

const initialState: userState = {
	username: "",
	avatar: ""
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<userState>) => {
			state.username = action.payload.username;
			state.avatar = action.payload.avatar;
		},
		logout: (state) => {
			state.username = "";
			state.avatar = "";
		}
	}
})

export const {login, logout} = userSlice.actions;

export default userSlice.reducer
