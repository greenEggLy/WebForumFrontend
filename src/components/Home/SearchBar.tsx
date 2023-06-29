import {SearchOutlined} from "@ant-design/icons";
import {Input} from "antd";
import "./SearchBar.css"
import logo from "../../assets/logos/logo.png"

export const SearchBar = () => {
  return (
    <div className={'top-search-bar-container'} >
      <img src={logo} className={'logo'} style={{width:'7rem', margin:'0.5rem'}}/>
      <Input style={styles.search} prefix={<SearchOutlined />}/>
      <div className={'logout-button-container'}>
        <a href={'/login'} style={{position:'relative' ,top:'0.5rem', color:"white"}}>登出</a>
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