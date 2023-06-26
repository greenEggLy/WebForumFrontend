import {ITag} from "../Interface.ts";
import {emptyPostRequestInit, getRequestInit, postRequestInit, root} from "./global.ts";
import * as dayjs from "dayjs";

export const Que_PostQuestion = async (
	title: string,
	content: string,
	tags: ITag[]
) => {
	const url = `${root}/question/post-new-question`;
	const json = {
		title: title,
		content: content,
		create_time: dayjs(new Date()).toJSON(),
		last_edit: dayjs(new Date()).toJSON(),
		tags: tags,
	};
	const body = JSON.stringify(json);
	return await fetch(url, postRequestInit(body));
};

export const Que_GetQuestion = async (id: string) => {
	const url = `${root}/question?id=${id}`;
	return await fetch(url, getRequestInit());
};

export const Que_LikeQuestion = async (id: string) => {
	const url = `${root}/question/${id}/like-change`
	return await fetch(url, emptyPostRequestInit());
}


export const Que_DislikeQuestion = async (id: string) => {
	const url = `${root}/question/${id}/dislike-change`
	return await fetch(url, emptyPostRequestInit());
}

export const Que_StarQuestion = async (id: string) => {
	const url = `${root}/question/${id}/star-change`
	return await fetch(url, emptyPostRequestInit());
}
