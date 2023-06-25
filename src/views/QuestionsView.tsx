import {useEffect, useState} from "react";
import {Ques_GetQuestionsByTab} from "../service/QuestionsService.ts";
import {FilterTabItem} from "../components/users/FilterTabItem.tsx";
import {ITab} from "./UsersView.tsx";
import {message} from "antd";
import {IQuestionCard} from "../Interface.ts";
import {QuestionCard} from "../components/question/question-page/QuestionCard.tsx";


const fetchNum = 50;

export const tabs: ITab[] = [
	{tab: 'thumbs', title: 'Thumbs'},
	{tab: 'newquestion', title: 'New Questions'},
]

export const QuestionsView = () => {
	// const params = useParams()
	const [nextFetch, setNextFetch] = useState<number>(0);
	const [tab, setTab] = useState<ITab>(tabs[0])
	const [questions, setQuestions] = useState<IQuestionCard[]>([])
	useEffect(() => {
		Ques_GetQuestionsByTab(tabs[0].tab, nextFetch, fetchNum).catch(err => console.error(err))
		setNextFetch(nextFetch + fetchNum)
	}, [])

	const changeTab = async (selectTab: ITab) => {
		if (tab === selectTab) return;
		const response = await Ques_GetQuestionsByTab(selectTab.tab, 0, fetchNum)
		if (!response.ok) {
			message.error(`无法查询问题信息`)
			return
		}
		setTab(selectTab)
		setNextFetch(fetchNum)
		setQuestions(await response.json());
	}

	const fetchMore = async (selectTab: string) => {
		const response = await Ques_GetQuestionsByTab(selectTab, nextFetch, fetchNum);
		if (!response.ok) {
			message.error(`无法查询问题信息`)
			return
		}
		setNextFetch(nextFetch + fetchNum)
		const newQuestions = await response.json()
		setQuestions({...questions, ...newQuestions});
	}

	return <div>
		<div className={"view-title"}>questions</div>
		<div className="filter-tabs">
			{tabs.map((tab) => (
				<FilterTabItem tab={tab} func={changeTab}/>
			))}
		</div>
		<div className={"questions-show"}>
			{
				questions.map(question => (<QuestionCard question={question}/>))
			}
		</div>
		<div className={"fetch-more-button"}>
			<button onClick={() => {
				fetchMore(tab.tab).catch(err => console.error(err))
			}}>show more
			</button>
		</div>
	</div>;
};
