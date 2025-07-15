import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ItemList from "./pages/ItemList";
import ErrorBoundary from "./components/ErrorBoundary";
import ItemPageWithLayoutControls from "./pages/ItemPageWithLayoutControls";
import AuthCallback from "./pages/AuthCallback";

export default function App() {
  return (
    <ErrorBoundary
      fallback={<p style={{ padding: 24 }}>Ошибка загрузки данных</p>}
    >
      <Routes>
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<ItemList />} />
          <Route path="item/:id" element={<ItemPageWithLayoutControls />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}
