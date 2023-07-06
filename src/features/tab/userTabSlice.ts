import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit';
import {ITab} from "../../views/UsersView.tsx";


export interface IUserTab extends ITab {
	tab: "heat" | "newest",
	title: "All Users"
}

const initialState: IUserTab = {
	tab: "heat",
	title: "All Users"
}

export const UserTabSlice = createSlice({
	name: 'userTab',
	initialState,
	reducers: {
		changeUserTab: (state, action: PayloadAction<"heat" | "newest">) => {
			state.tab = action.payload;
		}
	}
})

export const {changeUserTab} = UserTabSlice.actions;

export default UserTabSlice.reducer
