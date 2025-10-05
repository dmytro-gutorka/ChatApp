import { apiPaths } from '../../config/apiPaths';
import { axiosInstance } from '../../config/axiosInstance';

export default async function createChat(data) {
  const url = apiPaths.chats.createChat();
  await axiosInstance.post(url, data);
}
