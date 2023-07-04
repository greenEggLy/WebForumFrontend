import {IQuestionCard, IStatisticTag, ITag, IUserCard} from "../Interface.ts";


export const tag1: ITag = {
	id: 1,
	content: "Coding",
	description: "计算机计算机计算机计算机计算机计算机计算机计算机计算机计算机计算机计算机计算机计算机",
	question_number: 233,
}
export const tag2: ITag = {
	id: 2,
	content: "计算机",
	description: "计算机",
	question_number: 233,
}
export const tag3: ITag = {
	id: 3,
	content: "软件",
	description: "计算机",
	question_number: 233,
}
export const User1: IUserCard = {
	id: 1,
	avatar: "https://tse2-mm.cn.bing.net/th/id/OIP-C.PcOT-lN3-IAT3szcXiXvQgAAAA?w=186&h=186&c=7&r=0&o=5&dpr=2&pid=1.7",
	username: "沈备军",
	location: "中国上海",
	followers_number: 233,
	profile: "一名软件学院老师",
	fields: [tag1, tag2, tag3]
}
const User2: IUserCard = {
	id: 2,
	avatar: "https://tse2-mm.cn.bing.net/th/id/OIP-C.PcOT-lN3-IAT3szcXiXvQgAAAA?w=186&h=186&c=7&r=0&o=5&dpr=2&pid=1.7",
	username: "沈备军",
	location: "中国上海",
	followers_number: 233,
	profile: "一名软件学院老师",
	fields: [tag1, tag2, tag3]
}

export const testQuestion1: IQuestionCard = {
	Id: 1,
	Title: '为什么我还没放暑假？',
	createTime: new Date(2023, 5, 27, 16, 50, 0),
	Tags: [
		{id: 1, content: 'test1', description: 'test1', question_number: 2},
		{id: 2, content: 'test2', description: 'test2', question_number: 2},
	],
	VoteNumber: 10,
	AnswerNumber: 20
}

export const testQuestion2: IQuestionCard = {
	Id: 2,
	Title: '为什么别人都放暑假了？',
	createTime: new Date(2023, 5, 27, 10, 50, 0),
	Tags: [
		{id: 1, content: 'test1', description: 'test1', question_number: 2},
		{id: 3, content: 'test3', description: 'test3', question_number: 2},
	],
	VoteNumber: 30,
	AnswerNumber: 15
}

export const testQuestion3: IQuestionCard = {
	Id: 3,
	Title: '我啥时候才能放暑假？',
	createTime: new Date(2023, 5, 27, 10, 50, 0),
	Tags: [
		{id: 1, content: 'test1', description: 'test1', question_number: 2},
		{id: 4, content: 'test4', description: 'test4', question_number: 2},
	],
	VoteNumber: 13,
	AnswerNumber: 28
}

export const UserList: IUserCard[] = [User1, User2, User1, User2, User1, User2, User1, User2];

export const STag1:IStatisticTag={
	id:1,
	content:'睡觉',
	number:123
}
export const STag2:IStatisticTag={
	id:2,
	content:'编程',
	number:80
}
export const STag3:IStatisticTag={
	id:3,
	content:'爬行',
	number:22
}
export const STag4:IStatisticTag={
	id:4,
	content:'困',
	number:40
}
export const STag5:IStatisticTag={
	id:5,
	content:'精神失常',
	number:20
}
export const StatisticData:IStatisticTag[]=[STag1,STag2,STag3,STag4,STag5]
