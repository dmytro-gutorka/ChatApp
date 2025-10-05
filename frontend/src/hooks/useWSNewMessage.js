import { useEffect, useState } from 'react';
import { socket } from '../config/sockets';
import { useQueryClient } from '@tanstack/react-query';
import useToastContext from './useToastContext';

export default function useWSNewMessage(data, debouncedSearch) {
  const [activeChatId, setActiveChatId] = useState(null);

  const queryClient = useQueryClient();
  const { success: toastSuccess } = useToastContext();

  useEffect(() => {
    async function onNewMsg(msg) {
      await queryClient.invalidateQueries({ queryKey: ['chats'] });
      await queryClient.invalidateQueries({ queryKey: ['messages', String(msg.chatId)] });

      const currentChat = data?.chats?.find(chat => chat._id === msg.chatId);

      if (msg.isSystem === true)
        toastSuccess(`New message in chat "${currentChat?.contact.firstName ?? msg.contact.firstName} 
                ${currentChat?.contact.lastName ?? msg.contact.lastName}"`);
    }

    socket.off('message:new').on('message:new', onNewMsg);
    return () => socket.off('message:new', onNewMsg);
  }, [queryClient, debouncedSearch, activeChatId]);

  return {
    setActiveChatId,
  };
}
