import {ITab} from "../../views/UsersView.tsx";

interface Props {
	tab: ITab
	func: (tab: ITab) => Promise<void>
}

// questions filter
export const FilterTabItem = ({tab, func}: Props) => {
	return (
		<span>
			<button
				className={"filter-tab"}
				onClick={async () => {
					if (tab)
						await func(tab);
				}}
			>{tab.title}
			</button>
		</span>
	);
};
