import './styles/normalize.css'
import './styles/styles.css'
import './styles/buttons.css'

import Header from "./components/Header";
import AsideBar from "./components/AsideBar";
import {Outlet} from "react-router";


function Layout() {
  return (
    <>
        <Header />
        <div style={{ display: 'flex', flexDirection: 'row', height: '100vh'}}>
            <AsideBar />
            <Outlet/>
        </div>
    </>
  )
}

export default Layout
