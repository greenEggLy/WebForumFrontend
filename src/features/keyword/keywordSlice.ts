import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../../app/store.ts";


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

export const keywordContent = (state: RootState) => state.keyword;

export const {changeKeyword} = keywordSlice.actions;

export default keywordSlice.reducer
