import {useParams} from "react-router-dom";
import {TagShowItem} from "../components/tag/TagShowItem.tsx";
import {User1} from "../constants/test.ts";
import './css/UserInfoView.css'
import {ITag, IUser} from "../Interface.ts";
import StatisticBar from "../components/statistic/StatisticBar.tsx";
import {Input} from "antd";
import {EmptyUser} from "../data/EmptyObject.ts";
import {useEffect, useState} from "react"
import {User_GetUser} from "../service/UserService.ts";
import {QuestionCard} from "../components/question/question-page/QuestionCard.tsx";
import {AnswerCard} from "../components/users/AnswerCard.tsx";
import {FilterTabItem} from "../components/users/FilterTabItem.tsx";
import {IQuestionTab} from "../features/tab/tabSlice.ts";
export const Tabs = [
	{tab: 'heat', title: '个人信息'},
	{tab: 'newest', title: ''},
]
const options =
	[
		{
			value: 'answer',
			label: '回答',
		},
		{
			value: 'ask',
			label: '提问',
		},
		{
			value: 'star',
			label: '收藏'
		}
	]
;
// user-self data view
export const UserInfoView = () => {
	const params = useParams();
	const [user, setUser] = useState<IUser>(EmptyUser);
	useEffect(() => {
		const getUserInfo = async (id: string) => {
			const response = await User_GetUser(id);
			if (!response.ok) return;
			setUser(await response.json());
			console.log(user);
		};
		if (!params.userid) return;
		getUserInfo(params.userid).catch((err) => console.error(err));
	}, [params.userid]);
	return (
		<div className={"info-all"}>
			<div className={"simple-info"}>
				<div className={"_user-avatar-container"}>
					<img className={"_avatar"} src={user.avatar}/>
				</div>
				<div className={"user-description-container"}>
					<div className={"username"}>{user.username}</div>
					<div>
						<text className={"register_time"}>注册时间:2022-06-27</text>
						<text className={"location"}>{user.location}</text>
					</div>
					<text className={"profile"}>{user.profile}</text>
					<p className={"tags"}>
						<text style={{marginRight:'3%'}}>标签:</text>
						<span>
					{user.fields.map((field: ITag) => (
						<TagShowItem tag_name={field.content}/>
					))}
					</span>
					</p>
				</div>
			</div>

		</div>
		// 	<div className={"details"}>
		// 		<Input placeholder="个人简介"></Input>

		// 		<p>地址:{testUser.location}</p>
		// 	</div>
		// 	<div>
		// 		<StatisticBar options={options}/>
		// 	</div>
		// 	<div className={"user-likes-and-save"}>
		// 		{
		// 			user.like_questions.map(question => (
		// 				<QuestionCard question={question}/>
		// 			))
		// 		}
		// 		{
		// 			user.star_questions.map(question => (
		// 				<QuestionCard question={question}/>
		// 			))
		// 		}
		// 	</div>
		// 	<div className={"user-creates-and-answers"}>
		// 		{
		// 			user.questions.map(question => (
		// 				<QuestionCard question={question}/>
		// 			))
		// 		}
		// 		{
		// 			user.answers.map(answer => (
		// 				<AnswerCard answer={answer}/>
		// 			))
		// 		}
		// 	</div>
		// </div>
	);
};
