import './chatsList.css'

import useChats from "../../hooks/useChats";
import ChatPreview from "../ChatPreview";

export default function ChatsList() {
    const { data, isSuccess } = useChats()

    if (!isSuccess) return <div>Loading...</div>

    return (
        <ul className="chats-list">
            {data?.chats?.map(chat => <ChatPreview key={chat._id} data={chat}/>)}
        </ul>
    )
}