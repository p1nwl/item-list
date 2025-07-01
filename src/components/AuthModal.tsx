import { useState } from "react";
import { useAuth } from "../contexts/authHooks"; // ← изменён импорт
import { AuthError } from "@supabase/supabase-js";

interface Props {
  onClose: () => void;
}

export default function AuthModal({ onClose }: Props) {
  const { signInWithPassword, signUpWithPassword, signInWithProvider } =
    useAuth();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleEmailAuth = async () => {
    setError(null);
    try {
      if (mode === "login") {
        await signInWithPassword(email, password);
      } else {
        await signUpWithPassword(email, password, displayName || email);
      }
      onClose();
    } catch (err) {
      setError((err as AuthError).message ?? "Неизвестная ошибка");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-gray-400 rounded p-6 max-w-sm w-full relative">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-lg leading-none"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">
          {mode === "login" ? "Вход" : "Регистрация"}
        </h2>

        <div className="space-y-2">
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Отображаемое имя"
              className="w-full border p-2 rounded"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Пароль"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-600">{error}</p>}

          <button
            onClick={handleEmailAuth}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            {mode === "login" ? "Войти" : "Зарегистрироваться"}
          </button>

          <p className="text-sm text-center mt-2">
            {mode === "login" ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
            <button
              onClick={() =>
                setMode((m) => (m === "login" ? "signup" : "login"))
              }
              className="text-blue-600 underline"
            >
              {mode === "login" ? "Зарегистрируйтесь" : "Войдите"}
            </button>
          </p>
        </div>

        <hr className="my-4" />

        <div className="space-y-2">
          <button
            onClick={() => signInWithProvider("google")}
            className="w-full border py-2 rounded"
          >
            Войти через Google
          </button>
          <button
            onClick={() => signInWithProvider("discord")}
            className="w-full border py-2 rounded"
          >
            Войти через Discord
          </button>
        </div>
      </div>
    </div>
  );
}
