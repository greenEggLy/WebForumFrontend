import {Tag} from "antd";
import color from "../../constants/color.ts";

interface Props {
	tag_name: string;
}

// tag展示(small)
export const TagShowItem = ({tag_name}: Props) => {

	return <Tag className={"one-tag"} style={{
		marginRight: '0.2rem',
		maskSize: '0.3rem',
		fontSize: '0.3rem',
		color: color.tblue,
		borderColor: color.tblue,
		backgroundColor: color.lblue
	}}>{tag_name}</Tag>;
};
