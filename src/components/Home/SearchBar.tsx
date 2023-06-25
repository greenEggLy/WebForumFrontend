import Search from "antd/es/input/Search";
import {SearchOutlined} from "@ant-design/icons";

export const SearchBar = () => {
  return (
    <div style={styles.searchBar} >
      <Search style={styles.search} size='small' prefix={<SearchOutlined />} allowClear={false}/>
    </div>
  );
}

const styles = {
  searchBar: {
    height: '100%',
    backgroundColor: 'black',
  },
  search: {
    marginTop: '0.8vh',
    width: '50vw',
    marginLeft: '25vw',
    fontSize: '2px',
    boxShadow: '0 0 0 1000px #000000 inset',
    borderRadius: '10vh',
  }
}