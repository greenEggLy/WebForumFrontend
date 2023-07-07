import {IAnswerBrief, IQuestion} from "../../../Interface.ts";
import {Button, message} from "antd";
import {CaretDownOutlined, CaretUpOutlined, StarFilled, StarOutlined} from '@ant-design/icons'
import {useEffect, useState} from "react";
import {Que_DislikeQuestion, Que_LikeQuestion, Que_StarQuestion} from "../../../service/QuestionService.ts";
import "./VoteBar.css"
import { Ans_DislikeAnswer, Ans_LikeAnswer, Ans_StarAnswer } from "../../../service/AnswerService.ts";

interface Props {
	content: IQuestion | IAnswerBrief;
	type: "question" | "answer";
}

const buttonColor = [
	'#b9b9b9',
	'#82aebb',
	'#b78484',
]

// 问题点赞
export const VoteBar = ({content, type}: Props) => {
	// 0 none, 1 up, 2 down
	const [status, setStatus] = useState<0 | 1 | 2>(0)
	const [likeCount, setLikeCount] = useState<number>(content.likeCount - content.dislikeCount);
	const [star, setStar] = useState<boolean>(content.userAction.userStar)
	useEffect(() => {
		console.table(content)
		if (content.userAction.userLike) setStatus(1);
		else if (content.userAction.userDislike) setStatus(2);
		else setStatus(0)
		setStar(content.userAction.userStar)
		setLikeCount(content.likeCount - content.dislikeCount)
	}, [content])

	const getColor = (button: "up" | "down" | "none"): string => {
		if (button === "up") {
			if (status === 1) return buttonColor[1];
			else return buttonColor[0]
		} else if (button === "down") {
			if (status === 2) return buttonColor[2];
			else return buttonColor[0]
		} else {
			if (star) return buttonColor[1];
			else return buttonColor[0]
		}
	}

	const clickLike = async () => {
		let response = null
		if(type === "question") {
			response = await Que_LikeQuestion(content.id)
		}
		else
			response = await Ans_LikeAnswer(content.id)
		if (!response.ok) {
			message.error(`like failed: ${response.statusText}`)
			return;
		}
		if (status === 1) {
			setLikeCount(likeCount - 1)
			setStatus(0)
		} else if (status === 2) {
			setLikeCount(likeCount + 2)
			setStatus(1)
		} else {
			setLikeCount(likeCount + 1);
			setStatus(1);
		}
	}

	const clickDislike = async () => {
		let response = null
		if(type === "question") {
			response = await Que_DislikeQuestion(content.id)
		}else{
			response = await Ans_DislikeAnswer(content.id)
		}
		if (!response.ok) {
			message.error(`dislike failed: ${response.statusText}`)
			return;
		}
		if (status === 1) {
			setLikeCount(likeCount - 2)
			setStatus(2)
		} else if (status === 0) {
			setLikeCount(likeCount - 1)
			setStatus(2)
		} else {
			setLikeCount(likeCount + 1)
			setStatus(0)
		}
	}

	const clickStar = async () => {
		let response = null
		if(type === "question") {
			response = await Que_StarQuestion(content.id)
		}else{
			response = await Ans_StarAnswer(content.id)
		}
		if (!response.ok) {
			message.error(`star failed: ${response.statusText}`)
			return;
		}
		setStar(!star);
	}


	return (
		<div className="question-vote-bar">
			<Button className={"vote-button"} color={getColor("up")} onClick={() => clickLike()}>
				<CaretUpOutlined className={'icon'} style={{color: status == 1 ? buttonColor[1] : buttonColor[0]}}/>
			</Button>
			<div className="vote-number">{likeCount}</div>
			<Button className={"vote-button"} color={getColor("down")} onClick={() => clickDislike()}>
				<CaretDownOutlined className={'icon'} style={{color: status == 2 ? buttonColor[2] : buttonColor[0]}}/>
			</Button>
			<Button className={"star-button"} onClick={() => clickStar()}>
				{star ? <StarFilled className={'icon-star'}/> : <StarOutlined className={"icon"}/>}
			</Button>
		</div>
	);

};


