import {getRequestInit, root} from "./global.ts";

export const Tag_GetPossibleTags = async (tagText: string) => {
	const url = `${root}/tag/get-tags?text=${tagText}`;
	return await fetch(url, getRequestInit());
};


export const Tag_GetAllTags = async () => {
	const url = `${root}/tags`
	return await fetch(url, getRequestInit());
}
