import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit';
import {ITab} from "../../views/UsersView.tsx";


export interface IQuestionTab extends ITab {
	tab: "newest" | "heat" | "unanswered";
	title: "Newest Questions" | "Heated Questions" | "Unanswered Questions"
}

const initialState: IQuestionTab = {
	tab: "newest",
	title: "Newest Questions"
}

export const TabSlice = createSlice({
	name: 'tab',
	initialState,
	reducers: {
		changeTab: (state, action: PayloadAction<"newest" | "heat" | "unanswered">) => {
			state.tab = action.payload;
			if (action.payload === 'newest')
				state.title = 'Newest Questions'
			if (action.payload === 'heat')
				state.title = 'Heated Questions'
			if (action.payload === 'unanswered')
				state.title = 'Unanswered Questions'
		}
	}
})

export const {changeTab} = TabSlice.actions;

export default TabSlice.reducer
