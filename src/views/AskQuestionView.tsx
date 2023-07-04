import {MarkDownEditor} from "../components/question/question-create/MarkDownEditor.tsx";
import {useEffect, useState} from "react";
import {ITag} from "../Interface.ts";
import {TagSelectItem} from "../components/tag/TagSelectItem.tsx";
import {Tag_SearchTag} from "../service/TagService.ts";
import {message} from "antd";
import {TagSelector} from "../components/tag/TagSelector.tsx";
import {Que_PostQuestion} from "../service/QuestionService.ts";
import "./css/AskQuestionView.css"


//edit and ask question
export const AskQuestionView = () => {
	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [tagText, setTagText] = useState<string>("");
	const [questionTags, setQuestionTags] = useState<ITag[]>([]);
	const [foundTags, setFoundTags] = useState<ITag[]>([]);

	useEffect(() => {
		const getPossibleTags = setTimeout(async () => {
			const response = await Tag_SearchTag(tagText);
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
		<div className={"ask-question-view-container"}>
			<h2>我要提问</h2>
			<div className={'ask-question-container'}>
				<text style={{fontWeight: 'bold'}}>问题标题</text>
				<div className={"raw-text-editor"}>
					<input
						value={title}
						className={"input-box"}
						onChange={(event) => setTitle(event.target.value)}
						placeholder={'你遇到了什么问题？'}
					/>
				</div>
				<text style={{fontWeight: 'bold'}}>问题内容</text>
				<div className={"markdown-editor"}>
					<MarkDownEditor value={content} setValue={setContent}/>
				</div>
				<div className={"tag-chose"}>
					<text style={{fontWeight: 'bold'}}>问题标签（至多5个）</text>
					<div className={"chosen-tags"}>
						{
							questionTags.map(item => {
								return <span><TagSelectItem tag={item} tags={questionTags}
															setTags={setQuestionTags}/></span>
							})
						}
					</div>
					<input
						value={tagText}
						className={'input-box'}
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
			</div>
			<div className={"post-button-frame"}>
				<button className={"post-question-button"} onClick={postNewQuestion}>
					{"POST QUESTION"}
				</button>
			</div>
		</div>
	);
};
