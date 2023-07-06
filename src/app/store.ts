import {configureStore} from '@reduxjs/toolkit'
import keywordReducer from "../features/keyword/keywordSlice"
import tagReducer from "../features/tag/tagSlice"
import userReducer from "../features/user/userSlice"
import tabReducer from "../features/tab/tabSlice"
import userTabReducer from "../features/tab/userTabSlice"
import pageReducer from "../features/page/pageSlice"


export const store = configureStore({
	reducer: {
		keyword: keywordReducer,
		tag: tagReducer,
		user: userReducer,
		tab: tabReducer,
		userTab: userTabReducer,
		page: pageReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
