import { List } from "antd";
import { QuestionCard } from "./QuestionCard.tsx";
import React from "react";
import { IQuestionCard } from "../../../Interface.ts";

interface Props {
  questions: IQuestionCard[];
}

export const QuestionList = ({questions}: Props) => {
  console.log(questions)
  return (
    <div className={"question-list-container"}>
      <List>
        {
          questions?
            questions.map(question => (
                <div>
                  <QuestionCard question={question}/>
                </div>
              )
            )
            :
            []
        }
      </List>
    </div>
  )
}