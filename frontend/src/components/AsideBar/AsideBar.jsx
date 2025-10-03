import './asideBar.css'
import ChatSearch from "../ChatSearch";
import ChatsList from "../ChatsList";
import Button from "../Button";

export default function AsideBar() {
    return (
        <aside className="aside-bar">
            <div className="aside_container">
                <div className="aside_header">
                    <ChatSearch/>
                    <Button clsName="aside_new-chat-button">+ New Chat</Button>
                </div>
                <ChatsList/>
            </div>
        </aside>
    )
}