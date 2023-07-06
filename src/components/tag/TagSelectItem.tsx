//ABORTED


import {ITag} from "../../Interface.ts";
import React from "react";

interface Props {
	tag: ITag;
	tags: ITag[];
	setTags: React.Dispatch<React.SetStateAction<ITag[]>>;
}


// tag选择项, 在tag-selector中使用
export const TagSelectItem = ({tag, tags, setTags}: Props) => {
	return (
		<span className={"one-tag"}>
      {tag.content}
			<button
				className={"remove-button"}
				title={"remove"}
				onClick={() => {
					const index = tags.indexOf(tag);
					const tags_tmp = tags;
					tags_tmp.splice(index, 1);
					console.log(tags_tmp);
					setTags(tags_tmp);
				}}
			>
        <svg className="svg-icon" width="14" height="14" viewBox="0 0 14 14">
          <path
			  d="M12 3.41L10.59 2 7 5.59 3.41 2 2 3.41 5.59 7 2 10.59 3.41 12 7 8.41 10.59 12 12 10.59 8.41 7z"></path>
        </svg>
      </button>
    </span>
	);
};
