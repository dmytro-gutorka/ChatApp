import Chat from '../models/Chat.js';

export async function chatsSeed(userId = null) {
  const count = await Chat.countDocuments({ createdBy: userId });

  if (count > 0) return;
  await Chat.insertMany([
    { contact: { firstName: 'Ada', lastName: 'Lovelace' }, createdBy: userId },
    { contact: { firstName: 'Alan', lastName: 'Turing' }, createdBy: userId },
    { contact: { firstName: 'Grace', lastName: 'Hopper' }, createdBy: userId },
  ]);
}
