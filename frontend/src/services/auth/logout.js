import {apiPaths} from "../../config/apiPaths";
import {axiosInstance} from "../../config/axiosInstance";

export default async function logout() {
    const url = apiPaths.auth.logout()
    await axiosInstance.post(url)
}