import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth, useDisplayName } from "../contexts/authHooks";
import AuthModal from "./AuthModal";
import { useLayoutControls } from "../contexts/useLayoutControls";

const Layout = () => {
  const { user, signOut } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const name = useDisplayName();
  const navigate = useNavigate();
  const { controls } = useLayoutControls();

  return (
    <div className="min-h-screen max-w-screen flex flex-col">
      <header className="p-4 pb-0 grid grid-cols-[auto_1fr_auto] items-start">
        <div className="flex gap-2 min-w-[140px]">
          {controls.showNavigationButtons ? (
            <>
              <button
                onClick={controls.onBack}
                className="text-blue-600 hover:underline text-sm"
              >
                ← Назад
              </button>
              <button
                onClick={() => navigate("/")}
                className="text-blue-600 hover:underline text-sm"
              >
                ⌂ На главную
              </button>
            </>
          ) : (
            <>
              <span className="invisible text-sm">← Назад</span>
              <span className="invisible text-sm">⌂ На главную</span>
            </>
          )}
        </div>

        <div></div>

        <div className="flex items-center gap-4 justify-end">
          {user ? (
            <>
              <span className="text-sm">Привет, {name}</span>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await signOut();
                    navigate("/");
                  } catch (e) {
                    console.error(e);
                  }
                }}
                className="py-1 border rounded"
              >
                Выйти
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowAuth(true)}
              className="py-1 border rounded"
            >
              Войти
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 p-1">
        <Outlet />
      </main>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  );
};

export default Layout;
