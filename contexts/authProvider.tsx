import { createContext, useContext, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Session, User } from '@supabase/supabase-js';

import { supabase } from '~/utils/supabase';
import { AuthContextType } from '~/types/auth';

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isAuth: false,
});

export default function AuthProvider({ children }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <AuthContext.Provider value={{ session, user: session?.user, isAuth: !!session?.user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};