import ModalRoot from "../Modal";
import EditPencilOutlinedIcon from "../../assets/svg-icons/EditPencilOutlinedIcon";
import UpdateChatForm from "../UpdateChatForm";

export default function UpdateChatModal({ chatData }) {
    return (
        <ModalRoot>
            <ModalRoot.OpenButton clsName="chat-preview_edit-button">
                <EditPencilOutlinedIcon size="14px"/>
            </ModalRoot.OpenButton>
            <ModalRoot.Container>
                <ModalRoot.Header>Update your chat</ModalRoot.Header>
                <ModalRoot.Content>
                    {({closeModal}) => <UpdateChatForm chatData={chatData} onClose={closeModal} /> }
                </ModalRoot.Content>
            </ModalRoot.Container>
        </ModalRoot>
    )
}