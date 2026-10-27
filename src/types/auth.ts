import type { Session, User } from "@supabase/supabase-js";

export type AuthUser = User | null;

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthContextState {
  user: AuthUser;
  session: Session | null;
  loading: boolean;
  status: "loading" | "authenticated" | "unauthenticated";
}

export interface AuthActions {
  signIn(credentials: AuthCredentials): Promise<void>;
  signUp(credentials: AuthCredentials): Promise<Session | null>;
  signOut(): Promise<void>;
  refreshSession(): Promise<void>;
}

export type AuthContextValue = AuthContextState & AuthActions;
