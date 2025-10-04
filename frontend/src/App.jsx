import './styles/normalize.css'
import './styles/styles.css'
import './styles/buttons.css'

import Header from "./components/Header";
import AsideBar from "./components/AsideBar";
import ChatSearch from "./components/ChatSearch";


function App() {
  return (
    <>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh'}}>
            <Header />
            <AsideBar />
        </div>
    </>
  )
}

export default App
