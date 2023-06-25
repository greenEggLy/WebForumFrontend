import { MarkDownEditor } from "../components/question/MarkDownEditor.tsx";
import { useState } from "react";
import { ITag } from "../Interface.ts";
import { TagSelectItem } from "../components/question/TagSelectItem.tsx";
import { Tag_GetPossibleTags } from "../service/TagService.ts";
import { message } from "antd";
import { TagSelector } from "../components/question/TagSelector.tsx";
import { Que_PostQuestion } from "../service/QuestionService.ts";

export const AskQuestionView = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tagText, setTagText] = useState<string>("");
  const [questionTags, setQuestionTags] = useState<ITag[]>([]);
  const [foundTags, setFoundTags] = useState<ITag[]>([]);

  const getPossibleTags = async () => {
    const response = await Tag_GetPossibleTags(tagText);
    if (!response.ok) message.error("get tags error!");
    const json: Promise<ITag[]> = response.json();
    setFoundTags(await json);
  };

  const postNewQuestion = async () => {
    const response = await Que_PostQuestion(title, content, questionTags);
    if (!response.ok) {
      message.error("post question error!");
      return;
    }
    window.location.replace("/");
  };

  return (
    <div style={{textAlign:"left",alignItems:"flex-start"}}>
      <div>ask-question</div>
      <div className={"raw-text-editor"}>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div className={"markdown-editor"}>
        <MarkDownEditor value={content} setValue={setContent} />
      </div>
      <div className={"tag-chose"}>
        <span className={"chosen-tags"}>
          {questionTags.map((item) => (
            <TagSelectItem
              tag={item}
              tags={questionTags}
              setTags={setQuestionTags}
            />
          ))}
        </span>
        <span className={"input-text"}>
          <input
            value={tagText}
            onChange={(event) => {
              setTagText(event.target.value);
              //TODO: debounce operation
              getPossibleTags().catch((err) => console.error(err));
            }}
          />
        </span>
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
    </div>
  );
};
