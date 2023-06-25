import {getRequestInit, root} from "./global.ts";

export const Users_FilterByTab = async (tab: string) => {
	const url = `${root}/users?tab=${tab}`;
	return await fetch(url, getRequestInit());
};

export const Users_FilterByName = async (name: string) => {
	const url = `${root}/users?name=${name}`
	return await fetch(url, getRequestInit());
}
