import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IUser} from "../Interface.ts";
import {EmptyUser} from "../data/EmptyObject.ts";
import {User_GetUser} from "../service/UserService.ts";
import {TagShowItem} from "../components/tag/TagShowItem.tsx";
import {QuestionCard} from "../components/question/question-page/QuestionCard.tsx";
import {AnswerCard} from "../components/users/AnswerCard.tsx";
import {useNavigate} from "react-router-dom";


// user-self data view
export const UserInfoView = () => {
	const params = useParams();
	const [user, setUser] = useState<IUser>(EmptyUser);
	const navigate = useNavigate();
	const clickQuestion = (questionId: number) => {
		const navigateUrl = `/question/${questionId}`
		navigate(navigateUrl)
	}
	useEffect(() => {
		const getUserInfo = async (id: string) => {
			const response = await User_GetUser(id);
			if (!response.ok) return;
			setUser(await response.json());
		};
		if (!params.userid) return;
		getUserInfo(params.userid).catch((err) => console.error(err));
	}, [params.userid]);
	return (
		<div>
			<div className={"view-title"}>{"User Info"}</div>
			<div className={"user-info-header-wrapper"}>
				<div className={"user-avatar"}>
					<img alt={"haha"} resource={user.avatar}/>
				</div>
				<div className={"user-meta"}>
					<text className={"user-profile"}>{user.profile}</text>
					<text className={"user-email"}>{user.email}</text>
					<text className={"user-location"}>{user.location}</text>
					<span>
						{user.fields.map((field) => (
							<TagShowItem tag_name={field.content}/>
						))}
					</span>
				</div>
			</div>
			<div className={"user-likes-and-save"}>
				{
					user.like_questions.map(question => (
						<QuestionCard question={question} click={clickQuestion}/>
					))
				}
				{
					user.star_questions.map(question => (
						<QuestionCard question={question} click={clickQuestion}/>
					))
				}
			</div>
			<div className={"user-creates-and-answers"}>
				{
					user.questions.map(question => (
						<QuestionCard question={question} click={clickQuestion}/>
					))
				}
				{
					user.answers.map(answer => (
						<AnswerCard answer={answer}/>
					))
				}
			</div>
		</div>
	);
};
