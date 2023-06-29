import "bytemd/dist/index.css";
import {Viewer} from "@bytemd/react";
import {useEffect} from "react";
import {CodeRunning} from "../../../service/MarkdownService.ts";

interface Props {
	content: string;
}

export const QuestionContent = ({content}: Props) => {
	useEffect(() => {
		CodeRunning();
	}, []);
	return (
		<div>
			<Viewer value={content}/>
		</div>
	);
};
