import {IAnswerBrief, IQuestion, ITag, IUser, IUserBrief, IUserCard} from "../Interface.ts";

export const EmptyUser: IUser = {
	id: 0,
	username: "",
	email: "",
	create_time: new Date(),
	last_login: new Date(),
	location: "",
	profile: "",
	avatar: "",
	is_admin: false,
	is_banned: false,
	fields: [],
	like_questions: [],
	like_answer: [],
	star_questions: [],
	questions: [],
	answers: [],
	followers: [],
	following: [],
};

export const EmptyUserBrief: IUserBrief = {
	id: "",
	userName: "",
	avatar: ""
}


export const EmptyUserCard: IUserCard = {
	id: 0,
	avatar: "",
	username: "",
	location: "",
	followers_number: 0,
	profile: "",
	fields: []
}

export const EmptyAnswerBrief: IAnswerBrief = {
	id: "",
	userCard: EmptyUserBrief,
	content: "",
	likeCount: 0,
	dislikeCount: 0,
	userLike: false,
	userDislike: false,
}

export const EmptyQuestion: IQuestion = {
	id: "0",
	userCard: EmptyUserBrief,
	title: "",
	content: "",
	starCount: 0,
	likeCount: 0,
	dislikeCount: 0,
	userStar: false,
	userLike: false,
	userDislike: false,
	answers: [],
	tags: []
};

export const EmptyTag: ITag = {
	id: 0,
	content: ""
}
