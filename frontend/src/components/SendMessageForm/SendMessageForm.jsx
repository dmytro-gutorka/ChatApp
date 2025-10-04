import './sendMessageForm.css'

import Button from "../Button";
import SendMessageOutlinedIcon from "../../assets/svgIcons/SendMessageOutlinedIcon";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useParams} from "react-router";
import createMessage from "../../services/messages/createMessage";

export default function SendMessageForm() {
    const queryClient = useQueryClient()
    const { chatId } = useParams()

    const { mutate: sendMessage} = useMutation({
        mutationFn: (text) => createMessage(chatId, text),
    })

    async function handleMessage(e) {
        e.preventDefault()

        const text = e.target.message.value

        sendMessage(text)

        await queryClient.invalidateQueries({ queryKey: ['messages', chatId] })
    }


    return (
        <form className="send-message_form" onSubmit={handleMessage}>
            <input className="send-message_input" type="text" name="message" placeholder="Type a message..."/>
            <Button clsName="send-message_button" icon={<SendMessageOutlinedIcon/>}/>
        </form>
    )
}