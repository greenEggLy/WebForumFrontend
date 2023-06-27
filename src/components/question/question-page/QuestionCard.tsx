import {IQuestionCard} from "../../../Interface.ts";
import {TagShowItem} from "../../tag/TagShowItem.tsx";


interface Props {
	question: IQuestionCard;
	click: (id: number) => void;
}

// 问题缩略图
export const QuestionCard = ({question, click}: Props,) => {

	return (
		<div className={"question-card"} >
			<div className={"question-card-title"}>
				<a onClick={() => {click(question.id)}}>{question.title}</a>
			</div>
			<div className={"question-card-info"}>
                <span>
                    <text>{`${question.browse_time} times view`}</text>
                    <text>{`${question.last_edit} last edit`}</text>
                </span>
			</div>
			<div className={"question-card-tag"}>
				{
					question.tags.map(tag => {
						return (<span> <TagShowItem tag_name={tag.content}/> </span>)
					})
				}
			</div>
		</div>
	);
}
