import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IQuestionCard} from "../Interface.ts";
import {history} from "../service/History.ts";
import {message} from "antd";
import {Ques_GetQuestionsByTag, Ques_GetQuestionsByTagAndTab} from "../service/QuestionsService.ts";
import {QuestionCard} from "../components/question/question-page/QuestionCard.tsx";
import {FilterTabItem} from "../components/users/FilterTabItem.tsx";
import {tabs} from "./QuestionsView.tsx";
import {ITab} from "./UsersView.tsx";

export const TagQuestionsView = () => {
	const params = useParams();
	const [tag, setTag] = useState<string>("")
	const [questions, setQuestions] = useState<IQuestionCard[]>([])
	useEffect(() => {
		const tag = params.content;
		if (!tag) {
			message.error("请提供tag信息")
			history.back();
			return;
		}
		setTag(tag)
		getQuestionsByTag(tag).catch(err => console.error(err))
	}, [params.content])

	const getQuestionsByTag = async (tag: string) => {
		const response = await Ques_GetQuestionsByTag(tag)
		if (!response.ok) {
			message.error("error")
			history.back();
			return
		}
		setQuestions(await response.json())
	}

	const tabFilter = async (tab: ITab | string) => {
		let response: Response
		if (typeof tab === "string")
			response = await Ques_GetQuestionsByTagAndTab(tag, tab)
		else {
			response = await Ques_GetQuestionsByTagAndTab(tag, tab.tab)
		}
		if (!response.ok) {
			message.error("err")
			return;
		}
		setQuestions(await response.json())
	}


	return (
		<div className={"questions-view"}>
			<div className={"view-title"}>
				{`Filter Questions by Tag: ${params.content}`}
			</div>
			<div className="filter-tabs">
				<FilterTabItem tabs={tabs} func={tabFilter} />
			</div>
			<div className={"questions"}>
				{
					questions.map(question => <QuestionCard question={question}/>)
				}
			</div>
		</div>)
}
