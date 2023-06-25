import {useEffect, useState} from "react";
import {QUES_GetQuestions} from "../service/QuestionsService.ts";
import {FilterTabItem} from "../components/users/FilterTabItem.tsx";
import {ITab} from "./UsersView.tsx";
import {message} from "antd";
import {IQuestionCard} from "../Interface.ts";
import {QuestionCard} from "../components/question/question-page/QuestionCard.tsx";


const fetchNum = 50;

const tabs: ITab[] = [
	{tab: 'thumbs', title: 'Thumbs'},
	{tab: 'newquestion', title: 'New Questions'},
]

export const QuestionsView = () => {
	const [nextFetch, setNextFetch] = useState<number>(0);
	const [tab, setTab] = useState<ITab>(tabs[1])
	const [questions, setQuestions] = useState<IQuestionCard[]>([])
	useEffect(() => {
		QUES_GetQuestions(tabs[0].tab, nextFetch, fetchNum).catch(err => console.error(err))
		setNextFetch(nextFetch + fetchNum)
	}, [])

	const changeTab = async (selectTab: string) => {
		if (tab.tab === selectTab) return;
		const response = await QUES_GetQuestions(selectTab, 0, fetchNum)
		if (!response.ok) {
			message.error(`无法查询问题信息`)
			return
		}
		tabs.forEach(tab => {
			if (tab.tab === selectTab) {
				setTab(tab);
				return;
			}
		})
		setNextFetch(fetchNum)
		setQuestions(await response.json());
	}

	const fetchMore = async (selectTab: string) => {
		const response = await QUES_GetQuestions(selectTab, nextFetch, fetchNum);
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
		<div className="questions-filter-tabs">
			{tabs.map((tab) => (
				<FilterTabItem tab={tab.tab} title={tab.title} func={changeTab}/>
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
