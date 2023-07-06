import {SearchOutlined} from "@ant-design/icons";
import "./SearchBox.css"
import {QuesGet} from "../../service/QuestionsService.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store.ts";
import React from "react";
import {Users_GetUsers} from "../../service/UsersService.ts";
import {Tag_SearchTag} from "../../service/TagService.ts";
import {useNavigate} from "react-router-dom";
import {changeTab} from "../../features/tab/tabSlice.ts";

interface Props {
	placeholder: string;
	value: string;
	isNavigate?: boolean;
	onChange: (text: string) => void |
		React.Dispatch<React.SetStateAction<string>> |
		{
			payload: string;
			type: "keyword/changeKeyword";
		}
	category: "user" | "question" | "tag"
}

export const SearchBox = ({placeholder, category, value, onChange, isNavigate}: Props) => {
	const tab = useSelector((state: RootState) => state.tab.tab)
	const userTab = useSelector((state: RootState) => state.userTab.tab)
	const tag = useSelector((state: RootState) => state.tag.value)
	const page = useSelector((state: RootState) => state.page)

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			if (category === 'question') {
				if (isNavigate) {
					navigate("/questions")
					dispatch(changeTab("heat"))
				}
				QuesGet(tab, page.currentPage, page.pageSize, tag, value).catch(err => console.error(err))
			} else if (category === 'user')
				Users_GetUsers(userTab, page.currentPage, page.pageSize, value).catch(err => console.error(err))
			else
				Tag_SearchTag(undefined, value).catch(err => console.error(err))
		}
	}

	return (
		<div className={"search-box"}>
			<div className={'search-box-icon'}>
				<SearchOutlined/>
			</div>
			<div className={'search-box-input-box-container'}>
				<input
					className={'search-box-input-box'}
					type="text"
					value={value}
					placeholder={placeholder}
					onChange={(e) => {
						onChange(e.target.value)
					}}
					onKeyDown={handleKeyDown} style={{border: 'none'}}
				/>
			</div>
		</div>
	)
}
