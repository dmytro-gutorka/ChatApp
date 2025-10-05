import './chatForm.css';

import Button from '../Button';
import createChat from '../../services/chats/createChat';
import { useQueryClient } from '@tanstack/react-query';

export default function CreateChatForm({ onClose }) {
  const queryClient = useQueryClient();

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());

    await createChat(formValues);

    await queryClient.invalidateQueries({ queryKey: ['chats'] });
    onClose();
  }

  return (
    <>
      <form className="chat-form" onSubmit={handleSubmit} id="chat-form">
        <label className="chat-form_label" htmlFor="firstName">
          First name:
        </label>
        <input
          className="chat-form_input"
          type="text"
          name="firstName"
          placeholder="Enter first name"
          minLength={1}
          required
        />

        <label className="chat-form_label" htmlFor="lastName">
          Last name:
        </label>
        <input
          className="chat-form_input"
          type="text"
          name="lastName"
          placeholder="Enter last name"
          minLength={1}
          required
        />

        <Button clsName="button--contained">Create Chat</Button>
      </form>
    </>
  );
}
