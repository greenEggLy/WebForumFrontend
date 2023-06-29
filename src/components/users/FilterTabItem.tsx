import {ITab} from "../../views/UsersView.tsx";
import {Segmented} from "antd";
import React, {CSSProperties} from "react";

interface Props {
	tabs: ITab[]
	setTab?: React.Dispatch<React.SetStateAction<ITab>>
	func: (tab: ITab) => Promise<void>
}

// questions filter
export const FilterTabItem = ({tabs, setTab, func}: Props) => {
	const onChange = async (value: string | number) => {
		for (const tab of tabs) {
			if (tab.tab === value) {
				if (tab && setTab) setTab(tab);
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
		float:"right",
		margin:"1rem",
		marginTop:0
	}
}
