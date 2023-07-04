import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit';


export interface IPage {
	currentPage: number;
	pageSize: number;
}

const initialState: IPage = {
	currentPage: 0,
	pageSize: 20,
}

export const PageSlice = createSlice({
	name: 'page',
	initialState,
	reducers: {
		changePage: (state, action: PayloadAction<IPage>) => {
			state.currentPage = action.payload.currentPage
			state.pageSize = action.payload.pageSize
		}
	}
})

export const {changePage} = PageSlice.actions;

export default PageSlice.reducer
