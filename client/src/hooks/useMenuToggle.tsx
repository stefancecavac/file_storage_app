import { useState } from "react";

export const useMenuToggle = () => {
  const [menuToggle, setMenuToggle] = useState<number | null>();

  const handleMenuToggle = (fileId: number | undefined) => {
    setMenuToggle((prev) => (prev === fileId ? null : fileId));
  };

  return { menuToggle, handleMenuToggle };
};
