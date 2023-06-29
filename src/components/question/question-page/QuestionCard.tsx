import {IQuestionCard} from "../../../Interface.ts";
import {TagShowItem} from "../../tag/TagShowItem.tsx";
import './QuestionCard.css'
import { Col, Row } from "antd";
import {timeDiff} from "../../../utils/time.ts";

interface Props {
	question: IQuestionCard;
	click: (id: number) => void;
}

// 问题缩略图
export const QuestionCard = ({question, click}: Props,) => {

	// 定义一个函数，接受一个Date类型的参数



	return (
		<div className={"question-card"} >
			<div className={"question-popularity-container"}>
				<Row>
					<Col span={3} >{question.AnswerNumber + (question.AnswerNumber == 1 ? ' Answer' : ' Answers')}</Col>
					<Col span={6} >{question.VoteNumber + (question.VoteNumber == 1 ? ' Like' : ' Likes')}</Col>
				</Row>
			</div>
			<div className={"question-card-title-container"}>
				<a className={"question-card-title"} onClick={() => {click(question.Id)}}>{question.Title}</a>
			</div>
			<div className={'question-card-footer'}>
				<div className={"question-card-tag-container"}>
					{
						question.Tags.map(tag => {
							return (<span> <TagShowItem tag_name={tag.content}/> </span>)
						})
					}
				</div>
				<div className={'question-time-container'}>
					{timeDiff(question.CreateTime)}
				</div>
			</div>
		</div>
	);
}
