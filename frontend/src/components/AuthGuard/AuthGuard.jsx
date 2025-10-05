import { createContext, useContext, useState } from 'react';
import useUser from '../../hooks/useUser';

const AuthContext = createContext({
  user: null,
  setUser: () => {},
});

export function useAuthContext() {
  return useContext(AuthContext);
}

export default function AuthGuard({ children }) {
  const [user, setUser] = useState(null);

  const { isLoading } = useUser(setUser);

  if (isLoading) return null;

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>{children}</AuthContext.Provider>
  );
}
