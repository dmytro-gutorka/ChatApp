import './asideBar.css'
import ChatSearch from "../ChatSearch";
import ChatsList from "../ChatsList";
import ModalWindow from "../ModalWindow";
import ChatForm from "../ChatForm";

export default function AsideBar() {
    return (
        <aside className="aside-bar">
            <div className="aside_container">
                <div className="aside_header">
                    <ChatSearch/>
                    <ModalWindow openButtonTitle="+ New Chat" formId='chat-form'>
                        <ChatForm/>
                    </ModalWindow>
                </div>
            </div>
                <ChatsList/>
        </aside>
    )
}