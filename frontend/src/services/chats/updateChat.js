import {apiPaths} from "../../config/apiPaths";
import {axiosInstance} from "../../config/axiosInstance";

export default async function updateChat(id, body) {
    const url = apiPaths.chats.updateChat(id)
    await axiosInstance.patch(url, body)
}
