import {getRequestInit, root} from "./global.ts";

export const Users_GetUsers = async (tab: string, currentPage: number, pageSize: number, keyword: string) => {
	let url = `${root}/users?tab=${tab}&currentPage=${currentPage}&pageSize=${pageSize}`;
	if (keyword !== "") {
		url = `${url}&keyword=${keyword}`
	}
	return await fetch(url, await getRequestInit());
};
