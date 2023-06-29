import {configureStore} from '@reduxjs/toolkit'
import keywordReducer from "../features/keyword/keywordSlice"
import tagReducer from "../features/tag/tagSlice"


export const store = configureStore({
	reducer: {
		keyword: keywordReducer,
		tag: tagReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
