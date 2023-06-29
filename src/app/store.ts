import {configureStore} from '@reduxjs/toolkit'
import {keywordReducer} from "../features/keyword/keywordSlice";


const store = configureStore({
	reducer: {
		keyword: keywordReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
