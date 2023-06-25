interface Props {
	tab: string;
	title: string;
	func: (tab: string) => void
}

// 用户filter选择
export const FilterTabItem = ({tab, title, func}: Props) => {
	return (
		<button
			className={"filter-tab"}
			onClick={async () => {
				await func(tab);
			}}
		>
			{title}
		</button>
	);
};
