import React, { useContext, useState } from "react";
import ToastNotification from "../components/ToastNotification";

type ToastMessage = {
  type?: "SUCCESS" | "ERROR";
  message?: string;
};

type ContextProp = {
  toast: ToastMessage | undefined;
  setToast: (toastMessage: ToastMessage | undefined) => void;
};

export const ToastContext = React.createContext<ContextProp | null>(null);

export const ToastContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

  return (
    <ToastContext.Provider value={{ toast, setToast }}>
      <ToastNotification message={toast?.message} type={toast?.type} />
      {children}
    </ToastContext.Provider>
  );
};
export const UseToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error(
      "useToastContext must be used within a ToastContextProvider"
    );
  }
  return context;
};
