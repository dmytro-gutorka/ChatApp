import './chat-preview.css';

import { useEffect } from 'react';
import { NavLink } from 'react-router';
import { socket } from '../../config/sockets';
import UpdateChatModal from '../UpdateChatModal';
import DeleteChatModal from '../DeleteChatModal';
import cutMessage from '../../utils/cutMessage';

export default function ChatPreview({ data, onActiveChatId }) {
  const fullName = data.contact.firstName + ' ' + data.contact.lastName;
  const shortenedMessaged = cutMessage(data?.lastMessageText);

  useEffect(() => {
    socket.emit('join', String(data._id));
  }, [data._id]);

  return (
    <li className="chat-preview">
      <div className="chat-preview_outer-container">
        <NavLink
          onClick={() => onActiveChatId(data._id)}
          className="chat-preview_link"
          to={`chat/${data._id}`}
        >
          <div className="chat-preview_container">
            <img
              className="chat-preview_user-icon"
              src="/./user-chat-icon.png"
              alt="user avatar"
              width="42px"
              height="38px"
            />
            <div className="chat-preview_user-info">
              <p className="chat-preview_user-name">{fullName}</p>
              <p className="chat-preview_last-message">
                {data.lastMessageText ? shortenedMessaged : 'no messages yet'}
              </p>
            </div>
          </div>
        </NavLink>
        <div className="chat-preview_buttons-container">
          <UpdateChatModal chatData={data} />
          <DeleteChatModal chatId={data._id} />
        </div>
      </div>
    </li>
  );
}
