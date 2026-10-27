import { supabase } from "@/api/supabase";
import type { Session, User } from "@supabase/supabase-js";

export const signIn = async (
  email: string,
  password: string,
): Promise<{
  session: Session | null;
  user: User | null;
}> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return { session: data.session, user: data.user }; // data.user only available in signUp? for signIn? returns user maybe
};

export const signUp = async (
  email: string,
  password: string,
): Promise<{
  user: User | null;
  session: Session | null;
}> => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return { user: data.user, session: data.session };
};

export const signOut = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
};

export const getActiveSession = async (): Promise<Session | null> => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return session;
};

export const subscribeToAuthChanges = (
  callback: Parameters<typeof supabase.auth.onAuthStateChange>[0],
) => supabase.auth.onAuthStateChange(callback);
