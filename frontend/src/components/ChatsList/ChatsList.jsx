import './chats-list.css';

import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import ChatPreview from '../ChatPreview';
import useChats from '../../hooks/useChats';
import useWSNewMessage from '../../hooks/useWSNewMessage';

export default function ChatsList({ search }) {
  const debouncedSearch = useDebouncedValue(search, 300);
  const { data } = useChats(debouncedSearch);
  const { setActiveChatId } = useWSNewMessage(data, debouncedSearch);

  return (
    <ul className="chats-list">
      {data?.chats?.map(chat => (
        <ChatPreview key={chat._id} onActiveChatId={setActiveChatId} data={chat} />
      ))}
    </ul>
  );
}
