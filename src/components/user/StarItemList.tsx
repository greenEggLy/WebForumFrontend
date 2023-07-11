import { IAnswerRecord, IQuestionCard } from "../../Interface.ts";
import "./StarItemList.css";
import { QuestionList } from "../question/question-page/QuestionList.tsx";
import { AnswerList } from "../answers/AnswerList.tsx";

interface Props {
  questions: IQuestionCard[];
  answers: IAnswerRecord[];
  type: "like" | "star";
}

export const StarItemList = ({ questions, answers, type }: Props) => {
  return (
    <div className={"star-item-list-container"}>
      <div className={"star-question-list"}>
        <h2 style={{marginLeft:'1rem'}}>{
          type === "like" ? "点赞的问题" : "收藏的问题"
        }</h2>
        <QuestionList questions={questions}/>
      </div>
      <div className={"star-answer-list"}>
        <h2 style={{marginLeft:'1rem'}}>{
          type === "like" ? "点赞的回答" : "收藏的回答"
        }</h2>
        <AnswerList answers={answers}/>
      </div>
    </div>
  )
}