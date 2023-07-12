// contexts/AuthContext.tsx
import { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import { getUserInfo } from '../lib/api';

interface AuthContextType {
  userId: number | null;
  username: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  setAuthToken: Dispatch<SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType>({
  userId: null,
  username: null,
  isAuthenticated: false,
  loading: false,
  setAuthToken: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [userId, setUserId] = useState<number | null>(null); 
  const [username, setUsername] = useState<string | null>(null); 
  const [loading, setLoading] = useState<boolean>(true);
  const [authToken, setAuthToken] = useState<string | null>(typeof window !== 'undefined' ? localStorage.getItem('authToken') : null);

  useEffect(() => {
    const fetchUser = async () => {
      if (authToken) {
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
  }, [authToken]);

  const isAuthenticated = !!username;

  return (
    <AuthContext.Provider value={{ userId, username, isAuthenticated, loading, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
}


export default AuthContext;