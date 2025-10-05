import Chat from '../models/Chat.js';

export async function chatsSeed(userId = null) {
  const count = await Chat.countDocuments({ createdBy: userId });

  if (count > 0) return;
  await Chat.insertMany([
    { contact: { firstName: 'Ada', lastName: 'Lovelace' }, createdBy: userId, isSystem: true },
    { contact: { firstName: 'Alan', lastName: 'Turing' }, createdBy: userId, isSystem: true },
    { contact: { firstName: 'Grace', lastName: 'Hopper' }, createdBy: userId, isSystem: true },
  ]);
}
