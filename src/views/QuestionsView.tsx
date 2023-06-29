import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FilterTabItem} from "../components/users/FilterTabItem.tsx";
import {ITab} from "./UsersView.tsx";
import {List, message, Pagination} from "antd";
import {IQuestionCard, ISearchQuestionsResponse} from "../Interface.ts";
import {QuestionCard} from "../components/question/question-page/QuestionCard.tsx";
import './css/QuestionsView.css'
import {testQuestion1, testQuestion2, testQuestion3} from "../constants/test";
import {QuesGet} from "../service/QuestionsService.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store.ts";
import {getTagName} from "../utils/path.ts";
import {changeTag} from "../features/tag/tagSlice.ts";
import RankCard from "../components/SideCard/RankCard.tsx";


export const Tabs: ITab[] = [
	{tab: 'heat', title: 'Thumbs'},
	{tab: 'newest', title: 'New Questions'},
]

export const QuestionsView = () => {
	const navigate = useNavigate()
	// global information
	const keyword = useSelector((state: RootState) => state.keyword.value);
	const tag = useSelector((state: RootState) => state.tag.value);
	const dispatch = useDispatch();
	// page items
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [pageSize, setPageSize] = useState<number>(30);
	const [totalItems, setTotalItems] = useState<number>(0);
	// current tab info
	const [tab, setTab] = useState<ITab>(Tabs[0])
	// main and side questions
	const [questions, setQuestions] = useState<IQuestionCard[]>([])
	const [hotquestions, setHotquestions] = useState<IQuestionCard[]>([])
	useEffect(() => {
		const tagName = getTagName(window.location.href);
		dispatch(changeTag(tagName));
		getQues()
			.catch(err => console.error(err))
		// .catch(_ => navigate("/questions"));
		//for test
		setQuestions([testQuestion1, testQuestion2, testQuestion3]);
		setHotquestions([testQuestion1, testQuestion2, testQuestion3])
	}, [])

	const getQues = async () => {
		const response = await QuesGet(tab.tab, currentPage, pageSize, tag, keyword)
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
		setTab(selectTab)
		const response = await QuesGet(selectTab.tab, currentPage, 30, tag, keyword)
		if (!response.ok) {
			message.error(`无法查询问题信息`)
			return
		}
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
		const response = await QuesGet(tab.tab, currentPage, pageSize, tag, keyword);
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
								setPageSize(pageSize);
								fetchMore(page, pageSize).catch(err => console.error(err));
							}}/>
			</div>
		</div>
		<div className={"side-container"}>
			<RankCard questions={hotquestions} type={"最热问题"}/>
		</div>
	</div>;
};

