import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IQuestion} from "../Interface.ts";
import {EmptyQuestion} from "../data/EmptyObject.ts";
import {Que_GetQuestion} from "../service/QuestionService.ts";
import { message, Space, Tag } from "antd";
import {VoteBar} from "../components/question/question-page/VoteBar.tsx";
import {AnswerContent} from "../components/question/question-page/AnswerContent.tsx";
import {CSSProperties} from "react";

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
		<div style={styles.container}>
			<div className={"view-title"}>
				<h2>{question.title}</h2>
			</div>
			<Space size={[0, 8]}>
				{question.tags.map(tag => (
					    <Tag color="blue">{tag.content}</Tag>
					))
				}
			</Space>
			<hr color='#f1f1f1'/>
			<div className={"question-content"} style={styles.questionContainer}>
				<div style={styles.voteBarContainer}>
					<VoteBar content={question}/>
				</div>
				<div style={styles.questionContentContainer}>
					<AnswerContent content={question.content}/>
				</div>
			</div>
			<div className={"question-answers"}>{
				question.answers.map(answer => (
					<div  style={styles.questionContainer}>
						<hr color='#f1f1f1'/>
						<div style={styles.voteBarContainer}>
							<VoteBar content={answer}/>
						</div>
						<div style={styles.questionContentContainer}>
							<AnswerContent content={answer.content}/>
						</div>
					</div>
				))
			}</div>
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
