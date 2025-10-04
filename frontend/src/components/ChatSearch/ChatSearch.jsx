import './chatSearch.css'
import SearchOutlinedIcon from "../../assets/svgIcons/SearchOutlinedIcon";
import {useState} from "react";

export default function ChatSearch() {
    const [search, setSearch] = useState('')

    return (
        <div className="chat-search_container">
            <SearchOutlinedIcon clsName='chat-search_icon' size="16px"/>
            <input onChange={(e) => setSearch(e.target.value)} value={search}
                   className="chat-search" type="text" placeholder='Search chats...'/>
        </div>
    )
}