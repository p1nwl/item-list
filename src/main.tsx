import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { LayoutControlsProvider } from "./contexts/LayoutControlsProvider.tsx";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LayoutControlsProvider>
          <App />
        </LayoutControlsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
