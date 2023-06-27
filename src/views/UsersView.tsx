import {IUserCard} from "../Interface.ts";
import {useEffect, useState} from "react";
import {FilterTabItem} from "../components/users/FilterTabItem.tsx";
import {Input, List, Row, Col, Divider} from "antd";
import {UserCardItem} from "../components/users/UserCardItem.tsx";
import {styles} from "../stylesheets/global.tsx";
import {UserList} from "../constants/test.ts";
const { Search } = Input;
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
	// @ts-ignore
	const getUserByTab = async (tab: ITab) => {
		setUsers(UserList);
	};

	// const getUserByTab = async (tab: ITab) => {
	// 	const response = await Users_FilterByTab(tab.tab);
	// 	if (!response.ok) message.error(`get user by ${tab} error!`);
	// 	const json: Promise<IUserCard[]> = response.json();
	// 	setUsers(await json);
	// };
	// useEffect(() => {
	// 	getUserByTab(tabs[0]).catch(err => console.error(err))
	// }, [])

	// useEffect(() => {
	// 	const getUsers = setTimeout(async () => {
	// 		const response = await Users_FilterByName(filterText)
	// 		if (!response.ok) {
	// 			message.error("暂不能获取用户信息")
	// 			return;
	// 		}
	// 		setUsers(await response.json())
	// 	}, 2000)
	// 	return () => clearTimeout(getUsers)
	// }, [filterText])
	useEffect(()=>{
		setUsers(UserList);
	})

	return (
		<div>
			<div className={"view-title"} style={styles.titleContainer}>
				<h2>Users</h2>
			</div>
			<Row className="userview-header" style={styles.filterContainer}>
				<Col span={8} className="inputbox" style={styles.questionContainer}>
					<Search
						id="userfilter"
						name="userfilter"
						className="filter-input"
						autoComplete="off"
						placeholder="Filter by user"
						value={filterText}
						onChange={e => setFilterText(e.target.value)}
					>
					</Search>
				</Col>

				<Col span={8} className="filter-tabs" >
						<FilterTabItem tabs={tabs} func={getUserByTab} />
				</Col>
			</Row>
			<Divider style={{marginBottom:'0px',marginTop:'2px'}}/>
			<div style={{  paddingTop:'1rem',paddingLeft:'1rem',height:'100%',backgroundColor: '#f5f5f5'}}>
			<List

				grid={{
					gutter:10,
					xs: 1,
					sm: 2,
					md: 3,
					lg: 3,
					xl:4,
					xxl:4,
				}}
				dataSource={users}
				renderItem={(user) => (
					<List.Item>
						<UserCardItem user={user}/>
					</List.Item>
				)}
			/>
			</div>
		</div>)
}