import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside <AuthProvider>");
  return ctx;
};

export const useDisplayName = (): string | null => {
  const { user, profile } = useAuth();
  if (!user) return null;

  return (
    profile?.display_name ||
    user.user_metadata.full_name ||
    user.user_metadata.user_name ||
    user.user_metadata.display_name ||
    user.email
  );
};
