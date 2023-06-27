import {ITag} from "../Interface.ts";
import {getRequestInit, postRequestInit, root} from "./global.ts";

export const Que_PostQuestion = async (
	title: string,
	content: string,
	tags: ITag[]
) => {
	const url = `${root}/question/new`;
	const json = {
		Title: title,
		Content: content,
		Tags: tags,
	};
	const body = JSON.stringify(json);
	return await fetch(url, postRequestInit(body));
};

export const Que_GetQuestion = async (id: string) => {
	const url = `${root}/question?id=${id}`;
	return await fetch(url, getRequestInit());
};

export const Que_LikeQuestion = async (id: string) => {
	const url = `${root}/question/like`
	const body = JSON.stringify({Id: id});
	return await fetch(url, postRequestInit(body));
}


export const Que_DislikeQuestion = async (id: string) => {
	const url = `${root}/question/dislike`
	const body = JSON.stringify({Id: id});
	return await fetch(url, postRequestInit(body));
}

export const Que_StarQuestion = async (id: string) => {
	const url = `${root}/question/star`
	const body = JSON.stringify({Id: id});
	return await fetch(url, postRequestInit(body));
}
