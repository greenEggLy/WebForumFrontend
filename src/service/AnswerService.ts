import { emptyPostRequestInit, postRequestInit, root } from "./global.ts";

export const Ans_PostAnswer = async (
	content: string,
	questionId: string
) => {
	const url = `${root}/answer/add`
	const json = {
		content: content,
		questionId: questionId
	}
	const body = JSON.stringify(json)
	return await fetch(url, await postRequestInit(body));
}

export const Ans_LikeAnswer = async (id: string) => {
	const url = `${root}/answer/${id}/like`
	return await fetch(url, await emptyPostRequestInit());
}

export const Ans_DislikeAnswer = async (id: string) => {
	const url = `${root}/answer/${id}/dislike`
	return await fetch(url, await emptyPostRequestInit());
}

export const Ans_StarAnswer = async (id: string) => {
	const url = `${root}/answer/${id}/star`
	return await fetch(url, await emptyPostRequestInit());
}