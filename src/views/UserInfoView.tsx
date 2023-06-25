import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IUser} from "../Interface.ts";
import {EmptyUser} from "../data/EmptyObject.ts";
import {User_GetUser} from "../service/UserService.ts";
import {TagShowItem} from "../components/tag/TagShowItem.tsx";

export const UserInfoView = () => {
	const params = useParams();
	const [user, setUser] = useState<IUser>(EmptyUser);
	useEffect(() => {
		const getUserInfo = async (id: string) => {
			const response = await User_GetUser(id);
			if (!response.ok) return;
			setUser(await response.json());
		};
		if (!params.userid) return;
		getUserInfo(params.userid).catch((err) => console.error(err));
	}, [params.userid]);
	return (
		<div>
			<div className={"view-title"}>{"User Info"}</div>
			<div className={"user-info-header-frame"}>
				<div className={"user-avatar"}>
					<img alt={"haha"} resource={user.avatar}/>
				</div>
				<div className={"user-meta"}>
					<text className={"user-profile"}>{user.profile}</text>
					<text className={"user-email"}>{user.email}</text>
					<text className={"user-location"}>{user.location}</text>
					<span>
            {user.fields.map((field) => (
				<TagShowItem tag_name={field.content}/>
			))}
          </span>
				</div>
			</div>
			<div className={"user-likes-and-save"}>

			</div>
		</div>
	);
};
