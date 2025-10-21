import { useState, useCallback } from "react";
import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastProvider,
  ToastViewport,
} from "@/components/ui/toast";

// Hook for showing toast messages
export const useToast = () => {
  const [toast, setToast] = useState<{ title: string; description?: string } | null>(null);

  // Trigger toast
  const showToast = useCallback((title: string, description?: string) => {
    setToast({ title, description });
    setTimeout(() => setToast(null), 3000); // auto-hide after 3s
  }, []);

  // Render toast when active
  const ToastDisplay = toast ? (
    <Toast>
      <ToastTitle>{toast.title}</ToastTitle>
      {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
    </Toast>
  ) : null;

  return { showToast, ToastDisplay };
};

// Optional re-export if you want easy access
export { ToastProvider, ToastViewport };
