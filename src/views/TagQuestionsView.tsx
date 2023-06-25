import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IQuestionCard} from "../Interface.ts";
import {history} from "../service/History.ts";
import {message} from "antd";
import {Ques_GetQuestionsByTag} from "../service/QuestionsService.ts";
import {QuestionCard} from "../components/question/question-page/QuestionCard.tsx";

export const TagQuestionsView = () => {
	const params = useParams();
	const [questions, setQuestions] = useState<IQuestionCard[]>([])
	useEffect(() => {
		getQuestionsByTag().catch(err => console.error(err))
	}, [params.content])

	const getQuestionsByTag = async () => {
		const tag = params.content
		if (!tag) {
			message.error("请提供tag信息")
			history.back();
			return;
		}
		const response = await Ques_GetQuestionsByTag(tag)
		if (!response.ok) {
			message.error("error")
			history.back();
			return
		}
		setQuestions(await response.json())
	}


	return (
		<div className={"questions-view"}>
			<div className={"view-title"}>
				{`Filter Questions by Tag: ${params.content}`}
			</div>
			<div className={"questions"}>
				{
					questions.map(question => <QuestionCard question={question}/>)
				}
			</div>
		</div>)
}
