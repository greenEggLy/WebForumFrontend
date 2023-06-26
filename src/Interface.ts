export interface IUser {
	id: number;
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

export interface IAnswerBrief {
	id: string;
	userCard: IUserBrief;
	content: string;
	likeCount: number;
	dislikeCount: number;
	userLike: boolean;
	userDislike: boolean;
	userStar: boolean;
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
	answers: IAnswerBrief[];
	tags: ITag[]
}


export interface ITag {
	id: number;
	content: string;
}


export interface IAnswer {
	id: number;
	content: string;
	create_time: Date;
	user: IUser;
	like_users: IUser[];
	question: IQuestion;
}


// export interface IQuestion {
// 	id: number;
// 	title: string;
// 	content: string;
// 	create_time: Date;
// 	last_edit: Date;
// 	browse_time: number;
// 	user: IUserCard;
// 	tags: ITag[];
// 	star_users: IUserCard[];
// 	like_users: IUserCard[];
// 	answers: IAnswerRecord[];
// }

export interface IQuestionCard {
	id: number;
	title: string;
	last_edit: Date;
	browse_time: number;
	tags: ITag[];
}

export interface IAnswerRecord {
	id: number;
	content: string;
	create_time: Date;
}

export interface IAnswerCard {
	id: number;
	content: string;
	create_time: Date;
	question: string; // question title
	question_id: number;
}

export interface IUserCard {
	id: number;
	avatar: string;
	username: string;
	location: string;
	followers_number: number;
	profile: string;
	fields: ITag[];
}

export interface IUserFollow {
	id: number;
	avatar: string;
	username: string;
}
