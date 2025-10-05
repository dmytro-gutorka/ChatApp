import {Navigate, Outlet} from "react-router";
import {useAuth} from "../AuthGuard/AuthGuard";

export default function PublicOnlyRoute() {
    const user = useAuth()

    return user ? <Navigate to="/" /> : <Outlet/>
}