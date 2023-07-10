// contexts/AuthContext.tsx
import { createContext, useState, useEffect, ReactNode } from 'react';
import { getUserInfo } from '../lib/api';

interface AuthContextType {
  userId: number | null;
  username: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  userId: null,
  username: null,
  isAuthenticated: false,
  loading: false,
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [userId, setUserId] = useState<number | null>(null); 
  const [username, setUsername] = useState<string | null>(null); 
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : '';
      if (token) {
        try {
          const user = await getUserInfo();
          setUsername(user.username);
          setUserId(user.id); 
        } catch (error) {
          console.error(error);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const isAuthenticated = !!username;

  return (
    <AuthContext.Provider value={{ userId, username, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
}


export default AuthContext;
