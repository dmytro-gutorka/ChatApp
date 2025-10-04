import ModalRoot from "../Modal";
import TrashBinOutlinedIcon from "../../assets/svgIcons/TrashBinOutlinedIcon";
import Button from "../Button";
import deleteChat from "../../services/chats/deleteChat";
import {useQueryClient} from "@tanstack/react-query";

export default function DeleteChatModal({chatId}) {
    const queryClient = useQueryClient()

    async function handleDeleteChat() {
        await deleteChat(chatId)
        await queryClient.invalidateQueries({ queryKey: ['chats'] })
    }

    return (
        <ModalRoot>
            <ModalRoot.OpenButton clsName="chat-preview_delete-button">
                <TrashBinOutlinedIcon size="14px"/>
            </ModalRoot.OpenButton >
            <ModalRoot.Container>
                <ModalRoot.Header subHeader=" You can't undo this action.">
                    Are you sure you want to delete this chat ?
                </ModalRoot.Header>

                <ModalRoot.Content>
                    {({ closeModal }) => <Button clsName="button--contained" onClick={async () => {
                        await handleDeleteChat()
                        closeModal()
                    }}>Delete chat</Button>}
                </ModalRoot.Content>
            </ModalRoot.Container>
        </ModalRoot>
    )
}