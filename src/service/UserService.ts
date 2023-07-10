import {getRequestInit, putRequestInit,root} from "./global.ts";

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
	const url = `${root}/user/update`;
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