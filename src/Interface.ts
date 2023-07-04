export interface IUser {
	id: string;
	username: string;
	email: string;
	create_time: Date;
	last_login: Date;
	location: string;
	profile: string;
	avatar: string;

	is_admin: boolean;
	is_banned: boolean;

	fields: ITag[];

	like_questions: IQuestionCard[];
	like_answer: IAnswerCard[];

	star_questions: IQuestionCard[];

	questions: IQuestionCard[];
	answers: IAnswerCard[];

	followers: IUserFollow[];
	following: IUserFollow[];
}

export interface IUserBrief {
	id: string;
	userName: string;
	avatar: string;
}

// answers in question detail
export interface IAnswerBrief {
	id: string;
	userCard: IUserBrief;
	content: string;
	likeCount: number;
	dislikeCount: number;
	userLike: boolean;
	userDislike: boolean;
	userStar: boolean;
	createTime: Date;
}

export interface IQuestion {
	id: string;
	userCard: IUserBrief;
	title: string;
	content: string;
	starCount: number;
	likeCount: number;
	dislikeCount: number;
	userStar: boolean;
	userLike: boolean;
	userDislike: boolean;
	CreateTime: Date;
	answers: IAnswerBrief[];
	tags: ITag[]
}


export interface ITag {
	id: number;
	content: string;
	description: string;
	question_number: number;
}


export interface IAnswer {
	id: string;
	content: string;
	create_time: Date;
	user: IUser;
	like_users: IUser[];
	question: IQuestion;
}

export interface IQuestionCard {
	Id: string;
	Title: string;
	VoteNumber: number;
	AnswerNumber: number;
	CreateTime: Date;
	Tags: ITag[];
}

export interface IAnswerRecord {
	id: string;
	content: string;
	create_time: Date;
}

export interface IAnswerCard {
	id: string;
	content: string;
	create_time: Date;
	question: string; // question title
	question_id: number;
}

export interface IUserCard {
	id: string;
	avatar: string;
	username: string;
	location: string;
	followers_number: number;
	profile: string;
	fields: ITag[];
}

export interface IUserFollow {
	id: string;
	avatar: string;
	username: string;
}

export interface ISearchQuestionsResponse {
	result: IQuestionCard[];
	currentPage: number;
	totalPages: number;
	totalItems: number; // 所有满足条件的结果数
}

export interface ISearchAnswersResponse {
	result: IAnswerBrief[];
	currentPage: number;
	totalPages: number;
	totalItems: number;
}

export interface ISearchUserCardResponse {
	result: IUserCard[];
	currentPage: number;
	totalPages: number;
	totalItems: number; // 所有满足条件的结果数
}

//用于用户数据统计时的接口
//需要从后端返回一个格式为{id,Tag内容,涉及数目}的列表
export interface IStatisticTag {
	id: number;
	content: string;
	number: number;
}

