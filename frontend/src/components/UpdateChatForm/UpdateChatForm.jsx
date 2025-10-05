import { useQueryClient } from '@tanstack/react-query';
import updateChat from '../../services/chats/updateChat';
import Button from '../Button';

export default function UpdateChatForm({ onClose, chatData }) {
  const queryClient = useQueryClient();

  const {
    contact: { firstName, lastName },
    _id,
  } = chatData;
  console.log(firstName, lastName);
  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());

    await updateChat(_id, formValues);
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
          defaultValue={firstName}
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
          defaultValue={lastName}
          type="text"
          name="lastName"
          placeholder="Enter last name"
          minLength={1}
          required
        />

        <Button clsName="button--contained">Update Chat</Button>
      </form>
    </>
  );
}
