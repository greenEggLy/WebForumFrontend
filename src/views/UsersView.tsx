import {IUserCard} from "../Interface.ts";
import {useEffect, useState} from "react";
import {FilterTabItem} from "../components/users/FilterTabItem.tsx";
import {Input, List, message} from "antd";
import {UserCardItem} from "../components/users/UserCardItem.tsx";
import {Users_FilterByName, Users_FilterByTab} from "../service/UsersService.ts";

export interface ITab {
	tab: string;
	title: string;
}

const tabs: ITab[] = [
	{tab: "reputation", title: "Reputation"},
	{tab: "newusers", title: "New Users"},
	{tab: "voters", title: "Voters"},
	{tab: "editors", title: "Editors"},
	{tab: "moderators", title: "Moderators"},
];
// 用户搜索,总览
export const UsersView = () => {
	const [users, setUsers] = useState<IUserCard[]>([]);
	const [filterText, setFilterText] = useState<string>("")

	const getUserByTab = async (tab: string) => {
		const response = await Users_FilterByTab(tab);
		if (!response.ok) message.error(`get user by ${tab} error!`);
		const json: Promise<IUserCard[]> = response.json();
		setUsers(await json);
	};
	useEffect(() => {
		getUserByTab(tabs[0].tab).catch(err => console.error(err))
	}, [])

	useEffect(() => {
		const getUsers = setTimeout(async () => {
			const response = await Users_FilterByName(filterText)
			if (!response.ok) {
				message.error("暂不能获取用户信息")
				return;
			}
			setUsers(await response.json())
		}, 2000)
		return () => clearTimeout(getUsers)
	}, [filterText])
	return (
		<div>
			<div className={"view-title"} style={{fontSize: "large"}}>Users</div>
			<div className="userview-header">
				<div className="inputbox">
					<Input
						id="userfilter"
						name="userfilter"
						className="filter-input"
						autoComplete="off"
						placeholder="Filter by user"
						value={filterText}
						onChange={e => setFilterText(e.target.value)}
					>
					</Input>
				</div>

				<div className="users-filter-tabs">
					{tabs.map((tab) => (
						<FilterTabItem
							tab={tab.tab}
							title={tab.title}
							func={getUserByTab}
							// setUsers={setUsers}
						/>
					))}
				</div>
			</div>
			<List
				grid={{
					gutter: 16,
					xs: 1,
					sm: 2,
					md: 4,
					lg: 4,
					xl: 6,
					xxl: 3,
				}}
				dataSource={users}
				renderItem={(user) => (
					<List.Item>
						<UserCardItem user={user}/>
					</List.Item>
				)}
			/>
		</div>
	);
};
