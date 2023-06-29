import { SearchOutlined } from "@ant-design/icons";
import "./SearchBox.css"

interface Props {
  placeholder: string;
  onSearch: (value: string) => void;
}

export const SearchBox = ({placeholder, onSearch}:Props) => {

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(event.currentTarget.value)
    }
  }

  return (
    <div className={"search-box"}>
      <div className={'search-box-icon'}>
        <SearchOutlined/>
      </div>
      <div className={'search-box-input-box-container'}>
        <input className={'search-box-input-box'} type="text" placeholder={placeholder} onKeyDown={handleKeyDown} style={{border:'none'}}/>
      </div>
    </div>
  )
}