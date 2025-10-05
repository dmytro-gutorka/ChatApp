import './messages-list.css';

import useMessages from '../../hooks/useMessages';
import useMessagesScroll from '../../hooks/useMessagesScroll';
import React from 'react';

export default function MessagesList() {
  const { data: messages } = useMessages();
  const { onScroll, containerRef } = useMessagesScroll(messages);

  return (
    <div className="messages_container" ref={containerRef} onScroll={onScroll}>
      {messages?.map(message => {
        const sentAt = new Date(message.createdAt).toLocaleString();

        return (
          <React.Fragment key={message._id}>
            {message.isSystem && (
              <div className="message-receiver_container">
                <div className="message-receiver_text">{message.text}</div>
                <div className="message-receiver_time-date">{sentAt}</div>
              </div>
            )}
            {!message.isSystem && (
              <div className="message-sender_container">
                <div className="message-sender_text">{message.text}</div>
                <div className="message-receiver_time-date">{sentAt}</div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
