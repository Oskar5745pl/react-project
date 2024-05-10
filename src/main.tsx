import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./components/UserContext.js";
import { StateProvider } from "./components/CheckoutContext.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <StateProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </StateProvider>
    </BrowserRouter>
  </React.StrictMode>
);
