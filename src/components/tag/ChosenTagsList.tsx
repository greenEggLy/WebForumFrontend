import { ITag } from "../../Interface.ts";
import React from "react";
import { TagShowItem } from "./TagShowItem.tsx";
import './ChosenTagsList.css'
import { Tag } from "antd";
import color from "../../constants/color.ts";

interface Props {
  tags: ITag[];
  setTags: React.Dispatch<React.SetStateAction<ITag[]>>;
}

export const ChosenTagsList = ({ tags, setTags }: Props) => {
  const removeTag = (tag: ITag) => {
    const index = tags.indexOf(tag);
    const tags_tmp = tags;
    tags_tmp.splice(index, 1);
    setTags(tags_tmp);
  }

  return(
    <div className={"ask-question-tag-container"}>
      {
        tags?
          tags.map(tag => {
            return (<span>
                      <Tag className={"one-tag"}
                                        style={{
                                          marginRight: '0.2rem',
                                          maskSize: '0.3rem',
                                          fontSize: '0.3rem',
                                          color: color.tblue,
                                          borderColor: color.tblue,
                                          backgroundColor: color.lblue
                                        }}
                           closable
                            onClose={(e) => {
                              removeTag(tag)
                            }}
                           key={tag.id}
                      >
                        {tag.content}
                      </Tag>
                    </span>)
          })
          :
          []
      }
    </div>
  )
}
