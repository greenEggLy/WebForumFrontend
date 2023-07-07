import {CSSProperties, useEffect, useState} from "react";
import {IAnswerBrief, IQuestion, ISearchAnswersResponse} from "../Interface.ts";
import {EmptyQuestion} from "../data/EmptyObject.ts";
import {Que_GetQuesAnswer, Que_GetQuestion} from "../service/QuestionService.ts";
import {Ans_PostAnswer} from "../service/AnswerService.ts";
import {message, Pagination, Space, Tag} from "antd";
import {VoteBar} from "../components/question/question-page/VoteBar.tsx";
import {AnswerContent} from "../components/question/question-page/AnswerContent.tsx";
import {Editor} from "@bytemd/react";
import "./css/QuestionView.css"
import { isLogin } from "../utils/login.ts";

const parseQuestionURL = (url: string) => {
	const n = url.lastIndexOf('/')
	return url.substring(n + 1)
}

export const QuestionView = () => {
	const [question, setQuestion] = useState<IQuestion>(EmptyQuestion);
	const [answers, setAnswers] = useState<IAnswerBrief[]>([])
	const [answer, setAnswer] = useState<string>("");
	const [currentPage, setCurrentPage] = useState<number>(0)
	const [pageSize, setPageSize] = useState<number>(20);
	const [, setTotalPages] = useState<number>(0)
	const [totalItems, setTotalItems] = useState<number>(0)
	const [quesId, setQuesId] = useState<string>("")
	const postAnswer = async () => {
		if(isLogin()) {
			const response = await Ans_PostAnswer(answer, question.id)
			if (!response.ok) {
				message.error(`post answer failed: ${response.statusText}`)
				return
			}
			window.location.reload();
		}else{
			message.error(`Please login first`)
		}
	}
	useEffect(() => {
		const getQuestionById = async () => {
			const quesId = parseQuestionURL(window.location.href);
			if (quesId === "") return;
			setQuesId(quesId)
			const response = await Que_GetQuestion(quesId);
			const ansResponse = await Que_GetQuesAnswer(quesId);
			if (!response.ok || !ansResponse.ok) {
				message.error("get question error");
				return;
			}
			const pagedAnswers: ISearchAnswersResponse = await ansResponse.json()
			const new_question = await response.json()
			setQuestion(new_question);
			setAnswers(pagedAnswers.result)
			setCurrentPage(pagedAnswers.currentPage)
			setTotalPages(pagedAnswers.totalPages)
			setTotalItems(pagedAnswers.totalItems)
		};
		getQuestionById().catch((err) => console.error(err));
		//setQuestion(testQuestion)
	}, []);

	return (
		<div className={'container'}>
			<div className={"title-container"}>
				<h1>{question.title}</h1>
			</div>
			<div className={"question-info"}>
				{'Asked at ' + question.createTime + ' by ' + question.userCard.userName}
			</div>
			<Space size={[0, 8]}>
				{question.tags.map(tag => (
					<Tag color="blue">{tag.content}</Tag>
				))
				}
			</Space>
			<div className={"question-container"}>
				<div className={'vote-bar-container'}>
					<VoteBar content={question} type={"question"}/>
				</div>
				<div className={'question-content-container'}>
					<AnswerContent content={question.content}/>
				</div>
			</div>
			<div>
				<h2>{totalItems + (totalItems == 1 ? " Answer" : " Answers")}</h2>
			</div>
			<div className={"question-answers"}>
				{
					answers.map(answer => (
						<div className={'question-container'}>
							<hr color='#f1f1f1'/>
							<div style={styles.voteBarContainer}>
								<VoteBar content={answer} type={"answer"}/>
							</div>
							<div className={'question-container'}>
								<AnswerContent content={answer.content}/>
							</div>
						</div>
					))
				}
				<Pagination total={totalItems} defaultPageSize={20} current={currentPage} pageSize={pageSize}
							onChange={async (page, pageSize) => {
								setCurrentPage(page);
								setPageSize(pageSize)
								const response = await Que_GetQuesAnswer(quesId, page, pageSize)
								if (!response.ok) return;
								const answers: ISearchAnswersResponse = await response.json();
								setCurrentPage(answers.currentPage)
								setTotalPages(answers.totalPages)
								setTotalItems(answers.totalItems)
							}}/>
			</div>
			<div className={"question-answer-input"}>
				<Editor value={answer} onChange={(v) => setAnswer(v)}/>
			</div>
			<div className={"post-answer-button-container"} onClick={postAnswer}>
				<div className={"post-answer-button"}>
					发布答案
				</div>
			</div>
		</div>
	);
};

const styles: { [name: string]: CSSProperties } = {
	container: {
		marginLeft: "3rem",
		marginRight: "3rem",
	},
	voteBarContainer: {
		width: "8%",
		float: "left",
	},
	questionContainer: {
		width: "100%",
		height: "30vh"
	},
	questionContentContainer: {
		width: "92%",
		float: "right",
	}
}
