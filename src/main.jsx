import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { ProfileProvider } from "./context/user";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProfileProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ProfileProvider>
  </StrictMode>
);
