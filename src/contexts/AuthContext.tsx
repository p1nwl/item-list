/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
  useCallback,
} from "react";
import { supabase } from "../lib/supabaseClient";
import type { User, AuthChangeEvent, Session } from "@supabase/supabase-js";

type Provider = "google" | "github" | "discord";

interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  updated_at: string | null;
}

interface AuthContextValue {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signInWithPassword: (email: string, password: string) => Promise<void>;
  signUpWithPassword: (
    email: string,
    password: string,
    name: string
  ) => Promise<void>;
  signInWithProvider: (p: Provider) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (u: User) => {
    const { data: prof, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", u.id)
      .maybeSingle();

    if (error) console.error("fetchProfile error", error);
    setProfile(prof as Profile | null);
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      const u = data.session?.user ?? null;
      setUser(u);
      if (u) await fetchProfile(u);
      setLoading(false);
    })();
  }, [fetchProfile]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        console.log("[AuthEvent]", event);

        const u = session?.user ?? null;
        setUser(u);

        if (event !== "SIGNED_IN" && event !== "TOKEN_REFRESHED") {
          setProfile(null);
          return;
        }
        if (!u) return;

        const displayName =
          u.user_metadata.display_name ??
          u.user_metadata.full_name ??
          u.user_metadata.user_name ??
          u.email;

        const { data: saved, error } = await supabase
          .from("profiles")
          .upsert({ id: u.id, display_name: displayName })
          .select()
          .maybeSingle();

        if (error) console.error("profiles upsert/select error", error);
        setProfile(saved as Profile | null);
      }
    );

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  const signInWithPassword = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signUpWithPassword = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName } },
    });
    if (error) throw error;
  };

  const signInWithProvider = async (provider: Provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) throw error;
  };

  const signOut = async () => {
    console.log("Signing out…");
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signInWithPassword,
        signUpWithPassword,
        signInWithProvider,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
