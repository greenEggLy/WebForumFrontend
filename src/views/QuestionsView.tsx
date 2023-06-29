import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FilterTabItem} from "../components/users/FilterTabItem.tsx";
import {ITab} from "./UsersView.tsx";
import {List, message, Pagination} from "antd";
import {IQuestionCard, ISearchQuestionsResponse} from "../Interface.ts";
import {QuestionCard} from "../components/question/question-page/QuestionCard.tsx";
import './css/QuestionsView.css'
import {testQuestion1, testQuestion2, testQuestion3} from "../constants/test";

import RankCard from "../components/SideCard/RankCard.tsx";
import {QuesGetByTab} from "../service/QuestionsService.ts";


export const Tabs: ITab[] = [
	{tab: 'heat', title: 'Thumbs'},
	{tab: 'newest', title: 'New Questions'},
]

export const QuestionsView = () => {
	const navigate = useNavigate()
	// const params = useParams()
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [totalItems, setTotalItems] = useState<number>(0);
	const [tab, setTab] = useState<ITab>(Tabs[0])
	const [questions, setQuestions] = useState<IQuestionCard[]>([])
	const [hotquestions, setHotquestions] = useState<IQuestionCard[]>([])
	useEffect(() => {
		console.log("init!");
		init().catch(err => console.error(err));
		//for test
		setQuestions([testQuestion1, testQuestion2, testQuestion3]);
		setHotquestions([testQuestion1, testQuestion2, testQuestion3])
	}, [])

	const init = async () => {
		const response = await QuesGetByTab(Tabs[0].tab, currentPage, 30)
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
		const response = await QuesGetByTab(selectTab.tab, currentPage, 30)
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

	const clickQuestion = (questionId: number) => {
		const navigateUrl = `/question/${questionId}`
		navigate(navigateUrl)
	}

	const fetchMore = async (currentPage: number, pageSize: number) => {
		const response = await QuesGetByTab(tab.tab, currentPage, pageSize);
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
		<div className={"central-container"}>
			<div className={"title-container"}>
				<h2>All Questions</h2>
			</div>
			<div className="filter-container">
				<FilterTabItem tabs={Tabs} func={changeTab}/>
			</div>
			<div className={"question-list-container"}>
				<List>
					{
						questions.map(question => (
								<div>
									<QuestionCard question={question} click={clickQuestion}/>
								</div>
							)
						)
					}
				</List>
			</div>
			<div className={"pagination"}>
				<Pagination defaultCurrent={1} total={totalItems} current={currentPage} defaultPageSize={30}
							onChange={(page, pageSize) => {
								fetchMore(page, pageSize).catch(err => console.error(err));
							}}/>
			</div>
		</div>
		<div className={"side-container"}>
			<RankCard questions={hotquestions} type={"最热问题"}/>
		</div>
	</div>;
};

