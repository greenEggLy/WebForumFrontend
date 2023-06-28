import {BulbOutlined, SearchOutlined, TagsOutlined, UserOutlined} from "@ant-design/icons";
import {Input, MenuProps} from "antd";
import React from "react";

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