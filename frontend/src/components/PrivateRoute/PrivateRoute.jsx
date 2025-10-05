import { Navigate, Outlet } from 'react-router';
import { useAuthContext } from '../AuthGuard/AuthGuard';

export default function PrivateRoute() {
  const { user } = useAuthContext();
  return user ? <Outlet /> : <Navigate to="/registration" replace />;
}
