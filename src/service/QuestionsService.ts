import {getRequestInit, root} from "./global.ts";


/// TODO
export const Ques_GetQuestionsByTab = async (tab: string, minRank: number, fetchNum: number) => {
	const url = `${root}/questions?tab=${tab}&minRank=${minRank}&num=${fetchNum}`
	return await fetch(url, getRequestInit())
}

export const Ques_GetQuestionsByTag = async (tag: string) => {
	const url = `${root}/questions?tag=${tag}`
	return await fetch(url, getRequestInit())
}

export const Ques_GetQuestionsByTagAndTab = async (tag: string, tab: string) => {
	const url = `${root}/questions?tag=${tag}&tab=${tab}`
	return await fetch(url, getRequestInit())
}