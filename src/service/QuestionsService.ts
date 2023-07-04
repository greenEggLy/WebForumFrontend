import {getRequestInit, root} from "./global.ts";


const questionsRoot = `${root}/question`;

export const QuesGet = async (tab: string, currentPage?: number | null, pageSize?: number | null, tagName?: string | null, keyword?: string | null) => {
	if (!currentPage) currentPage = 0;
	if (!pageSize) pageSize = 20;
	let url = questionsRoot;
	if (tagName && tagName !== "") {
		url = `${url}/tagged/${tagName}`;
	} else {
		url = `${url}/search`
	}
	url = `${url}?tab=${tab}&currentPage=${currentPage}&pageSize=${pageSize}`
	if (keyword && keyword !== "") {
		url = `${url}&keyword=${keyword}`;
	}
	console.log(url);
	return await fetch(url, getRequestInit())
}

export const QuesGetWizTag = async (tagName: string, tab: string, currentPage: number, pageSize: number, keyword?: string) => {
	let url = `${questionsRoot}/tagged?tagName=${tagName}&tab=${tab}&currentPage=${currentPage}&pageSize=${pageSize}`;
	if (keyword && keyword !== "") {
		url = `${url}&keyword=${keyword}`;
	}
	return await fetch(url, getRequestInit())
}

