import getUser from '../services/auth/getUser';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export default function useUser(setUser) {
  const queryKey = ['user'];

  const { data: user, isLoading } = useQuery({
    queryKey,
    queryFn: () => getUser(),
    staleTime: 0,
    retry: false,
  });

  useEffect(() => {
    setUser(user);
  }, [user]);

  return { isLoading };
}
