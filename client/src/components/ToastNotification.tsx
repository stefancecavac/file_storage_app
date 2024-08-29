import { useEffect } from "react";
import { UseToastContext } from "../context/ToastContext";
import { AnimatePresence, motion } from "framer-motion";
import { ToastIcons } from "./IconTypes";

const ToastNotification = ({
  type,
  message,
}: {
  type: "SUCCESS" | "ERROR" | undefined;
  message: string | undefined;
}) => {
  const { toast, setToast } = UseToastContext();

  const Icon = ToastIcons[type!];

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setToast(undefined);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message, type, setToast]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 200, opacity: 0 }}
          className={`${
            type === "SUCCESS" ? "bg-green-300 " : "bg-red-400 "
          } fixed rounded-lg bottom-3 right-3 text-gray-700 h-[60px] p-5 pl-1 gap-2 items-center flex z-50`}
        >
          <Icon></Icon>
          <p>{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ToastNotification;
