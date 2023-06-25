import {IQuestionCard} from "../../../Interface.ts";


interface Props {
    question: IQuestionCard;
}

export const QuestionCard = ({question}:Props) =>{
    
    return(
        <div className={"question-card"}>
            <div className={"question-card-title"}>
                <text>{question.title}</text>
            </div>
            <div className={"question-card-info"}>
                <span>
                    <text>{`${question.browse_time} times view`}</text>
                    <text>{`${question.last_edit} last edit`}</text>
                </span>
            </div>
            <div className={"question-card-tag"}>
                
            </div>
        </div>
    );
}