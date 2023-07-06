import {ITag} from "../../Interface.ts";
import {List} from "antd";
import React from "react";
import "./TagSelector.css";

interface Props {
	tagsFound: ITag[];
	questionTags: ITag[];
	setTagText: React.Dispatch<React.SetStateAction<string>>;
	setTagsFound: React.Dispatch<React.SetStateAction<ITag[]>>;
	setQuestionTags: React.Dispatch<React.SetStateAction<ITag[]>>;
}


// tag选择器, 创建问题时选择
export const TagSelector = ({
								tagsFound,
								questionTags,
								setTagText,
								setTagsFound,
								setQuestionTags,
							}: Props) => {
	console.log(tagsFound)
	if (tagsFound.length == 0) {
		console.log("nothing found here!")
		return <></>
	}
	return (
		<List
			size="small"
			bordered
			dataSource={tagsFound}
			renderItem={(item) => (
				<List.Item
					onClick={() => {
						setTagText("");
						setTagsFound([]);
						const newTags = questionTags;
						if(questionTags.length == 5){
							alert("最多只能选择5个标签");
							return;
						}
						for(let i = 0; i < questionTags.length; i++){
							if(questionTags[i].id == item.id){
								alert("不能重复选择标签");
								return;
							}
						}
						newTags.push(item);
						setQuestionTags(newTags);
					}}
					className={"tag-select-item"}
				>
					{item.content}
				</List.Item>
			)}
		/>
	);
};
