import {IAnswerBrief, IQuestion} from "../../../Interface.ts";
import {Button} from "antd";
import {CaretDownOutlined, CaretUpOutlined, StarOutlined} from '@ant-design/icons'
import {useEffect, useState} from "react";
import {Que_DislikeQuestion, Que_LikeQuestion, Que_StarQuestion} from "../../../service/QuestionService.ts";
import "./VoteBar.css"

interface Props {
	content: IQuestion | IAnswerBrief;
}

const buttonColor = [
	'#b9b9b9',
	'#82aebb',
	'#b78484',
]

// 问题点赞
// TODO
export const VoteBar = ({content}: Props) => {
	const [status, setStatus] = useState<0 | 1 | 2>(0)
	const [likeCount, setLikeCount] = useState<number>(content.likeCount);
	const [star, setStar] = useState<boolean>(content.userStar)
	useEffect(() => {
		if (content.userLike) setStatus(1);
		else if (content.userDislike) setStatus(2);
		else setStatus(0)
	}, [content.userDislike, content.userLike])
	const getColor = (button: string): string => {
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
		if (status === 1) {
			setLikeCount(likeCount - 1)
			setStatus(0)
		} else {
			setLikeCount(likeCount + 1);
			setStatus(1);
		}
		const response = await Que_LikeQuestion(content.id)
		if (!response.ok) {
			return;
		}
		/// TODO: return?
	}

	const clickDislike = async () => {
		if (status === 1) {
			setLikeCount(likeCount - 1)
			setStatus(2)
		} else if (status === 0) {
			setStatus(2)
		} else {
			setStatus(0)
		}
		const response = await Que_DislikeQuestion(content.id)
		if (!response.ok) {
			return;
		}
		// TODO: return?
	}

	const clickStar = async () => {
		// TODO: api
		setStar(!star);
		const response = await Que_StarQuestion(content.id)
		if (!response.ok) {
			return;
		}
	}


	return (
		<div className="question-vote-bar">
			<Button className={"vote-button"} color={getColor("up")} onClick={() => clickLike() }>
				<CaretUpOutlined className={'icon'}/>
			</Button>
			<div className="vote-number">{likeCount}</div>
			<Button className={"vote-button"} color={getColor("down")} onClick={() => clickDislike()}>
				<CaretDownOutlined className={'icon'}/>
			</Button>
			<Button className={"star-button"} color={getColor("star")} onClick={() => clickStar()}>
				<StarOutlined className={'icon'}/>
			</Button>
		</div>
	);

};


