import axios from "axios";
import {SERVER_URL} from "./constants";

const apiVersionPrefix = '/api/v1';

export const axiosInstance  = axios.create({
    baseURL: `${SERVER_URL}${apiVersionPrefix}`,
    withCredentials: true,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});