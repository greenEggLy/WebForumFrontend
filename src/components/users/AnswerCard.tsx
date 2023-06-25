import {IAnswerCard} from "../../Interface.ts";
import {Card} from "antd";
import {Link} from "react-router-dom";


interface Props {
	answer: IAnswerCard;
}


// 用户界面显示自己回答的问题
export const AnswerCard = ({answer}: Props) => {
	return (
		<Card className={"answer-card"}>
			<Link to={`/question/${answer.question_id}`}>
				<text className={"answer-card-content"}>
					{answer.content}
				</text>
				<text className={"answer-card-create-time"}>
					{answer.create_time.toTimeString()}
				</text>
			</Link>
		</Card>
	)
}
