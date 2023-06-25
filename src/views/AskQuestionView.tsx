import {MarkDownEditor} from "../components/question/question-create/MarkDownEditor.tsx";
import {useEffect, useState} from "react";
import {ITag} from "../Interface.ts";
import {TagSelectItem} from "../components/tag/TagSelectItem.tsx";
import {Tag_GetPossibleTags} from "../service/TagService.ts";
import {message} from "antd";
import {TagSelector} from "../components/tag/TagSelector.tsx";
import {Que_PostQuestion} from "../service/QuestionService.ts";


//edit and ask question
export const AskQuestionView = () => {
	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [tagText, setTagText] = useState<string>("");
	const [questionTags, setQuestionTags] = useState<ITag[]>([]);
	const [foundTags, setFoundTags] = useState<ITag[]>([]);

	useEffect(() => {
		const getPossibleTags = setTimeout(async () => {
			const response = await Tag_GetPossibleTags(tagText);
			if (!response.ok) message.error("get tags error!");
			const json: Promise<ITag[]> = response.json();
			setFoundTags(await json);
		}, 2000)
		return () => clearTimeout(getPossibleTags)
	}, [tagText])

	const postNewQuestion = async () => {
		const response = await Que_PostQuestion(title, content, questionTags);
		if (!response.ok) {
			message.error("post question error!");
			return;
		}
		window.location.replace("/");
	};

	return (
		<>
			<div style={{textAlign: "left", alignItems: "flex-start"}}>
				<div>ask-question</div>
				<div className={"raw-text-editor"}>
					<input
						value={title}
						onChange={(event) => setTitle(event.target.value)}
					/>
				</div>
				<div className={"markdown-editor"}>
					<MarkDownEditor value={content} setValue={setContent}/>
				</div>
			</div>
			<div className={"tag-chose"}>
				<div>
					chose question tag
				</div>
				<span className={"chosen-tags"}>
					{
						questionTags.map(item => {
							return <span><TagSelectItem tag={item} tags={questionTags}
														setTags={setQuestionTags}/></span>
						})
					}
				</span>
				<input
					value={tagText}
					onChange={event => {
						setTagText(event.target.value)
					}}
				/>

			</div>
			<div className={"pull-down-tag-selection"}>
				<TagSelector
					tagsFound={foundTags}
					questionTags={questionTags}
					setTagText={setTagText}
					setTagsFound={setFoundTags}
					setQuestionTags={setQuestionTags}
				/>
			</div>

			<div className={"post-button-frame"}>
				<button className={"post-button"} onClick={postNewQuestion}>
					{"POST QUESTION"}
				</button>
			</div>
		</>
	);
};
