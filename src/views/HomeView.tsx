import { SearchBar } from "../components/Home/SearchBar";
import { SideBar } from "../components/Home/SideBar";
import {Outlet} from "react-router-dom";
import {CSSProperties} from "react";

export const HomeView = () => {
  // @ts-ignore
  // @ts-ignore
  return (
    <div style={styles.home}>
      <div style={styles.searchBar}>
        {/*this search bar needs to be reconstructed because it's too ugly*/}
        <SearchBar />
      </div>
      <div style={styles.mainArea}>
        <div style={styles.sideBarArea}>
          <SideBar />
        </div>
        <div style={styles.outletArea}>
          <Outlet />
        </div>
      </div>
    </div>
  )
};


const styles: { [key: string]: CSSProperties } = {
  searchBar: {
    height: '2rem',
  },
  home:{
    height: '100vh',
    width: '100vw',
  },
  mainArea:{
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '100vw',
  },
  sideBarArea:{
    width: '20vw',
    height: '100vh',
    float:'left'
  },
  outletArea:{
    width: '80vw',
    float:'left'
  }
}
