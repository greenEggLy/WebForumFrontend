import {getRequestInit, postRequestInit, putRequestInit, root} from "./global.ts";

export const User_GetUser = async (id: string) => {
	const url = `${root}/user/${id}`;
	return await fetch(url, await getRequestInit());
};

export const User_GetMyInfo = async () => {
	const url = `${root}/user/me`;
	return await fetch(url, await getRequestInit());
}
export const User_changeInfo = async (
	password: string,
	username: string,
	email: string,
	location: string,
	about: string,
	avatar: string
) => {
	const url = `${root}/user/me/update`;
	const json = {
		username: username,
		password: password,
		email: email,
		location: location,
		about: about,
		avatar: avatar
	};
	const body = JSON.stringify(json);
	return await fetch(url, await putRequestInit(body));
}
export const User_changeAvatar=async (picture:ImageBitmap)=>{
	const url = `${root}/file`;
	const body = JSON.stringify(picture);
	return await fetch(url, await postRequestInit(body));
}

export const User_GetQuestions = async (id: string) => {
	const url = `${root}/user/${id}/questions`;
	return await fetch(url, await getRequestInit());
}

export const User_GetAnswers = async (id: string) => {
	const url = `${root}/user/${id}/answers`;
	return await fetch(url, await getRequestInit());
}

export const User_GetStarQuestions = async () => {
	const url = `${root}/user/me/questions/star`;
	return await fetch(url, await getRequestInit());
}

export const User_GetStarAnswers = async () => {
	const url = `${root}/user/me/answers/star`;
	return await fetch(url, await getRequestInit());
}

export const User_GetLikeQuestions = async () => {
	const url = `${root}/user/me/questions/like`;
	return await fetch(url, await getRequestInit());
}

export const User_GetLikeAnswers = async () => {
	const url = `${root}/user/me/answers/like`;
	return await fetch(url, await getRequestInit());
}