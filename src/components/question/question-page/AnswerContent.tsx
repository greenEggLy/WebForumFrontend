import {useEffect, useState} from "react";
import {CodeRunning, ParseMarkdown} from "../../../service/MarkdownService.ts";

interface Props {
	content: string;
}

// 问题具体内容
export const AnswerContent = ({content}: Props) => {
	const [formatContent, setFormatContent] = useState<string>("")
	useEffect(() => {
		const s = ParseMarkdown(content);
		if (!s) return;
		setFormatContent(s)
	}, [content])
	useEffect(() => {
		CodeRunning()
	}, [formatContent])
	return (
		<div className={"code-block"} dangerouslySetInnerHTML={{__html: formatContent}}></div>
	)
}
