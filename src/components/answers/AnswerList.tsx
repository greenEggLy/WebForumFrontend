import { IAnswerRecord } from "../../Interface.ts";
import { List } from "antd";
import { useNavigate } from "react-router-dom";

interface Props {
  answers: IAnswerRecord[];

}

export const AnswerList = ({answers}: Props) => {
  const navigate = useNavigate();
  console.log(answers)
  return (
    <div className={"answer-list-container"}>
      <List>
        {
          answers?
            answers.map(answer => (
                <div className={'question-card'} onClick={() => {
                  navigate(`/question/${answer.questionId}?answerId=${answer.id}`)
                }}>
                  {answer.content}
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