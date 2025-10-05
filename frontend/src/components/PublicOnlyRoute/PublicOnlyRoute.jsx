import {Navigate, Outlet} from "react-router";
import { useAuthContext} from "../AuthGuard/AuthGuard";

export default function PublicOnlyRoute() {
    const { user } = useAuthContext()
    return user ? <Navigate to="/" replace /> : <Outlet/>
}