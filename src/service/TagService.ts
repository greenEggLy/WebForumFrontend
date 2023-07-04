import {getRequestInit, root} from "./global.ts";

export const Tag_SearchTag = async (tagText: string) => {
	let url = "";
	if (tagText !== "")
		url = `${root}/tag/search?keyword=${tagText}`
	else
		url = `${root}/tag`;
	return await fetch(url, getRequestInit());
};


export const Tag_GetAllTags = async () => {
	const url = `${root}/tag`
	return await fetch(url, getRequestInit());
}
