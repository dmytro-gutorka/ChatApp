import {useQuery} from "@tanstack/react-query";
import getChats from "../services/chats/getChats";

export default function useChats(search) {
    const queryKey = ['chats', search]

    return useQuery({
        queryKey,
        queryFn: () => getChats(search),
    })
}