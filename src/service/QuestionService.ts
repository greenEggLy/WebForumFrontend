import {ITag} from "../Interface.ts";
import {emptyPostRequestInit, getRequestInit, postRequestInit, root} from "./global.ts";

/// api sync done

const questionRoot = `${root}/question`

export const Que_PostQuestion = async (
	title: string,
	content: string,
	tags: ITag[]
) => {
	const url = `${questionRoot}/add`;
	const json = {
		Title: title,
		Content: content,
		Tags: tags,
	};
	const body = JSON.stringify(json);
	return await fetch(url, await postRequestInit(body));
};

export const Que_GetQuestion = async (id: string) => {
	const url = `${questionRoot}/${id}`;
	return await fetch(url, await getRequestInit());
};

export const Que_GetQuesAnswer = async (id: string, currentPage?: number, pageSize?: number) => {
	if (!currentPage) currentPage = 1;
	if (!pageSize) pageSize = 15;
	const url = `${questionRoot}/${id}/answers?currentPage=${currentPage}&pageSize=${pageSize}`
	return await fetch(url, await getRequestInit());
}

export const Que_LikeQuestion = async (id: string) => {
	const url = `${questionRoot}/${id}/like`
	return await fetch(url, await emptyPostRequestInit());
}

export const Que_DislikeQuestion = async (id: string) => {
	const url = `${questionRoot}/${id}/dislike`
	return await fetch(url, await emptyPostRequestInit());
}

export const Que_StarQuestion = async (id: string) => {
	const url = `${questionRoot}/${id}/star`
	return await fetch(url, await emptyPostRequestInit());
}
