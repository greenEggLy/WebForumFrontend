import {List, message} from "antd";
import {useEffect, useState} from "react";
import {ITag} from "../Interface.ts";
import {TagCard} from "../components/tag/TagCard.tsx";
import {Tag_GetAllTags} from "../service/TagService.ts";

export const TagsView = () => {
	const [tags, setTags] = useState<ITag[]>([])

	useEffect(() => {
		getAllTags().catch(err => console.error(err))
	}, [])

	const getAllTags = async () => {
		const response = await Tag_GetAllTags();
		if (!response.ok) {
			message.error("error!");
			return;
		}
		setTags(await response.json());
	}
	return (<div>
		<div className={"view-title"}>
			{'Tags'}
		</div>
		<List
			grid={{gutter: 16, column: 4}}
			dataSource={tags}
			renderItem={item => <TagCard tag={item}/>}
		>
		</List>
	</div>);
};
