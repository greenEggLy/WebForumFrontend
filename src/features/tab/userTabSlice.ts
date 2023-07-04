import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit';
import {ITab} from "../../views/UsersView.tsx";


export interface IUserTab extends ITab {
	tab: "reputation" | "newuser" | "editor";
	title: "All Users"
}

const initialState: IUserTab = {
	tab: "reputation",
	title: "All Users"
}

export const UserTabSlice = createSlice({
	name: 'userTab',
	initialState,
	reducers: {
		changeUserTab: (state, action: PayloadAction<"reputation" | "newuser" | "editor">) => {
			state.tab = action.payload;
		}
	}
})

export const {changeUserTab} = UserTabSlice.actions;

export default UserTabSlice.reducer
