import {IQuestionCard} from "../../Interface.ts";
import './RankCard.css'
import {Card, Col, List, Row} from "antd";
import {TrophyTwoTone} from '@ant-design/icons'
import {useNavigate} from "react-router-dom";

//Question Card为返回的所推荐/最热的问题
//type为Card的种类名
interface AllProps {
	questions: IQuestionCard[];
	type: string;
}

interface Props {
	question: IQuestionCard;
	click: (id: number) => void;
}

export const QuestionContent = ({question, click}: Props,) => {


	// 定义一个函数，接受一个Date类型的参数


	return (
		<div>

			<div className={"question-card-title-container"}>
				<a className={"question-card-title"} onClick={() => {
					click(question.id)
				}}>{question.Title}</a>
			</div>
			<div className={"question-popularity-container"}>
				<Row>
					<Col span={7}>{question.AnswerNumber + (question.AnswerNumber == 1 ? ' Answer' : ' Answers')}</Col>
					<Col span={7}>{question.VoteNumber + (question.VoteNumber == 1 ? ' Like' : ' Likes')}</Col>
				</Row>
			</div>
		</div>
	);
}
export const RankCard = ({questions, type}: AllProps,) => {
	const navigate = useNavigate()
	const clickQuestion = (questionId: number) => {
		const navigateUrl = `/question/${questionId}`
		navigate(navigateUrl)
	}
	return (
		<div>
			<Card className={"rank-card"} title={
				<div>
					<TrophyTwoTone twoToneColor="#f7b731" color={"#fed330"} style={{marginRight: '0.5rem'}}/>
					{type}</div>}>
				<div className={"question-list-container"}>
					<List>
						{
							questions.map(question => (
									<div>
										<QuestionContent question={question} click={clickQuestion}/>
									</div>
								)
							)
						}
					</List>
				</div>

			</Card>
		</div>);
}
export default RankCard;
