import { axiosInstance } from "../../config/axiosInstance";
import { apiPaths } from "../../config/apiPaths";

export default async function getChats(search) {
    const url = apiPaths.chats.getChats(search)
    const response = await axiosInstance.get(url)

    return response?.data
}