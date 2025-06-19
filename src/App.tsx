import { Routes, Route } from "react-router-dom";
import ItemList from "./pages/ItemList";
import ItemPage from "./pages/ItemPage";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary
      fallback={<p style={{ padding: 24 }}>Ошибка загрузки данных</p>}
    >
      <Routes>
        <Route path="/" element={<ItemList />} />
        <Route path="/item/:id" element={<ItemPage />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
