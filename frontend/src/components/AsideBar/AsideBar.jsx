import './asideBar.css'
import ChatSearch from "../ChatSearch";
import ChatsList from "../ChatsList";
import CreateChatModal from "../CreateChatModal";
import {useState} from "react";


export default function AsideBar() {
    const [search, setSearch] = useState('')

    return (
        <aside className="aside-bar">
            <div className="aside_container">
                <div className="aside_header">
                    <ChatSearch search={search} onSearch={setSearch}/>
                    <CreateChatModal/>
                </div>
            </div>
                <ChatsList search={search}/>
        </aside>
    )
}