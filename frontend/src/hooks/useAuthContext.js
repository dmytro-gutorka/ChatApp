import { useContext } from 'react';
import { AuthContext } from '../components/AuthGuard/AuthGuard';

export default function useAuthContext() {
  return useContext(AuthContext);
}
