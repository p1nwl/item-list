import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useAuth, useDisplayName } from "../contexts/authHooks";
import AuthModal from "./AuthModal";

const Layout: React.FC = () => {
  const { user, signOut } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const name = useDisplayName();

  return (
    <div className="min-h-screen max-w-screen flex flex-col">
      <header className="p-4 flex justify-between flex-row-reverse bg-transparent">
        {user ? (
          <div className="flex items-center gap-4">
            {user && <span className="text-sm">Привет, {name}</span>}
            <button onClick={signOut} className="px-3 py-1 border rounded">
              Выйти
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowAuth(true)}
            className="px-3 py-1 border rounded"
          >
            Войти
          </button>
        )}
      </header>

      <main className="flex-1 p-1">
        <Outlet />
      </main>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  );
};

export default Layout;
