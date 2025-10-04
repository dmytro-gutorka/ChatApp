import {apiPaths} from "../../config/apiPaths";
import {axiosInstance} from "../../config/axiosInstance";

export default async function getMessages(chatId) {
    const url = apiPaths.messages.getMessages(chatId)
    const response =  await axiosInstance.get(url)

    return response?.data
}