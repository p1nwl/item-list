import { Routes, Route } from "react-router-dom";
import ItemList from "./pages/ItemList";
import ItemPage from "./pages/ItemPage"; // 👈 добавь это

function App() {
  return (
    <Routes>
      <Route path="/" element={<ItemList />} />
      <Route path="/item/:id" element={<ItemPage />} /> {/* 👈 вот здесь */}
    </Routes>
  );
}

export default App;
