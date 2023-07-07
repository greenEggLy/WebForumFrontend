import {postRequestInit, root} from "./global.ts";
import {message} from "antd";
import {ILoginResponse} from "../Interface.ts";

export const LoginService = async (
	username: string,
	password: string,
) => {
	const url = `${root}/auth/login`;
	const json = {
		username: username,
		password: password
	};
	const body = JSON.stringify(json);
	return await fetch(url, await postRequestInit(body));
}

export const RefreshToken = async (refresh: string) => {
	const url = `${root}/auth/token/refresh`
	const body = JSON.stringify({refreshToken: refresh})
	return await fetch(url, await postRequestInit(body))
}

export const GetToken = async (): Promise<string> => {
	const token = localStorage.getItem('accessToken')
	if (!token) {
		const refresh = localStorage.getItem('refreshToken')
		if (!refresh) return "";
		const response = await RefreshToken(refresh);
		if (!response.ok) {
			message.error(response.statusText)
			return "";
		}
		const json: ILoginResponse = await response.json();
		localStorage.setItem('accessToken', json.accessToken)
		localStorage.setItem('refreshToken', json.refreshToken)
		localStorage.setItem('expire', json.expire)
		return json.accessToken
	}
	return token;
}


export const SignupService = async (
	username: string,
	password: string,
	email: string,
	location:string
) => {
	const url = `${root}/auth/register`;
	const json = {
		username: username,
		password: password,
		email: email,
		location : location,
	};
	const body = JSON.stringify(json);
	console.log(body);
	return await fetch(url, await postRequestInit(body));
}
