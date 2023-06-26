import {ITab} from "../../views/UsersView.tsx";
import {Segmented} from "antd";
import { CSSProperties } from "react";

interface Props {
	tabs: ITab[]
	func: (tab: ITab) => Promise<void>
}

// questions filter
export const FilterTabItem = ({tabs, func}: Props) => {
	const onChange = async (value:string | number) => {
		for(let tab of tabs){
			if(tab.tab === value)
				await func(tab)
		}
	}

	return (
		<span>
			<Segmented options={tabs.map(tab => tab.tab)} onChange={onChange} style={styles.segmented}/>
		</span>
	);
};

const styles: { [key: string]: CSSProperties } = {
	segmented:{
		position:"absolute",
		right:'1rem'
	}
}
