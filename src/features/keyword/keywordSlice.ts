import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit';


interface KeywordState {
	value: string;
}

const initialState: KeywordState = {
	value: "",
}

export const keywordSlice = createSlice({
	name: 'keyword',
	initialState,
	reducers: {
		changeKeyword: (state, action: PayloadAction<string>) => {
			state.value = action.payload;
		}
	}
})

export const {changeKeyword} = keywordSlice.actions;

export default keywordSlice.reducer
