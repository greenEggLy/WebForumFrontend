import {Tag} from "antd";
import color from "../../constants/color.ts";
interface Props {
	tag_name: string;
}

// tag展示(small)
export const TagShowItem = ({tag_name}: Props) => {

	return <Tag className={"one-tag"}  style={{marginRight:'4px',maskSize:'10px',fontSize:'12px',color:color.gblue,borderColor:color.gblue,backgroundColor:"white"}}>{tag_name}</Tag>;
};
