import {IAnswerBrief, IQuestion, ITag, IUser, IUserBrief, IUserCard} from "../Interface.ts";

export const EmptyUser: IUser = {
	id: "0",
	username: "",
	email: "",
	registerTime: new Date(),
	lastLogin: new Date(),
	location: "",
	about: "",
	avatar: "",
	followedCount: 0,
	followingCount: 0,
	isFollowing: false,
	is_admin: false,
	is_banned: false,
	tags: [],
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
	id: "0",
	avatar: "",
	username: "",
	location: "",
	followedCount: 0,
	about: "",
	tags: []
}

export const EmptyAnswerBrief: IAnswerBrief = {
	id: "",
	userCard: EmptyUserBrief,
	content: "",
	likeCount: 0,
	dislikeCount: 0,
	userAction: {
		userStar: false,
		userDislike: false,
		userLike: false
	},
	createTime: new Date().toTimeString()
}

export const EmptyQuestion: IQuestion = {
	id: "0",
	userCard: EmptyUserBrief,
	title: "",
	content: "",
	starCount: 0,
	likeCount: 0,
	dislikeCount: 0,
	userAction: {
		userStar: false,
		userDislike: false,
		userLike: false
	},
	createTime: new Date().toTimeString(),
	answers: [],
	tags: []
};

export const EmptyTag: ITag = {
	id: 0,
	content: "",
	description: "",
	question_number: 0,
}
