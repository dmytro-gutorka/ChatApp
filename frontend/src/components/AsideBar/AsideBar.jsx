import './asideBar.css'
import ChatSearch from "../ChatSearch";
import ChatsList from "../ChatsList";
import CreateChatModal from "../CreateChatModal";


export default function AsideBar() {

    return (
        <aside className="aside-bar">
            <div className="aside_container">
                <div className="aside_header">
                    <ChatSearch/>
                    <CreateChatModal/>
                </div>
            </div>
                <ChatsList/>
        </aside>
    )
}