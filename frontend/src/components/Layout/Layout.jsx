import '../../styles/normalize.css'
import '../../styles/styles.css'
import '../../styles/buttons.css'
import './layout.css'

import Header from "../Header";
import { Outlet } from "react-router";
import AsideBar from "../AsideBar";


function Layout() {

    return (
      <div className="layout">
        <Header />
        <AsideBar />
           <div className="layout_content">
        <Outlet/>
          </div>
      </div>
  )
}

export default Layout
