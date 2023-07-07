// noinspection JSUnusedLocalSymbols

import {ISearchUserCardResponse, IUserCard} from "../Interface.ts";
import {useEffect, useState} from "react";
import {FilterTabItem} from "../components/users/FilterTabItem.tsx";
import {Divider, List, message, Pagination} from "antd";
import {UserCardItem} from "../components/users/UserCardItem.tsx";
import "./css/UsersView.css"
import {SearchBox} from "../components/Home/SearchBox.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store.ts";
import {changeUserTab, IUserTab} from "../features/tab/userTabSlice.ts";
import {Users_GetUsers} from "../service/UsersService.ts";
import {changeKeyword} from "../features/keyword/keywordSlice.ts";
import {Tag_SearchTag} from "../service/TagService.ts";


export interface ITab {
	tab: string;
	title: string;
}

const tabs: IUserTab[] = [
	{tab: "reputation", title: "All Users"},
	{tab: "newuser", title: "All Users"},
	{tab: "editor", title: "All Users"},
];
// 用户搜索,总览
export const UsersView = () => {
	const userTab = useSelector((state: RootState) => state.userTab)
	const [text, setText] = useState<string>('')

	const [currentPage, setCurrentPage] = useState<number>(0)
	const [pageSize, setPageSize] = useState<number>(20);
	const [, setTotalPages] = useState<number>(0)
	const [totalItems, setTotalItems] = useState<number>(0)

	const dispatch = useDispatch();

	const [users, setUsers] = useState<IUserCard[]>([]);

	const getUserByTab = async (tab: IUserTab) => {
		const response = await Users_GetUsers(tab.tab, currentPage, pageSize, text);
		console.log(tab);
		if (!response.ok) message.error(`get user by ${tab} error!`);
		const json: Promise<IUserCard[]> = response.json();
		setUsers(await json);
	};

	useEffect(() => {
		dispatch(changeKeyword(""))
		dispatch(changeUserTab(tabs[0].tab))
		getUserByTab(tabs[0]).catch(err => console.error(err))
	}, [])

	useEffect(() => {
		dispatch(changeKeyword(""))
	}, [userTab])

	return (
		<div className={'users-view-container'}>
			<div className={"title-container"}>
				<h2>Users</h2>
			</div>
			<div className={"search-bar-container"}>
				<SearchBox
					placeholder={'Filter by user'}
					category={"user"}
					value={text}
					onChange={setText}
				/>
				{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
				{/*@ts-ignore*/}
				<FilterTabItem tabs={tabs} func={getUserByTab} setTab={(text) => dispatch(changeUserTab(text))}/>
			</div>
			<Divider style={{marginBottom: '0px', marginTop: '2px'}}/>
			<div className={"user-card-container"}>
				<List
					grid={{
						gutter: 16,
						column: 4
					}}
					dataSource={users}
					renderItem={(user) => (
						<List.Item>
							<UserCardItem user={user}/>
						</List.Item>
					)}
				/>
			</div>
			<Pagination defaultPageSize={20} pageSize={pageSize} total={totalItems} current={currentPage}
						onChange={async (page, pageSize) => {
							const response = await Tag_SearchTag(text, page, pageSize)
              if (!response.ok) {
								message.error(response.statusText)
								return;
							}
							const json: ISearchUserCardResponse = await response.json();
							setUsers(json.result)
							setCurrentPage(json.currentPage)
						}}/>
		</div>)
}
