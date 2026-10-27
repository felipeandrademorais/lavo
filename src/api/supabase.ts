import { createClient } from "@supabase/supabase-js";

const getSupabaseUrl = (): string => {
  const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
  if (!url) {
    throw new Error("Missing EXPO_PUBLIC_SUPABASE_URL environment variable.");
  }
  return url;
};

const getSupabaseAnonKey = (): string => {
  const key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
  if (!key) {
    throw new Error(
      "Missing EXPO_PUBLIC_SUPABASE_ANON_KEY environment variable.",
    );
  }
  return key;
};

export const supabase = createClient(getSupabaseUrl(), getSupabaseAnonKey());
