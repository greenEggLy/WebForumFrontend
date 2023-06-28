import {IUserCard} from "../../Interface.ts";
import {TagShowItem} from "../tag/TagShowItem.tsx";
import "./UserCardItem.css"

interface Props {
	user: IUserCard;
}

// users展示界面的用户卡片
export const UserCardItem = ({user}: Props) => {
	return (
		<div className={"user-card"} >
					<div className={"user-avatar-container"}>
						<img className={'avatar'} src={user.avatar}/>
					</div>

					<div className={"user-description-container"}>
						<p className={'username'}>{user.username}</p>
						<p className={'location'}>{user.location}</p>
						<p className={'follower_number'}>{`${user.followers_number} followers`}</p>
						<p className={'profile'}>{user.profile}</p>
						<div className={"user-card-footer"}>
							{user.fields.slice(0,4).map((field) => (
								<TagShowItem tag_name={field.content}/>
							))}
						</div>
					</div>

		</div>
	);
};
