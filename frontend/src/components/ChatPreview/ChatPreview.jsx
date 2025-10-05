import './chatPreview.css'

import UpdateChatModal from "../UpdateChatModal";
import DeleteChatModal from "../DeleteChatModal";
import {NavLink} from "react-router";
import cutMessage from "../../utils/cutMessage";

export default function ChatPreview({ data }) {
    const fullName = data.contact.firstName + ' ' + data.contact.lastName
    const shortenedMessaged = cutMessage(data?.lastMessageText)

    return (

        <NavLink className="chat-preview_link" to={`chat/${data._id}`}>
        <li className="chat-preview">
            <div className="chat-preview_outer-container">

                <div className="chat-preview_container">
                    <img className="chat-preview_user-icon" src='/./user-chat-icon.png' alt="user avatar" width='42px' height='38px'/>
                    <div  className="chat-preview_user-info">
                        <p className="chat-preview_user-name">
                            {fullName}
                        </p>
                        <p className="chat-preview_last-message">
                            {data.lastMessageText ? shortenedMessaged : 'no messages yet'}
                        </p>
                    </div>
                </div>

                <div className="chat-preview_buttons-container">
                    <UpdateChatModal chatData={data}/>
                    <DeleteChatModal chatId={data._id}/>
                </div>

            </div>
        </li>
        </NavLink>
    )
}