
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ToastProvider, ToastViewport } from "@/components/ui/toast"; // 👈 import toast provider

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastProvider>
      <App />
      <ToastViewport /> {/* 👈 where toasts appear */}
    </ToastProvider>
  </React.StrictMode>
);
