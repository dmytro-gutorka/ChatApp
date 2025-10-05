import './asideBar.css'
import ChatSearch from "../ChatSearch";
import ChatsList from "../ChatsList";
import CreateChatModal from "../CreateChatModal";
import {useState} from "react";
import AutoMessagesButton from "../AutoMessagesButton";


export default function AsideBar() {
    const [search, setSearch] = useState('')

    return (
        <aside className="aside-bar">
            <div className="aside_container">
                <div className="aside_header">
                    <ChatSearch search={search} onSearch={setSearch}/>
                    <CreateChatModal/>
                    <AutoMessagesButton/>
                </div>
            </div>
                <ChatsList search={search}/>
        </aside>
    )
}