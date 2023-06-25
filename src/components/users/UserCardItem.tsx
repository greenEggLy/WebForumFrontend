import {IUserCard} from "../../Interface.ts";
import {TagShowItem} from "../tag/TagShowItem.tsx";

interface Props {
	user: IUserCard;
}

// users展示界面的用户卡片
export const UserCardItem = ({user}: Props) => {
	return (
		<div className={"user-card"}>
			<div className={"user-card-upper"}>
				<div className={"user-card-left"}>
					<img alt={"haha"} resource={user.avatar}/>
				</div>
				<div className={"user-card-right"}>
					<text>{user.username}</text>
					<text>{user.location}</text>
					<text>{`${user.followers_number} followers`}</text>
					<text>{user.profile}</text>
				</div>
			</div>
			<div className={"user-card-footer"}>
				{user.fields.slice(0, 3).map((field) => (
					<TagShowItem tag_name={field.content}/>
				))}
			</div>
		</div>
	);
};
