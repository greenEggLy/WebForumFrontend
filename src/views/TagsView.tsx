import { List, message } from "antd";
import {useEffect, useState} from "react";
import {ITag} from "../Interface.ts";
import {TagCard} from "../components/tag/TagCard.tsx";
import {Tag_GetAllTags} from "../service/TagService.ts";
import {tag1, tag2, tag3} from "../constants/test"
import './TagsView.css'
import Search from "antd/es/input/Search";

export const TagsView = () => {
	const [tags, setTags] = useState<ITag[]>([])

	useEffect(() => {
		getAllTags().catch(err => console.error(err))
		//for test
		setTags([tag1, tag2, tag3, tag1, tag2])
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
		<div className={"title-container"}>
			<h2>Tags</h2>
		</div>
		<div className={'tag-search-bar-container'}>
			<Search placeholder={"Search tags"} />
		</div>
		<div className={'tag-card-container'}>
			<List
				grid={{gutter: 16, column: 4}}
				dataSource={tags}
				renderItem={item => <TagCard tag={item}/>}
				style={{marginLeft: '1rem'}}
			>
			</List>
		</div>
	</div>);
};
