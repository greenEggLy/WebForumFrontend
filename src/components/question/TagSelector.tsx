import { ITag } from "../../Interface.ts";
import { List } from "antd";
import React from "react";

interface Props {
  tagsFound: ITag[];
  questionTags: ITag[];
  setTagText: React.Dispatch<React.SetStateAction<string>>;
  setTagsFound: React.Dispatch<React.SetStateAction<ITag[]>>;
  setQuestionTags: React.Dispatch<React.SetStateAction<ITag[]>>;
}

export const TagSelector = ({
  tagsFound,
  questionTags,
  setTagText,
  setTagsFound,
  setQuestionTags,
}: Props) => {
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
            newTags.push(item);
            setQuestionTags(newTags);
          }}
        >
          {item.content}
        </List.Item>
      )}
    />
  );
};
