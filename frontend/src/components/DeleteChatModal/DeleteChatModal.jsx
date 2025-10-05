import ModalRoot from '../Modal';
import TrashBinOutlinedIcon from '../../assets/svg-icons/TrashBinOutlinedIcon';
import Button from '../Button';
import deleteChat from '../../services/chats/deleteChat';
import { useQueryClient } from '@tanstack/react-query';
import {useNavigate, useParams} from "react-router";

export default function DeleteChatModal({ chatId }) {
  const queryClient = useQueryClient();

  async function handleDeleteChat() {
    await deleteChat(chatId);
    await queryClient.invalidateQueries({ queryKey: ['chats'] });
  }
  const navigate = useNavigate();
  const { chatId: currentChatId } = useParams()

  return (
    <ModalRoot>
      <ModalRoot.OpenButton clsName="chat-preview_delete-button">
        <TrashBinOutlinedIcon size="14px" />
      </ModalRoot.OpenButton>
      <ModalRoot.Container>
        <ModalRoot.Header subHeader=" You can't undo this action.">
          Are you sure you want to delete this chat ?
        </ModalRoot.Header>

        <ModalRoot.Content>
          {({ closeModal }) => (
            <Button
              clsName="button--contained"
              onClick={async () => {
                await handleDeleteChat();
                closeModal();
                if (currentChatId === chatId) navigate('/');
              }}
            >
              Delete chat
            </Button>
          )}
        </ModalRoot.Content>
      </ModalRoot.Container>
    </ModalRoot>
  );
}
