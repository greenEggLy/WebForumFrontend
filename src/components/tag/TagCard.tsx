import {ITag} from "../../Interface.ts";
import './TagCard.css'
import {Tag} from "antd";
import { useNavigate } from "react-router-dom";


interface Props {
	tag: ITag
}


// tag card for question search(big)
export const TagCard = ({tag}: Props) => {
	const navigate = useNavigate()
	console.log(tag)
	const handleClick = () => {
		navigate('/questions?tag=' + tag.content)
	}
	return (
		<div className={'tag-card'} onClick={handleClick}>
			<Tag className={'tag'} color={"blue"}>{tag.content}</Tag>
			<div className={'tag-description-container'}>
				<span className={'tag-description'}>{tag.description}</span>
			</div>
			<div className={'tag-question-number-container'}>
				<span className={'tag-question-number'}>{tag.question_number + ' questions'}</span>
			</div>
		</div>
	)
}
