import {useParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import getMessages from "../services/messages/getMessages";

export default function useMessages() {
    const { chatId } = useParams()

    const queryKey = ['messages', String(chatId)]

    return useQuery({
        queryKey,
        queryFn: () => getMessages(chatId),
        staleTime: 0
    })
}