import {IQuestionCard} from "../../../Interface.ts";
import {TagShowItem} from "../../tag/TagShowItem.tsx";


interface Props {
	question: IQuestionCard;
}

// 问题缩略图
export const QuestionCard = ({question}: Props) => {

	return (
		<div className={"question-card"}>
			<div className={"question-card-title"}>
				<text>{question.Title}</text>
			</div>
			<div className={"question-card-info"}>
                <span>
                    <text>{`${question.browse_time} times view`}</text>
                    <text>{`${question.last_edit} last edit`}</text>
                </span>
			</div>
			<div className={"question-card-tag"}>
				{
					question.Tags.map(tag => {
						return (<span> <TagShowItem tag_name={tag.content}/> </span>)
					})
				}
			</div>
		</div>
	);
}
