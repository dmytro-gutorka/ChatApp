import { Navigate, Outlet } from 'react-router';
import useAuthContext from "../../hooks/useAuthContext";

export default function PrivateRoute() {
  const { user } = useAuthContext();
  return user ? <Outlet /> : <Navigate to="/registration" replace />;
}
