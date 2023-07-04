import {IQuestionCard} from "../../../Interface.ts";
import {TagShowItem} from "../../tag/TagShowItem.tsx";
import './QuestionCard.css'
import {Col, Row} from "antd";
import {timeDiff} from "../../../utils/time.ts";
import {useNavigate} from "react-router-dom";

interface Props {
	question: IQuestionCard;
}

// 问题缩略图
export const QuestionCard = ({question}: Props,) => {

	const navigate = useNavigate();
	// 定义一个函数，接受一个Date类型的参数
	return (
		<div className={"question-card"}>
			<div className={"question-popularity-container"}>
				<Row>
					<Col span={3}>{question.answerNumber + (question.answerNumber == 1 ? ' Answer' : ' Answers')}</Col>
					<Col span={6}>{question.voteNumber + (question.voteNumber == 1 ? ' Like' : ' Likes')}</Col>
				</Row>
			</div>
			<div className={"question-card-title-container"}>
				<a className={"question-card-title"} onClick={() => {
					navigate(`/question/${question.Id}`)
				}}>{question.title}</a>
				<div className={'question-time-container'}>
					{timeDiff(question.createTime)}
				</div>
			</div>
			<div className={'question-card-footer'}>
				<div className={"question-card-tag-container"}>
					{
						question.tags?
							question.tags.map(tag => {
								return (<span> <TagShowItem tag_name={tag.content} /> </span>)
							})
							:
							[]
					}
				</div>

			</div>
		</div>
	);
}
