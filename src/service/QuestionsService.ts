import {getRequestInit, root} from "./global.ts";


export const QUES_GetQuestions = async (tab: string, minRank: number, fetchNum: number) => {
	const url = `${root}/questions?tab=${tab}&minRank=${minRank}&num=${fetchNum}`
	return await fetch(url, getRequestInit())
}
