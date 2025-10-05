import {Navigate, Outlet} from "react-router";
import {useAuth} from "../AuthGuard/AuthGuard";

export default function PrivateRoute() {
    const user = useAuth()

    return user ? <Outlet/> : <Navigate to="/registration" replace />}