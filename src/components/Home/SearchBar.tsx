import {SearchOutlined} from "@ant-design/icons";
import { Input } from "antd";

export const SearchBar = () => {
  return (
    <div style={styles.searchBar} >
      <Input style={styles.search} size='small' prefix={<SearchOutlined />}/>
    </div>
  );
}

const styles = {
  searchBar: {
    height: '100%',
    backgroundColor: 'black',
  },
  search: {
    marginTop: '0.3rem',
    width: '50vw',
    marginLeft: '25vw',
    borderRadius: '1rem',
  }
}