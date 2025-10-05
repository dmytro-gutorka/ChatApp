import './chatsList.css'

import useChats from "../../hooks/useChats";
import ChatPreview from "../ChatPreview";
import {useDebouncedValue} from "../../hooks/useDebouncedValue";
import {useQueryClient} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {socket} from "../../config/sockets";
import {useToast} from "../Toast/Toast";

export default function ChatsList({ search}) {
    const [activeChatId, setActiveChatId] = useState(null)
    const debouncedSearch = useDebouncedValue(search, 300)
    const { data } = useChats(debouncedSearch)

    const queryClient = useQueryClient()


    const { success: toastSuccess} = useToast()

    useEffect(() => {
        async function onNewMsg(msg) {
            await queryClient.invalidateQueries({ queryKey: ['chats'] })
            await queryClient.invalidateQueries({ queryKey: ['messages', String(msg.chatId)] })

            const currentChat = data?.chats?.find(chat => chat._id === msg.chatId)

            if (msg.isSystem === true) toastSuccess(`New message in chat "${currentChat.contact.firstName} ${currentChat.contact.lastName}"`)
        }

        socket.off('message:new').on('message:new', onNewMsg);
        return () => socket.off('message:new', onNewMsg);
    }, [queryClient, debouncedSearch, activeChatId]);

    return (
        <ul className="chats-list">
            {data?.chats?.map(chat => <ChatPreview key={chat._id} onActiveChatId={setActiveChatId} data={chat}/>)}
        </ul>
    )
}