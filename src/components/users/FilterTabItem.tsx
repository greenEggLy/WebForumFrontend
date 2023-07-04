import {Segmented} from "antd";
import {CSSProperties} from "react";
import {ITab} from "../../views/UsersView.tsx";
import {IQuestionTab} from "../../features/tab/tabSlice.ts";
import {IUserTab} from "../../features/tab/userTabSlice.ts";

interface Props {
	tabs: ITab[] | IQuestionTab[] | IUserTab[]
	setTab?: (tab: string) => void
	func: (tab: ITab) => Promise<void>
}

// questions filter
export const FilterTabItem = ({tabs, setTab, func}: Props) => {
	const onChange = async (value: string | number) => {
		for (const tab of tabs) {
			if (tab.tab === value) {
				if (tab && setTab) setTab(tab.tab);
				await func(tab)
			}
		}
	}

	return (
		<Segmented options={tabs.map(tab => tab.tab)} onChange={onChange} style={styles.segmented}/>
	);
};

const styles: { [key: string]: CSSProperties } = {
	segmented: {
		float: "right",
		margin: "1rem",
		marginTop: 0
	}
}
