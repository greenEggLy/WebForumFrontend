import { SearchBar } from "../components/Home/SearchBar";
import { SideBar } from "../components/Home/SideBar";

export const HomeView = () => {
  return (
    <div style={styles.home}>
      <div style={styles.searchBar}>
        {/*this search bar needs to be reconstructed because it's too ugly*/}
        <SearchBar />
      </div>
      <div>
        <div style={styles.sideBarArea}>
          <SideBar />
        </div>
      </div>
    </div>
  )
};

const styles = {
  searchBar: {
    height: '5vh',
  },
  home:{
    height: '100vh',
    width: '100vw',
  },
  sideBarArea:{
    width: '20vw',
    height: '100vh',
  }
}
