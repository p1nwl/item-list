import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ItemList from "./pages/ItemList";
import ItemPage from "./pages/ItemPage";
import ErrorBoundary from "./components/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary fallback={<p style={{ padding: 24 }}>Ошибка загрузки данных</p>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ItemList />} />
          <Route path="item/:id" element={<ItemPage />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}