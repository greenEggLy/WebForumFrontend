import {getRequestInit, root} from "./global.ts";

export const Tag_SearchTag = async (tagText?: string, currentPage?: number, pageSize?: number) => {
	if(!currentPage || !pageSize){
		currentPage = 0;
		pageSize = 20;
	}
	let url = "";
	if (tagText && tagText !== "")
		url = `${root}/tag?keyword=${tagText}&currentPage=${currentPage}&pageSize=${pageSize}`
	else
		url = `${root}/tag?currentPage=${currentPage}&pageSize=${pageSize}`;
	return await fetch(url, await getRequestInit());
};


export const Tag_GetAllTags = async () => {
	const url = `${root}/tag`
	return await fetch(url, await getRequestInit());
}
