import {getRequestInit, root} from "./global.ts";


const questionsRoot = `${root}/Question`;

export const QuesGetByTab = async (tab: string, currentPage: number, pageSize: number) => {
	const url = `${questionsRoot}?tab=${tab}&currentPage=${currentPage}&pageSize=${pageSize}`
	return await fetch(url, getRequestInit())
}

export const QuesGetByTabAndKeyword = async (tag: string, tab: string) => {
	const url = `${questionsRoot}?tag=${tag}&tab=${tab}`
	return await fetch(url, getRequestInit())
}

export const QuesGetByTag = async (tagName: string, tab: string) => {
	const url = `${questionsRoot}/tagged?tagName=${tagName}&tab=${tab}`
	return await fetch(url, getRequestInit())
}

export const QuesGetByTagTabAndKeyword = async (tag: string, tab: string, keyWord: string, currentPage: number, pageSize: number) => {
	const url = `${questionsRoot}/tagged?tag=${tag}&tab=${tab}&keyWord=${keyWord}&currentPage=${currentPage}&pageSize=${pageSize}`;
	return await fetch(url, getRequestInit());
}

