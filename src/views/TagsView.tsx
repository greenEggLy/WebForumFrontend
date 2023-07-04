import {List, message, Pagination} from "antd";
import {useEffect, useState} from "react";
import {ISearchTagsResponse, ITag} from "../Interface.ts";
import {TagCard} from "../components/tag/TagCard.tsx";
import {Tag_SearchTag} from "../service/TagService.ts";
import './css/TagsView.css'
import {SearchBox} from "../components/Home/SearchBox.tsx";

export const TagsView = () => {
	const [tags, setTags] = useState<ITag[]>([])
	const [text, setText] = useState<string>("")
	const [currentPage, setCurrentPage] = useState<number>(0)
	const [pageSize, setPageSize] = useState<number>(20);
	const [, setTotalPages] = useState<number>(0)
	const [totalItems, setTotalItems] = useState<number>(0)

	useEffect(() => {
		getAllTags().catch(err => console.error(err))
		//for test
		// setTags([tag1, tag2, tag3, tag1, tag2])
	}, [])

	const getAllTags = async () => {
		const response = await Tag_SearchTag(currentPage, pageSize);
		if (!response.ok) {
			message.error("error!");
			return;
		}
		const json: ISearchTagsResponse = await response.json();
		setTags(json.result);
		setCurrentPage(json.currentPage)
		setTotalItems(json.totalItems)
		setTotalPages(json.totalPages);
	}
	return (
		<div className={"tags-view-container"}>
			<div className={"title-container"}>
				<h2>Tags</h2>
			</div>
			<div className={'tag-search-bar-container'}>
				{/*<Search placeholder={"Search tags"}/>*/}
				<SearchBox
					placeholder={'search'}
					category={"tag"} value={text} onChange={setText}/>
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
			<Pagination defaultPageSize={20} pageSize={pageSize} total={totalItems} current={currentPage}
						onChange={async (page, pageSize) => {
							const response = await Tag_SearchTag(page, pageSize, text)
							if (!response.ok) {
								message.error(response.statusText)
								return;
							}
							const json: ISearchTagsResponse = await response.json();
							setTags(json.result)
							setCurrentPage(json.currentPage)
						}}/>
		</div>);
};
