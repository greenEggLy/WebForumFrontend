import {postRequestInit, root} from "./global.ts";

export const LoginService = async (
	username: string,
	password: string,
) => {
	const url = `${root}/login`;
	const json = {
		username: username,
		password: password
	};
	const body = JSON.stringify(json);
	return await fetch(url, postRequestInit(body));
}
export const SignupService = async (
	username: string,
	password: string,
) => {
	const url = `${root}/login`;
	const json = {
		username: username,
		password: password
	};
	const body = JSON.stringify(json);
	return await fetch(url, postRequestInit(body));
}
