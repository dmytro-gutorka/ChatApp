import ChatOverlayHeader from "../ChatOverlayHeader";
import MessagesList from "../MessagesList";
import SendMessageInput from "../SendMessageInput";
import {useParams} from "react-router";

export default function ChatOverlay() {
     const { chatId } = useParams()

    return (
        <div>
            <ChatOverlayHeader/>
            <MessagesList/>
            <SendMessageInput/>
        </div>
    )

}