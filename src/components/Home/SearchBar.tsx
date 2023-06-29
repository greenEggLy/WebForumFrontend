import {SearchOutlined} from "@ant-design/icons";
import {Input} from "antd";
import "./SearchBar.css"
import logo from "../../assets/logos/logo.png"
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store.ts";
import {changeKeyword} from "../../features/keyword/keywordSlice.ts";

export const SearchBar = () => {
	const keyword = useSelector((state: RootState) => state.keyword.value);
	const dispatch = useDispatch()

	return (
		<div className={'top-search-bar-container'}>
			<img src={logo} className={'logo'} style={{width: '7rem', margin: '0.5rem'}}/>
			<Input style={styles.search} prefix={<SearchOutlined/>} value={keyword} onChange={(event) => {
				dispatch(changeKeyword(event.target.value))
			}}/>
			<div className={'logout-button-container'}>
				<a href={'/login'} style={{position: 'relative', top: '0.5rem', color: "white"}}>登出</a>
			</div>
		</div>
	);
}

const styles = {
	searchBar: {
		height: '100%',
		backgroundColor: 'black',
	},
	search: {
		marginTop: '0.65rem',
		width: '50vw',
		marginLeft: '10vw',
		top: '-1.5rem',
		borderRadius: '1rem',
	}
}
