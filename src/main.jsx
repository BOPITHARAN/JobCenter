import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App";
import "./index.css";
import "./i18n";

// 🔥 Google Client ID (safe + clear)
const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ||
  "602806926569-ohmmn2fu310npu17tbaeuj5fa5ej6851.apps.googleusercontent.com";

if (!import.meta.env.VITE_GOOGLE_CLIENT_ID) {
  console.warn("⚠️ Using fallback Google Client ID (check .env file)");
}

console.log("🔥 GOOGLE CLIENT ID LOADED:", GOOGLE_CLIENT_ID);

// 🚀 APP START
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);