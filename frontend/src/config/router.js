import { createBrowserRouter } from "react-router";
import Layout from "../Layout";
import ChatOverlay from "../components/ChatOverlay";


export const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        children: [
            {
                path: "/chat/:chatId",
                Component:  ChatOverlay
            }
        ]
    },
]);