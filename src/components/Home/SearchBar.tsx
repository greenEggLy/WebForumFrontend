import "./SearchBar.css"
import logo from "../../assets/logos/logo.png"
import {SearchBox} from "./SearchBox.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store.ts";
import {changeKeyword} from "../../features/keyword/keywordSlice.ts";
import { User_GetMyInfo } from "../../service/UserService.ts";
import { IUserCard } from "../../Interface.ts";
import { login } from "../../features/user/userSlice.ts";
import { useEffect, useState } from "react";
import { isLogin } from "../../utils/login.ts";

export const SearchBar = () => {
	const keyword = useSelector((state: RootState) => state.keyword.value)
	const avatar = useSelector((state: RootState) => state.user.avatar)
	const dispatch = useDispatch();

	const setUserInfo = async () => {
		const response = await User_GetMyInfo();
		const json:IUserCard = await response.json();
		const username = json.username;
		const avatar = json.avatar;
		dispatch(login({username, avatar}));
	}

	useEffect(() => {
		if(isLogin()){
			setUserInfo().catch(err => console.error(err));
		}
	}, [])

	return (
		<div className={'top-search-bar-container'}>
			<div className={'top-logo-container'}>
				<img src={logo} className={'logo'} style={{width: '7rem', margin: '0.5rem'}}/>
			</div>
			<div className={'top-search-box-container'}>
				<SearchBox
					placeholder={'搜索问题'}
					category={"question"}
					value={keyword}
					onChange={(text) => dispatch(changeKeyword(text))}
					isNavigate
				/>
			</div>
			<div className={'my-avatar-container'}>

			</div>
			{
				(avatar &&
				<div className={'logout-button-container'}>
					<div className={'my-avatar'}>
						<img src={avatar} style={{width: '2rem', height: '2rem', borderRadius: '1rem'}}/>
					</div>
					<div className={'logout-button'}>
						<a style={{color: "white"}} onClick={
							() => {
								localStorage.removeItem('accessToken');
								localStorage.removeItem('refreshToken');
								localStorage.removeItem('expire');
								window.location.reload();
							}
						}>登出</a>
					</div>
				</div>)
				||
				(
					<div className={'login-button'}>
						<a href={'/login'} style={{color: "white"}}>登录</a>
					</div>
				)
			}

		</div>
	);
}

// const styles = {
// 	searchBar: {
// 		height: '100%',
// 		backgroundColor: 'black',
// 	},
// 	search: {
// 		marginTop: '0.65rem',
// 		width: '50vw',
// 		marginLeft: '10vw',
// 		top: '-1.5rem',
// 		borderRadius: '1rem',
// 	}
// }
