import {parseDateFormat} from "../service/TimeService.ts";
import {useParams} from "react-router-dom";
import {TagShowItem} from "../components/tag/TagShowItem.tsx";
import './css/UserInfoView.css'
import {EnvironmentOutlined} from "@ant-design/icons";
import { IAnswerRecord, IQuestionCard, ITag, IUser } from "../Interface.ts";
import StatisticBar from "../components/statistic/StatisticBar.tsx";
import { Input, List, Menu, Tabs } from "antd";
import {EmptyUser} from "../data/EmptyObject.ts";
import React, {useEffect, useState} from "react"
import {
	User_GetAnswers, User_GetLikeAnswers, User_GetLikeQuestions,
	User_GetQuestions,
	User_GetStarAnswers,
	User_GetStarQuestions,
	User_GetUser
} from "../service/UserService.ts";
import {QuestionCard} from "../components/question/question-page/QuestionCard.tsx";
import {AnswerCard} from "../components/users/AnswerCard.tsx";
import {FilterTabItem} from "../components/users/FilterTabItem.tsx";
import {IQuestionTab} from "../features/tab/tabSlice.ts";
import { QuesGet } from "../service/QuestionsService.ts";
import { QuestionList } from "../components/question/question-page/QuestionList.tsx";
import { AnswerList } from "../components/answers/AnswerList.tsx";
import { StarItemList } from "../components/user/StarItemList.tsx";
export const myTabs = [
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

const topBar = [
	{
		label: '提问',
		key: 'ask',
	},
	{
		label: '回答',
		key: 'answer',
	}
]

const topBar_me = [
	{
		label: '提问',
		key: 'ask',
	},
	{
		label: '回答',
		key: 'answer',
	},
	{
		label: '收藏',
		key: 'star',
	},
	{
		label: '点赞',
		key: 'like',
	}
]

// user-self data view
export const UserInfoView = () => {
	const params = useParams();
	const [user, setUser] = useState<IUser>(EmptyUser);
	const [questions, setQuestions] = useState<IQuestionCard[]>([]);
	const [questions_star, setQuestions_star] = useState<IQuestionCard[]>([]);
	const [questions_like, setQuestions_like] = useState<IQuestionCard[]>([]);
	const [answers, setAnswers] = useState<IAnswerRecord[]>([]);
	const [answers_star, setAnswers_star] = useState<IAnswerRecord[]>([]);
	const [answers_like, setAnswers_like] = useState<IAnswerRecord[]>([]);
	const [tab, setTab] = useState<string>("提问");
	const [tabKey, setTabKey] = useState<string>("ask")
	const [me, setMe] = useState<boolean>(false);
	const [isFollowed, setIsFollowed] = useState<boolean>(false)
	useEffect(() => {
		const getUserInfo = async (id: string) => {
			if(!params.userid) return;
			//get user information
			const user_response = await User_GetUser(id);
			if (!user_response.ok) return;
			let new_user = await user_response.json();
			setUser(new_user);
			if(new_user.username == localStorage.getItem('username'))
				setMe(true);
			//get all questions raised by this user
			const ques_response = await User_GetQuestions(params.userid);
			if(ques_response) {
				let questions_json = await ques_response.json()
				setQuestions(await questions_json.result)
			}
			//get all answers created by this user
			const ans_response = await User_GetAnswers(params.userid);
			if(ans_response) {
				let answers_json = await ans_response.json()
				setAnswers(await answers_json.result)
			}
			//get all questions starred by this user
			const ques_star_response = await User_GetStarQuestions();
			if(ques_star_response) {
				let questions_star_json = await ques_star_response.json()
				setQuestions_star(await questions_star_json.result)
			}
			//get all answers starred by this user
			const ans_star_response = await User_GetStarAnswers();
			if (ans_star_response) {
				let answers_star_json = await ans_star_response.json()
				setAnswers_star(await answers_star_json.result)
			}
			//get all questions liked by this user
			const ques_like_response = await User_GetLikeQuestions();
			if(ques_like_response) {
				let questions_like_json = await ques_like_response.json()
				setQuestions_like(await questions_like_json.result)
			}
			//get all answers liked by this user
			const ans_like_response = await User_GetLikeAnswers();
			if (ans_like_response) {
				let answers_like_json = await ans_like_response.json()
				setAnswers_like(await answers_like_json.result)
			}
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
						<text className={'follower_number'}>{`${user.followedCount} followers`}</text>
						<text className={'following_number'}>{`${user.followingCount} following`}</text>
						<p>
							<text className={"register_time"}>注册时间:{`${user.registerTime}`}</text>
							<br />
							<text className={"last_login"}>最近登录:{`${user.lastLogin}`}</text>
						</p>
						<text className={"location"}><EnvironmentOutlined style={{fontSize:'0.8rem',marginRight:'0.5rem'}}/>{user.location}</text>
						<text className={'profile'}>{user.about}</text>
					</div>
					<p className={"tags"}>
						<text style={{marginRight:'3%'}}>标签:</text>
					{/*	<span>*/}
					{/*		(user.fields?)*/}
					{/*{user.fields.map((field: ITag) => (*/}
					{/*	<TagShowItem tag_name={field.content}/>*/}
					{/*))}*/}
					{/*</span>*/}
					</p>
				</div>
				<div className={"follow-button-container"}>
					{
						!me &&
						<div className={"follow-button"}>关注</div>
					}
					{
						me &&
						<div className={"follow-button"}>编辑资料</div>
					}
				</div>
			</div>
			<div className={"tab-bar-container"}>
				<Tabs defaultActiveKey="1" activeKey={tabKey} items={me ? topBar_me : topBar} size={'large'} tabBarGutter={100} onChange={(value) =>{
					setTab(value)
					setTabKey(value)
				}}/>
				{
					tabKey == 'ask' && <QuestionList questions={questions}/>
				}
				{
					tabKey == 'answer' && <AnswerList answers={answers}/>
				}
				{
					tabKey == 'star' && <StarItemList questions={questions_star} answers={answers_star} type={'star'}/>
				}
				{
					tabKey == 'like' && <StarItemList questions={questions_like} answers={answers_like} type={'like'}/>
				}
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
