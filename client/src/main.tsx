import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { FilterContextProvider } from "./context/FIlterContext.tsx";
import { ToastContextProvider } from "./context/ToastContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <FilterContextProvider>
          <ToastContextProvider>
            <App />
          </ToastContextProvider>
        </FilterContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
