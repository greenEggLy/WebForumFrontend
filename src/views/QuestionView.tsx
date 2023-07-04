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
import {getQuestionId} from "../utils/path.ts";

const testQuestion: IQuestion = {
	id: '3',
	userCard: {
		id: '3',
		userName: "test",
		avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
	},
	title: "为什么我还没放暑假？",
	content: "为什么我还没放暑假？我要放暑假放暑假放暑假",
	starCount: 1437,
	likeCount: 233,
	dislikeCount: 2023,
	userStar: true,
	userLike: false,
	userDislike: false,
	createTime: new Date().toTimeString(),
	tags: [
		{
			id: 1,
			content: "暑假",
			description: "关于暑假的问题",
			question_number: 3
		},
		{
			id: 2,
			content: "SJTU",
			description: "关于SJTU的问题",
			question_number: 3
		},
		{
			id: 3,
			content: "SE",
			description: "关于SE的问题",
			question_number: 3
		}
	],
	answers: [

	]
}

const testAnswers:IAnswerBrief[]=[
	{
		id: '1',
		userCard: {
			id: '3',
			userName: "test",
			avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
		},
		content: "我也想放暑假",
		likeCount: 233,
		dislikeCount: 2023,
		userLike: false,
		userDislike: true,
		userStar: false,
		createTime: new Date()
	},
	{
		id: '2',
		userCard: {
			id: '3',
			userName: "test",
			avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
		},
		content: "还有18天就放暑假了",
		likeCount: 233,
		dislikeCount: 2023,
		userLike: false,
		userDislike: true,
		userStar: false,
		createTime: new Date(),
	}
]

const parseQuestionURL = (url:string) => {
	let n = url.lastIndexOf('/')
	return url.substring(n + 1)
}



export const QuestionView = () => {
	const [question, setQuestion] = useState<IQuestion>(EmptyQuestion);
	const [answers, setAnswers] = useState<IAnswerBrief[]>([])
	const [answer, setAnswer] = useState<string>("");
	const [currentPage, setCurrentPage] = useState<number>(0)
	const [pageSize, setPageSize] = useState<number>(20);
	const [, setTotoalPages] = useState<number>(0)
	const [totalItems, setTotalItems] = useState<number>(0)
	const postAnswer = () => {
		Ans_PostAnswer(answer, question.id)
	}
	useEffect(() => {
		const getQuestionById = async () => {
			const quesId = parseQuestionURL(window.location.href);
			if (quesId === "") return;
			const response = await Que_GetQuestion(quesId);
			const ansResponse = await Que_GetQuesAnswer(quesId);
			if (!response.ok || !ansResponse.ok) {
				message.error("get question error");
				return;
			}
			const pagedAnswers: ISearchAnswersResponse = await ansResponse.json()
			setQuestion(await response.json());
			setAnswers(pagedAnswers.result)
			setCurrentPage(pagedAnswers.currentPage)
			setTotoalPages(pagedAnswers.totalPages)
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
					<VoteBar content={question}/>
				</div>
				<div className={'question-content-container'}>
					<AnswerContent content={question.content}/>
				</div>
			</div>
			<div>
				<h2>{question.answers.length + (question.answers.length == 1 ? " Answer" : " Answers")}</h2>
			</div>
			<div className={"question-answers"}>
				{
					answers.map(answer => (
						<div className={'question-container'}>
							<hr color='#f1f1f1'/>
							<div style={styles.voteBarContainer}>
								<VoteBar content={answer}/>
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
								const response = await Que_GetQuesAnswer(getQuestionId(window.location.href), page, pageSize)
								if (!response.ok) return;
								const answers: ISearchAnswersResponse = await response.json();
								setCurrentPage(answers.currentPage)
								setTotoalPages(answers.totalPages)
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
