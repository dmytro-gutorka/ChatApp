import './styles/normalize.css'
import './styles/styles.css'
import './styles/buttons.css'

import Header from "./components/Header";
import AsideBar from "./components/AsideBar";
import {Outlet} from "react-router";


function Layout() {
  return (
      <>
          <div style={{ height: '100%'}}>

              <Header />
              <div style={{ display: 'flex', height: '100%', flexDirection: 'row' ,justifyContent: 'space-between'}}>
                  <AsideBar />
                  <Outlet/>
              </div>
          </div>

      </>
  )
}

export default Layout
