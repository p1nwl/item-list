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
  is_admin: boolean;
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

  const fetchOrUpsertProfile = useCallback(async (u: User) => {
    console.log("→ fetchOrUpsertProfile", u.id);

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

    console.log("⚠️ upsert result", { saved, error });

    if (error) {
      console.error("profiles upsert/select error", error);
    } else {
      console.log("✅ Loaded profile:", saved);
      setProfile(saved as Profile | null);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      const { data, error } = await supabase.auth.getSession();
      console.log("[getSession]", data, error);
      const u = data.session?.user ?? null;
      console.log("[init getSession]", u);
      setUser(u);
      if (u) await fetchOrUpsertProfile(u);
      setLoading(false);
    };
    init();
  }, [fetchOrUpsertProfile]);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        console.log("[onAuthStateChange]", event, session);

        const u = session?.user ?? null;
        setUser(u);

        if (
          event === "SIGNED_IN" ||
          event === "INITIAL_SESSION" ||
          event === "TOKEN_REFRESHED"
        ) {
          if (u) {
            await fetchOrUpsertProfile(u);
          }
        } else if (event === "SIGNED_OUT") {
          setProfile(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [fetchOrUpsertProfile]);

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
