import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit';


interface TagState {
	value: string;
}

const initialState: TagState = {
	value: "",
}

export const TagSlice = createSlice({
	name: 'tag',
	initialState,
	reducers: {
		changeTag: (state, action: PayloadAction<string>) => {
			state.value = action.payload;
		}
	}
})

export const {changeTag} = TagSlice.actions;

export default TagSlice.reducer
