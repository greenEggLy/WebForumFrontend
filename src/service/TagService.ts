import {getRequestInit, root} from "./global.ts";

export const Tag_SearchTag = async (currentPage: number, pageSize: number, tagText?: string) => {
	let url = "";
	if (tagText && tagText !== "")
		url = `${root}/tag/search?keyword=${tagText}&currentPage=${currentPage}&pageSize=${pageSize}`
	else
		url = `${root}/tag?currentPage=${currentPage}&pageSize=${pageSize}`;
	return await fetch(url, await getRequestInit());
};


export const Tag_GetAllTags = async () => {
	const url = `${root}/tag`
	return await fetch(url, await getRequestInit());
}
