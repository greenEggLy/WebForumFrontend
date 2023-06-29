import "./SearchBar.css"
import logo from "../../assets/logos/logo.png"
import { SearchBox } from "./SearchBox.tsx";

export const SearchBar = () => {
  return (
    <div className={'top-search-bar-container'} >
      <div className={'top-logo-container'}>
        <img src={logo} className={'logo'} style={{width:'7rem', margin:'0.5rem'}}/>
      </div>
      <div className={'top-search-box-container'}>
        <SearchBox placeholder={'search'} onSearch={(s:string) => console.log(s)}/>
      </div>
      <div className={'logout-button-container'}>
        <div className={'logout-button'}>
          <a href={'/login'} style={{position:'relative' ,top:'0.25rem', color:"white"}}>登出</a>
        </div>
      </div>
    </div>
  );
}

// const styles = {
//   searchBar: {
//     height: '100%',
//     backgroundColor: 'black',
//   },
//   search: {
//     marginTop: '0.65rem',
//     width: '50vw',
//     marginLeft: '10vw',
//     top: '-1.5rem',
//     borderRadius: '1rem',
//   }
// }