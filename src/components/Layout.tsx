import { Outlet, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { useDisplayName } from "../contexts/authHooks";
import AuthModal from "./AuthModal";
import { useLayoutControls } from "../contexts/useLayoutControls";
import { AuthContext } from "../contexts/AuthContext";

const Layout = () => {
  const { user, profile, signOut, loading } = useContext(AuthContext)!;
  const [showAuth, setShowAuth] = useState(false);
  const name = useDisplayName();
  const navigate = useNavigate();
  const { controls } = useLayoutControls();

  if (loading) {
    return <div className="p-8 text-center">Загрузка...</div>;
  }

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

              {profile?.is_admin && (
                <button
                  onClick={() => navigate("/admin/upload")}
                  className="py-1 border rounded text-sm bg-blue-100 px-2 hover:bg-blue-200 transition"
                >
                  Загрузить предмет
                </button>
              )}

              <button
                type="button"
                onClick={async () => {
                  console.log("Logout button clicked");
                  try {
                    await signOut();
                    navigate("/");
                  } catch (e) {
                    console.error(e);
                  }
                }}
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
