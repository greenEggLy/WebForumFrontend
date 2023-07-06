import {getRequestInit, root} from "./global.ts";

export const User_GetUser = async (id: string) => {
	const url = `${root}/user?userid=${id}`;
	return await fetch(url, await getRequestInit());
};

export const User_GetMyInfo = async () => {
	const url = `${root}/user/me`;
	return await fetch(url, await getRequestInit());
}
