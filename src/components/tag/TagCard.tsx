import {ITag} from "../../Interface.ts";
import {Card} from "antd";
import {history} from "../../service/History.ts";
import {TagShowItem} from "./TagShowItem.tsx";


interface Props {
	tag: ITag
}


// tag card for question search(big)
export const TagCard = ({tag}: Props) => {
	return (
		<Card onClick={() => history.push(`/questions/tag/${tag.content}`)}>
			<TagShowItem tag_name={tag.content}/>
		</Card>
	)
}
