import {IQuestionCard} from "../../../Interface.ts";
import {TagShowItem} from "../../tag/TagShowItem.tsx";
import './QuestionCard.css'
import { Col, Row } from "antd";

interface Props {
	question: IQuestionCard;
	click: (id: number) => void;
}

// 问题缩略图
export const QuestionCard = ({question, click}: Props,) => {

	// 定义一个函数，接受一个Date类型的参数
	function timeDiff(date:Date) {
		// 获取当前时间的毫秒数
		let now = Date.now();
		// 获取参数时间的毫秒数
		let then = date.getTime();
		// 计算时间差，单位为毫秒
		let diff = now - then;
		// 定义一个变量，用于存储输出结果
		let output = "";
		// 判断时间差是否小于一分钟（60*1000毫秒）
		if (diff < 60 * 1000) {
			// 如果是，输出“刚刚”
			output = "刚刚";
		} else if (diff < 60 * 60 * 1000) {
			// 否则，判断时间差是否小于一小时（60*60*1000毫秒）
			// 如果是，计算时间差的分钟数，向下取整
			let minutes = Math.floor(diff / (60 * 1000));
			// 输出“xx分钟前”，其中xx为分钟数
			output = minutes + "分钟前";
		} else if (diff < 24 * 60 * 60 * 1000) {
			// 否则，判断时间差是否小于一天（24*60*60*1000毫秒）
			// 如果是，计算时间差的小时数，向下取整
			let hours = Math.floor(diff / (60 * 60 * 1000));
			// 输出“xx小时前”，其中xx为小时数
			output = hours + "小时前";
		} else {
			// 否则，计算时间差的天数，向下取整
			let days = Math.floor(diff / (24 * 60 * 60 * 1000));
			// 输出“xx天前”，其中xx为天数
			output = days + "天前";
		}
		// 返回输出结果
		return output;
	}


	return (
		<div className={"question-card"} >
			<div className={"question-popularity-container"}>
				<Row>
					<Col span={6} >{question.AnswerNumber + (question.AnswerNumber == 1 ? ' Answer' : ' Answers')}</Col>
					<Col span={6} >{question.VoteNumber + (question.VoteNumber == 1 ? ' Like' : ' Likes')}</Col>
				</Row>
			</div>
			<div className={"question-card-title-container"}>
				<a className={"question-card-title"} onClick={() => {click(question.Id)}}>{question.Title}</a>
			</div>
			<div className={'question-card-footer'}>
				<div className={"question-card-tag-container"}>
					{
						question.Tags.map(tag => {
							return (<span> <TagShowItem tag_name={tag.content}/> </span>)
						})
					}
				</div>
				<div className={'question-time-container'}>
					{timeDiff(question.CreateTime)}
				</div>
			</div>
		</div>
	);
}
