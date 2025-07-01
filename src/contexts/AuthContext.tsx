/* eslint-disable react-refresh/only-export-components */

import { createContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "../lib/supabaseClient";
import type { User, Session } from "@supabase/supabase-js";

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
  signInWithPassword: (e: string, p: string) => Promise<void>;
  signUpWithPassword: (e: string, p: string, name: string) => Promise<void>;
  signInWithProvider: (p: Provider) => void;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      const u = data.session?.user ?? null;
      setUser(u);
      setLoading(false);
      if (u) {
        const { data: prof } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", u.id)
          .single();
        setProfile(prof as Profile);
      }
    });
  }, []);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session: Session | null) => {
        const u = session?.user ?? null;
        setUser(u);

        if (u) {
          const dm =
            u.user_metadata.display_name ||
            u.user_metadata.full_name ||
            u.user_metadata.user_name ||
            u.email;

          const { data: saved } = await supabase
            .from("profiles")
            .upsert({ id: u.id, display_name: dm })
            .select()
            .single();

          setProfile(saved as Profile);
        } else {
          setProfile(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

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

  const signInWithProvider = (provider: Provider) =>
    supabase.auth.signInWithOAuth({ provider }).catch(console.error);

  const signOut = async () => {
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
