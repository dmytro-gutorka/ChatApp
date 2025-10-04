import {apiPaths} from "../../config/apiPaths";
import {axiosInstance} from "../../config/axiosInstance";

export default async function createMessage(chatId, text) {
    const url = apiPaths.messages.createMessage(chatId)

    await axiosInstance.post(url, { text })
}