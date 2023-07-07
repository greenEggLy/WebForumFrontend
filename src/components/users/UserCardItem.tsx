import {IUserCard} from "../../Interface.ts";
import {TagShowItem} from "../tag/TagShowItem.tsx";
import "./UserCardItem.css"
import { useNavigate } from "react-router-dom";

interface Props {
	user: IUserCard;
}

// users展示界面的用户卡片
export const UserCardItem = ({user}: Props) => {
	const navigate = useNavigate();
	return (
		<div className={"user-card"} onClick={() => {
			navigate(`/user/${user.id}`)
		}}>
					<div className={"user-avatar-container"}>
						<img className={'avatar'} src={user.avatar}/>
					</div>

					<div className={"user-description-container"}>
						<p className={'username'}>{user.username}</p>
						<p className={'location'}>{user.location}</p>
						<p className={'follower_number'}>{`${user.followedCount} followers`}</p>
						<p className={'profile'}>{user.about}</p>
						<div className={"user-card-footer"}>
							{user.tags.map((field) => (
								<TagShowItem tag_name={field.content}/>
							))}
						</div>
					</div>

		</div>
	);
};
