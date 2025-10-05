import './sendMessageForm.css';

import Button from '../Button';
import SendMessageOutlinedIcon from '../../assets/svg-icons/SendMessageOutlinedIcon';
import createMessage from '../../services/messages/createMessage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router';

export default function SendMessageForm() {
  const queryClient = useQueryClient();
  const { chatId } = useParams();

  const { mutate: sendMessage } = useMutation({
    mutationFn: text => createMessage(chatId, text),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['chats'] });
      await queryClient.invalidateQueries({ queryKey: ['messages', chatId] });
    },
  });

  async function handleMessage(e) {
    e.preventDefault();

    const text = e.target.message.value;
    e.target.message.value = '';

    sendMessage(text);
  }

  return (
    <form className="send-message_form" onSubmit={handleMessage}>
      <input
        className="send-message_input"
        type="text"
        name="message"
        placeholder="Type a message..."
      />
      <Button clsName="send-message_button" icon={<SendMessageOutlinedIcon />} />
    </form>
  );
}
