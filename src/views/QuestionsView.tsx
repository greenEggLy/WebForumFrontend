import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FilterTabItem} from "../components/users/FilterTabItem.tsx";
import {List, message, Pagination} from "antd";
import {IQuestionCard, ISearchQuestionsResponse} from "../Interface.ts";
import {QuestionCard} from "../components/question/question-page/QuestionCard.tsx";
import './css/QuestionsView.css'
import {QuesGet} from "../service/QuestionsService.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store.ts";
import {getTagName} from "../utils/path.ts";
import {changeTag} from "../features/tag/tagSlice.ts";
import RankCard from "../components/SideCard/RankCard.tsx";
import {changeTab, IQuestionTab} from "../features/tab/tabSlice.ts";
import {changePage} from "../features/page/pageSlice.ts";


export const Tabs: IQuestionTab[] = [
	{tab: 'heat', title: 'Heated Questions'},
	{tab: 'newest', title: 'Newest Questions'},
]

export const QuestionsView = () => {
	const navigate = useNavigate()
	// global information
	const keyword = useSelector((state: RootState) => state.keyword.value);
	const tag = useSelector((state: RootState) => state.tag.value);
	const tab = useSelector((state: RootState) => state.tab);
	const page = useSelector((state: RootState) => state.page)
	const dispatch = useDispatch()
	// page items
	const [totalItems, setTotalItems] = useState<number>(0);
	// title
	const [title, setTitle] = useState<string>("")
	// current tab info
	// main and side questions
	const [questions, setQuestions] = useState<IQuestionCard[]>([])
	const [hotQuestions] = useState<IQuestionCard[]>([])
	useEffect(() => {
		console.log('haha')
		const tagName = getTagName(window.location.href);
		dispatch(changeTag(tagName));
		dispatch(changePage({currentPage: 0, pageSize: 20}))
		if (tagName !== "") {
			setTitle(`Tagged Questions: [${tagName}]`)
		} else {
			setTitle(tab.title)
		}
		getQues()
			.catch(err => console.error(err))
		// .catch(_ => navigate("/questions"));
		//for test
		// setQuestions([testQuestion1, testQuestion2, testQuestion3]);
		// setHotQuestions([testQuestion1, testQuestion2, testQuestion3])
	}, [tab, tag])

	const getQues = async () => {
		const response = await QuesGet(tab.tab, page.currentPage, page.pageSize, tag, keyword)
		if (!response.ok) {
			message.error('error');
			return;
		}
		const json: ISearchQuestionsResponse = await response.json();
		setQuestions(json.result);
		dispatch(changePage({pageSize: page.pageSize, currentPage: json.currentPage}))
		// setTotalPages(json.totalPages);
		setTotalItems(json.totalItems);
	}

	const ChangeTab = async (selectTab: IQuestionTab) => {
		if (tab === selectTab) return;
		dispatch(changeTab(selectTab.tab))
		const response = await QuesGet(selectTab.tab, page.currentPage, page.pageSize, tag, keyword)
		if (!response.ok) {
			message.error(`无法查询问题信息`)
			return
		}
		const json: ISearchQuestionsResponse = await response.json();
		setQuestions(json.result);
		setTotalItems(json.totalItems);
		dispatch(changePage({pageSize: page.pageSize, currentPage: json.currentPage}))
		// setTotalPages(json.totalPages);
	}

	const clickQuestion = (questionId: string) => {
		const navigateUrl = `/question/${questionId}`
		navigate(navigateUrl)
	}

	const fetchMore = async () => {
		const response = await QuesGet(tab.tab, page.currentPage, page.pageSize, tag, keyword);
		if (!response.ok) {
			message.error(`无法查询问题信息`)
			return
		}
		const json: ISearchQuestionsResponse = await response.json()
		setQuestions(json.result);
		setTotalItems(json.totalItems);
		dispatch(changePage({pageSize: page.pageSize, currentPage: json.currentPage}))
		// setTotalPages(json.totalPages);
	}

	return (
		<div className={"questions-view-container"}>
			<div className={"central-container"}>
				<div className={"title-container"}>
					<h2>{title}</h2>
				</div>
				<div className="filter-container">
					{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
					{/*@ts-ignore*/}
					<FilterTabItem tabs={Tabs} func={ChangeTab} setTab={(text) => dispatch(changeTab(text))}/>
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
					<Pagination defaultCurrent={1} total={totalItems} current={page.currentPage} defaultPageSize={20}
								onChange={(page, pageSize) => {
									dispatch(changePage({currentPage: page, pageSize: pageSize}))
									fetchMore().catch(err => console.error(err));
								}}/>
				</div>
			</div>
			<div className={"side-container"}>
				<RankCard questions={hotQuestions} type={"最热问题"}/>
			</div>
		</div>
	)
};

