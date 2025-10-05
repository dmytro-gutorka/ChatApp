import { createContext, useState } from 'react';
import useUser from '../../hooks/useUser';

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
});


export default function AuthGuard({ children }) {
  const [user, setUser] = useState(null);

  const { isLoading } = useUser(setUser);

  if (isLoading) return null;

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>{children}</AuthContext.Provider>
  );
}
