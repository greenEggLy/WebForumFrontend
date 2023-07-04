// var md = require('markdown-it');
import * as MarkdownIt from "markdown-it";
import {message} from "antd";
import {postRequestInit, root} from "./global.ts";

const md = new MarkdownIt();
const lang_reg = RegExp(/language[-]([a-z,A-Z]+)/);

const languages: string[] = [
	"CPP",
	"RUBY",
	"HASKELL",
	"GO",
	"SCALA",
	"C",
	"CS",
	"PYTHON",
	"JAVA",
	"RUST",
	"KOTLIN",
];

export const ParseMarkdown = (lines: string | null | undefined) => {
	if (!md) console.error("no markdown");
	if (!lines) return;
	// console.table(result)
	return md.render(lines);
};

export const CodeRunning = () => {
	const items = document.querySelectorAll("code");
	items.forEach((item) => {
		item.onclick = () => {
			const arr = item.className.match(lang_reg);
			if (!arr) return;
			const language = arr[1].toUpperCase();
			if (!languages.includes(language)) {
				message.error("暂不支持该语言");
			}
			console.log(item.innerText);
			Code_RunCode(language, item.innerText).catch((err) => console.error(err));
		};
	});
};

const Code_RunCode = async (lang: string, content: string) => {
	const url = `${root}/compile/json`;
	const body = {
		language: lang,
		memoryLimit: 500,
		sourcecode: content,
		testCases: {
			additionalProp1: {
				expectedOutput: "",
				input: "",
			},
		},
		timeLimit: 1,
	};
	const response = await fetch(url, await postRequestInit(JSON.stringify(body)));
	if (!response.ok) message.error("error");
	let msg = await response.json();
	console.table(msg);
};
