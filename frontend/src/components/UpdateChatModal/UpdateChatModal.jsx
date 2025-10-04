import ModalRoot from "../Modal";
import EditPencilOutlinedIcon from "../../assets/svgIcons/EditPencilOutlinedIcon";
import UpdateChatForm from "../UpdateChatForm";

export default function UpdateChatModal({ chatData }) {
    return (
        <ModalRoot>
            <ModalRoot.OpenButton clsName="aside_edit-chat-button">
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