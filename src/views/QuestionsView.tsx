import {CSSProperties, useEffect, useState} from "react";
import {FilterTabItem} from "../components/users/FilterTabItem.tsx";
import {ITab} from "./UsersView.tsx";
import {message, Pagination} from "antd";
import {IQuestionCard, ISearchQuestionsResponse} from "../Interface.ts";
import {QuestionCard} from "../components/question/question-page/QuestionCard.tsx";
import {QuestionsService} from "../service/QuestionsService.ts";


//for test
const testQuestion: IQuestionCard = {
	Id: 1,
	Title: '为什么我还没放暑假？',
	VoteNumber: 3,
	AnswerNumber: 2,
	Tags: [
		{id: 1, content: 'test1'},
		{id: 2, content: 'test2'},
	]
}

export const Tabs: ITab[] = [
	{tab: 'heat', title: 'Thumbs'},
	{tab: 'newest', title: 'New Questions'},
]

export const QuestionsView = () => {
	// const params = useParams()
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [totalItems, setTotalItems] = useState<number>(0);
	const [tab, setTab] = useState<ITab>(Tabs[0])
	const [questions, setQuestions] = useState<IQuestionCard[]>([])
	useEffect(() => {
		init().catch(err => console.error(err));
		//for test
		setQuestions([testQuestion, testQuestion, testQuestion])
	}, [])

	const init = async () => {
		const response = await QuestionsService.GetByTab(Tabs[0].tab, currentPage, 30)
		setCurrentPage(currentPage + 1);
		if (!response.ok) {
			message.error('error');
			return;
		}
		const json: ISearchQuestionsResponse = await response.json();
		setQuestions(json.result);
		// setTotalPages(json.totalPages);
		setTotalItems(json.totalItems);
	}

	const changeTab = async (selectTab: ITab) => {
		if (tab === selectTab) return;
		const response = await QuestionsService.GetByTab(selectTab.tab, currentPage, 30)
		if (!response.ok) {
			message.error(`无法查询问题信息`)
			return
		}
		setTab(selectTab)
		const json: ISearchQuestionsResponse = await response.json();
		setQuestions(json.result);
		setTotalItems(json.totalItems);
		setCurrentPage(json.currentPage);
		// setTotalPages(json.totalPages);
	}

	const fetchMore = async (currentPage: number, pageSize: number) => {
		const response = await QuestionsService.GetByTab(tab.tab, currentPage, pageSize);
		if (!response.ok) {
			message.error(`无法查询问题信息`)
			return
		}
		const json: ISearchQuestionsResponse = await response.json()
		setQuestions(json.result);
		setTotalItems(json.totalItems);
		setCurrentPage(json.currentPage);
		// setTotalPages(json.totalPages);
	}

	return <div>
		<div className={"view-title"} style={styles.titleContainer}>
			<h2>All Questions</h2>
		</div>
		<div className="filter-tabs" style={styles.filterContainer}>
			<FilterTabItem tabs={Tabs} func={changeTab}/>
		</div>
		<div className={"questions-show"} style={styles.questionContainer}>
			{
				questions.map(question => (<QuestionCard question={question}/>))
			}
		</div>
		<div className={"pagination"}>
			<Pagination defaultCurrent={1} total={totalItems} current={currentPage} defaultPageSize={30}
						onChange={(page, pageSize) => {
							fetchMore(page, pageSize).catch(err => console.error(err));
						}}/>
		</div>
	</div>;
};

const styles: { [key: string]: CSSProperties } = {
	titleContainer: {
		height: '15vh',
		marginLeft: '10px',
	},
	filterContainer: {
		height: '10vh',
	},
	questionContainer: {
		backgroundColor: '#f5f5f5',
	}
}
