import {Button} from "antd";
import color from "../../constants/color.ts";
interface Props {
	tag_name: string;
}

// tag展示(small)
export const TagShowItem = ({tag_name}: Props) => {
	return <Button className={"one-tag"} type="dashed" size={"small"} style={{fontSize:'10px',marginRight:'5px',color:color.gblue,borderColor:color.gblue}}>{tag_name}</Button>;
};
