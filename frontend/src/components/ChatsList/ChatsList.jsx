import './chatsList.css'

import useChats from "../../hooks/useChats";
import ChatPreview from "../ChatPreview";
import {useDebouncedValue} from "../../hooks/useDebouncedValue";

export default function ChatsList({ search}) {
    const debouncedSearch = useDebouncedValue(search, 300)

    const { data } = useChats(debouncedSearch)

    return (
        <ul className="chats-list">
            {data?.chats?.map(chat => <ChatPreview key={chat._id} data={chat}/>)}
        </ul>
    )
}