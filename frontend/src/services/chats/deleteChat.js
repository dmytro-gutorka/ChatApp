import { apiPaths } from '../../config/apiPaths';
import { axiosInstance } from '../../config/axiosInstance';

export default async function deleteChat(id) {
  const url = apiPaths.chats.deleteChat(id);
  await axiosInstance.delete(url);
}
