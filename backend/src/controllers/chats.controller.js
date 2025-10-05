import { chatsService } from '../services/chats.service.js';

export async function getChats(req, res) {
  const search = (req.query?.search || '').trim();
  const createdBy = req.userId;

  const chats = await chatsService.getChats(search, createdBy);

  res.status(200).json({ chats });
}

export async function createChat(req, res) {
  const { firstName, lastName } = req.body;
  const createdBy = req.userId;

  if (!firstName || !lastName)
    return res.status(401).json({ message: 'Both first name and last name are required' });

  const chat = await chatsService.createChat(firstName, lastName, createdBy);

  res.status(201).json({ chat });
}

export async function updateChat(req, res) {
  const { id } = req.params;
  const { firstName, lastName } = req.body || {};

  if (!firstName || !lastName) return res.status(400).json({ error: 'Nothing to update' });

  const chat = await chatsService.updateChat(firstName, lastName, id);
  if (!chat) return res.status(404).json({ error: 'Chat not found' });

  res.status(200).json({ chat });
}

export async function deleteChat(req, res) {
  const { id: chatId } = req.params;
  const userId = req.userId;

  const chat = await chatsService.deleteChat(chatId, userId);
  if (!chat) return res.status(404).json({ error: 'Chat not found' });

  res.status(204).end();
}
