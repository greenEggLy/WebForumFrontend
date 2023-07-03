import {useParams} from "react-router-dom";
import {TagShowItem} from "../components/tag/TagShowItem.tsx";
import {User1} from "../constants/test.ts";
import './css/UserInfoView.css'
import {ITag} from "../Interface.ts";
import StatisticBar from "../components/statistic/StatisticBar.tsx";
import {Input} from "antd";

const options =
	[
		{
			value:'answer',
			label:'回答',
		},
		{
			value:'ask',
			label:'提问',
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
	const user = User1;
	return (
		<div className={"info-all"}>
			<div className={"simple-info"}>
				<div className={"user-avatar-container"}>
					<img className={"avatar"} src={user.avatar}/>
				</div>
				<div className={"user-description-container"}>
					<div className={"username"}>{user.username}</div>
					<div>
						<text className={"register_time"}>注册时间:2022-06-27</text>
						<text className={"location"}>{user.location}</text>

					</div>
					<text className={"profile"}>{user.profile}</text>
				</div>
			</div>

			<div className={"details"}>
				<Input placeholder="个人简介"></Input>
				<p className={"tags"}>
					<text>我的标签:</text>
					<span>
					{user.fields.map((field: ITag) => (
						<TagShowItem tag_name={field.content}/>
					))}
					</span>
				</p>
				<p>地址:{user.location}</p>
			</div>
			<div>
				<StatisticBar options={options}/>
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
