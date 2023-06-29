import {getRequestInit, root} from "./global.ts";


export class QuestionsService {
	static questionsRoot = `${root}/Question`;

	static GetByTab = async (tab: string, currentPage: number, pageSize: number) => {
		const url = `${(this.questionsRoot)}?tab=${tab}&currentPage=${currentPage}&pageSize=${pageSize}`
		return await fetch(url, getRequestInit())
	}

	static GetByTabAndKeyword = async (tag: string, tab: string) => {
		const url = `${this.questionsRoot}?tag=${tag}&tab=${tab}`
		return await fetch(url, getRequestInit())
	}

	static GetByTag = async (tagName: string, tab: string) => {
		const url = `${this.questionsRoot}/tagged?tagName=${tagName}&tab=${tab}`
		return await fetch(url, getRequestInit())
	}

	static GetByTagTabAndKeyword = async (tag: string, tab: string, keyWord: string, currentPage: number, pageSize: number) => {
		const url = `${this.questionsRoot}/tagged?tag=${tag}&tab=${tab}&keyWord=${keyWord}&currentPage=${currentPage}&pageSize=${pageSize}`;
		return await fetch(url, getRequestInit());
	}
}
