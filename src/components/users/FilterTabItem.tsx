import {ITab} from "../../views/UsersView.tsx";

interface Props {
	tab: string;
	title: string;
	tabItem?: ITab;
	func: (tab: ITab | string) => Promise<void>
}

// 用户filter选择
export const FilterTabItem = ({tab, title, tabItem, func}: Props) => {
	return (
		<button
			className={"filter-tab"}
			onClick={async () => {
				if (tabItem)
					await func(tabItem);
				else
					await func(tab)
			}}
		>
			{title}
		</button>
	);
};
