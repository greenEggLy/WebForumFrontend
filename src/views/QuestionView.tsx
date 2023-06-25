import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IQuestion} from "../Interface.ts";
import {EmptyQuestion} from "../data/EmptyObject.ts";
import {Que_GetQuestion} from "../service/QuestionService.ts";
import {message} from "antd";
import {QuestionVote} from "../components/question/question-page/QuestionVote.tsx";
import {AnswerContent} from "../components/question/question-page/AnswerContent.tsx";

export const QuestionView = () => {
	const params = useParams();
	const [question, setQuestion] = useState<IQuestion>(EmptyQuestion);
	useEffect(() => {
		const getQuestionById = async () => {
			if (!params.quesid) return;
			const response = await Que_GetQuestion(params.quesid);
			if (!response.ok) {
				message.error("get question error");
				return;
			}
			setQuestion(await response.json());
		};
		getQuestionById().catch((err) => console.error(err));
	}, [params.quesid]);

	return (
		<div>
			<div className={"view-title"}>{question.title}</div>
			<div className={"question-content"}>
        <span>
          <QuestionVote question={question}/>
			{/*<QuestionContent content={question.content} />*/}
			<AnswerContent content={question.content}/>
        </span>
			</div>
			<div className={"question-answers"}>{}</div>
		</div>
	);
};
