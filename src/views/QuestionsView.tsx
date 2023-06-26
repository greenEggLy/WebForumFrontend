import {useEffect, useState} from "react";
import {Ques_GetQuestionsByTab} from "../service/QuestionsService.ts";
import {FilterTabItem} from "../components/users/FilterTabItem.tsx";
import {ITab} from "./UsersView.tsx";
import {message} from "antd";
import { IQuestionCard } from "../Interface.ts";
import {QuestionCard} from "../components/question/question-page/QuestionCard.tsx";
import {CSSProperties} from "react";

const fetchNum = 50;

//for test
//@ts-ignore
const testQuestion: IQuestionCard = {
	id:1,
	title: '为什么我还没放暑假？',
	last_edit: new Date(),
	browse_time: 1437,
	tags: [
		{id: 1, content: 'test1'},
		{id: 2, content: 'test2'},
	]
}

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
		//for test
		setQuestions([testQuestion, testQuestion, testQuestion])
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
		<div className={"view-title"} style={styles.titleContainer}>
			<h2>All Questions</h2>
		</div>
		<div className="filter-tabs" style={styles.filterContainer}>
			<FilterTabItem tabs={tabs} func={changeTab} />
		</div>
		<div className={"questions-show"} style={styles.questionContainer}>
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
