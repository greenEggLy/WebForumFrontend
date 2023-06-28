import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IUser} from "../Interface.ts";
import {EmptyUser} from "../data/EmptyObject.ts";
import {User_GetUser} from "../service/UserService.ts";
import {TagShowItem} from "../components/tag/TagShowItem.tsx";
import {QuestionCard} from "../components/question/question-page/QuestionCard.tsx";
import {AnswerCard} from "../components/users/AnswerCard.tsx";
import {TestUser} from "../constants/test.ts";
import './UserInfoView.css'

// user-self data view
export const UserInfoView = () => {
	const params = useParams();
	// const [user, setUser] = useState<IUser>(EmptyUser);
	// useEffect(() => {
	// 	const getUserInfo = async (id: string) => {
	// 		const response = await User_GetUser(id);
	// 		if (!response.ok) return;
	// 		setUser(await response.json());
	// 	};
	// 	if (!params.userid) return;
	// 	getUserInfo(params.userid).catch((err) => console.error(err));
	// }, [params.userid]);
	const user=TestUser;
	return (
		<div className={"info-all"}>
			<div className={"simple-info"}>
				<div className={"user-avatar-container"}>
					<img className={"avatar"} src={user.avatar} />
				</div>
				<div className={"user-description-container"}>
					<div className={"username"}>{user.username}</div>
					<div>
						<text className={"register_time"}>注册时间:2022-06-27</text>

						<text className={"location"}>{user.location}</text>

					</div><text className={"profile"}>{user.profile}</text>
				</div>
			</div>
			<div className={"details"}>
				<p>
					<text>我的标签:</text>
				<span>
					{user.fields.map((field:ITag) => (
						<TagShowItem tag_name={field.content}/>
					))}
					</span>
				</p>
				<p className={"email"}>邮箱:{user.email}</p>
				<p >地址:{user.location}</p>
			</div>
			{/*<div className={"user-likes-and-save"}>*/}
			{/*	{*/}
			{/*		user.like_questions.map(question => (*/}
			{/*			<QuestionCard question={question}/>*/}
			{/*		))*/}
			{/*	}*/}
			{/*	{*/}
			{/*		user.star_questions.map(question => (*/}
			{/*			<QuestionCard question={question}/>*/}
			{/*		))*/}
			{/*	}*/}
			{/*</div>*/}
			{/*<div className={"user-creates-and-answers"}>*/}
			{/*	{*/}
			{/*		user.questions.map(question => (*/}
			{/*			<QuestionCard question={question}/>*/}
			{/*		))*/}
			{/*	}*/}
			{/*	{*/}
			{/*		user.answers.map(answer => (*/}
			{/*			<AnswerCard answer={answer}/>*/}
			{/*		))*/}
			{/*	}*/}
			{/*</div>*/}
		</div>
	);
};
