import {IQuestion} from "../../../Interface.ts";

interface Props {
	question: IQuestion;
}

// 问题点赞评价
export const QuestionVote = ({question}: Props) => {
	return (
		<div className="question-vote-bar">
			<button className={"vote-button"}>
				<svg
					aria-hidden="true"
					className="svg-icon iconArrowUp"
					width="18"
					height="18"
					viewBox="0 0 18 18"
				>
					<path d="M1 12h16L9 4l-8 8Z"></path>
				</svg>
			</button>
			<div className="vote-number">{question.like_users.length}</div>
			<button className={"vote-button"}>
				<svg
					aria-hidden="true"
					className="svg-icon iconArrowDown"
					width="18"
					height="18"
					viewBox="0 0 18 18"
				>
					<path d="M1 6h16l-8 8-8-8Z"></path>
				</svg>
			</button>

			<button className={"save-button"}>
				<svg
					aria-hidden="true"
					className="fc-theme-primary-500 js-saves-btn-selected d-none svg-icon iconBookmark"
					width="18"
					height="18"
					viewBox="0 0 18 18"
				>
					<path d="M3 17V3c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v14l-6-4-6 4Z"></path>
				</svg>
				<svg
					aria-hidden="true"
					className="js-saves-btn-unselected svg-icon iconBookmarkAlt"
					width="18"
					height="18"
					viewBox="0 0 18 18"
				>
					<path d="m9 10.6 4 2.66V3H5v10.26l4-2.66ZM3 17V3c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v14l-6-4-6 4Z"></path>
				</svg>
			</button>
		</div>
	);
};
