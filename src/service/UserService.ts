import {getRequestInit, root} from "./global.ts";

export const User_GetUser = async (id: string) => {
	const url = `${root}/user?userid=${id}`;
	return await fetch(url, await getRequestInit());
};
