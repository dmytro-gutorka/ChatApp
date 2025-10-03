import './chatSearch.css'
import SearchOutlinedIcon from "../../assets/svgIcons/SearchOutlinedIcon";

export default function ChatSearch() {
    return (
        <div className="chat-search_container">
            <SearchOutlinedIcon clsName='chat-search_icon' size="16px"/>
            <input className="chat-search" type="text" placeholder='Search chats...'/>
        </div>
    )
}