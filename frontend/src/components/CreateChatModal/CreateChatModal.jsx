import ModalRoot from "../Modal";
import CreateChatForm from "../CreateChatForm";

export default function CreateChatModal() {
    return (
        <ModalRoot>
            <ModalRoot.OpenButton clsName="button--contained">+ New Chat</ModalRoot.OpenButton >
            <ModalRoot.Container>
                <ModalRoot.Header>Create new chat</ModalRoot.Header>
                <ModalRoot.Content>
                    {({ closeModal }) => <CreateChatForm action="create" onClose={closeModal} />}
                </ModalRoot.Content>
            </ModalRoot.Container>
        </ModalRoot>
    )
}