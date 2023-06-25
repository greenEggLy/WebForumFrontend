interface Props {
	tag_name: string;
}

// tag展示
export const TagShowItem = ({tag_name}: Props) => {
	return <div className={"one-tag"}>{tag_name}</div>;
};
