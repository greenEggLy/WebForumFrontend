import "./SearchBar.css"
import logo from "../../assets/logos/logo.png"
import {SearchBox} from "./SearchBox.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store.ts";
import {changeKeyword} from "../../features/keyword/keywordSlice.ts";

export const SearchBar = () => {
	const keyword = useSelector((state: RootState) => state.keyword.value)
	const dispatch = useDispatch();

	return (
		<div className={'top-search-bar-container'}>
			<div className={'top-logo-container'}>
				<img src={logo} className={'logo'} style={{width: '7rem', margin: '0.5rem'}}/>
			</div>
			<div className={'top-search-box-container'}>
				<SearchBox
					placeholder={'Search'}
					category={"question"}
					value={keyword}
					onChange={(text) => dispatch(changeKeyword(text))}
					isNavigate
				/>
			</div>
			<div className={'logout-button-container'}>
				<div className={'logout-button'}>
					<a href={'/login'} style={{position: 'relative', top: '0.25rem', color: "white"}}>登出</a>
				</div>
			</div>
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
