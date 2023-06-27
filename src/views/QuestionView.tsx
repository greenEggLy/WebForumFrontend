import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IQuestion} from "../Interface.ts";
import {EmptyQuestion} from "../data/EmptyObject.ts";
import {Que_GetQuestion} from "../service/QuestionService.ts";
import { message, Space, Tag } from "antd";
import {VoteBar} from "../components/question/question-page/VoteBar.tsx";
import {AnswerContent} from "../components/question/question-page/AnswerContent.tsx";
import {CSSProperties} from "react";
import { Editor } from "@bytemd/react";
import "./QuestionView.css"

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
	tags: [
		{
			id: 1,
			content: "暑假",
		},
		{
			id: 2,
			content: "SJTU",
		},
		{
			id: 3,
			content: "SE",
		}
	],
	answers: [
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
		}
	]
}

export const QuestionView = () => {
	const params = useParams();
	const [question, setQuestion] = useState<IQuestion>(EmptyQuestion);
	const [answer, setAnswer] = useState<string>("");
	useEffect(() => {
		const getQuestionById = async () => {
			if (!params.quesid) return;
			const response = await Que_GetQuestion(params.quesid);
			if (!response.ok) {
				message.error("get question error");
				return;
			}
			//setQuestion(await response.json());
		};
		getQuestionById().catch((err) => console.error(err));
		setQuestion(testQuestion)
	}, [params.quesid]);

	return (
		<div className={'container'}>
			<div className={"view-title"}>
				<h1>{question.title}</h1>
			</div>
			<Space size={[0, 8]}>
				{question.tags.map(tag => (
					    <Tag color="blue">{tag.content}</Tag>
					))
				}
			</Space>
			<div className={"question-container"}>
				<div className={'vote-bar-container'} >
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
				question.answers.map(answer => (
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
			</div>
			<div className={"question-answer-input"}>
				<Editor value={answer} onChange={(v) => setAnswer(v)}/>
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
	questionContainer:{
		width: "100%",
		height: "30vh"
	},
	questionContentContainer: {
		width: "92%",
		float: "right",
	}
}
