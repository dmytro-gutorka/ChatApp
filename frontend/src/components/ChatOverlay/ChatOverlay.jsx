import './chatOverlay.css';

import ChatOverlayHeader from '../ChatOverlayHeader';
import MessagesList from '../MessagesList';
import SendMessageForm from '../SendMessageForm';

export default function ChatOverlay() {
  return (
    <div className="chat-overlay">
      <ChatOverlayHeader />
      <MessagesList />
      <SendMessageForm />
    </div>
  );
}
