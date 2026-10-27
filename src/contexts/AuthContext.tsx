import {
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { AuthContextValue, AuthCredentials } from "@/types";
import {
  getActiveSession,
  signIn as signInWithSupabase,
  signOut as signOutFromSupabase,
  signUp as signUpWithSupabase,
  subscribeToAuthChanges,
} from "@/services/supabaseService";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren): JSX.Element {
  const [user, setUser] = useState<AuthContextValue["user"]>(null);
  const [session, setSession] = useState<AuthContextValue["session"]>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const initialiseSession = async () => {
      try {
        const activeSession = await getActiveSession();
        if (!isMounted) {
          return;
        }
        setSession(activeSession);
        setUser(activeSession?.user ?? null);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initialiseSession();

    const { data: subscription } = subscribeToAuthChanges((_event, data) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
    });

    return () => {
      isMounted = false;
      subscription?.subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async ({ email, password }: AuthCredentials) => {
    const { session: activeSession } = await signInWithSupabase(
      email,
      password,
    );
    setSession(activeSession);
    setUser(activeSession?.user ?? null);
  }, []);

  const signUp = useCallback(async ({ email, password }: AuthCredentials) => {
    const { session: activeSession } = await signUpWithSupabase(
      email,
      password,
    );
    if (activeSession) {
      setSession(activeSession);
      setUser(activeSession.user);
    }
    return activeSession;
  }, []);

  const signOut = useCallback<AuthContextValue["signOut"]>(async () => {
    await signOutFromSupabase();
    setSession(null);
    setUser(null);
  }, []);

  const refreshSession = useCallback<
    AuthContextValue["refreshSession"]
  >(async () => {
    const activeSession = await getActiveSession();
    setSession(activeSession);
    setUser(activeSession?.user ?? null);
  }, []);

  const status = loading
    ? "loading"
    : user
      ? "authenticated"
      : "unauthenticated";

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      loading,
      status,
      signIn,
      signUp,
      signOut,
      refreshSession,
    }),
    [loading, refreshSession, session, signIn, signOut, signUp, status, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
