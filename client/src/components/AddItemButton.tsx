import { useState } from "react";
import NewItemMenu from "./NewItemMenu";

const AddItemButton = () => {
  const [menu, setMenu] = useState<boolean>(false);
  return (
    <div
      id="modalOpenButton"
      className="relative flex flex-col text-sm   justify-center"
    >
      <button
        onClick={() => setMenu((prev) => !prev)}
        className="flex items-center mx-7  bg-white hover:scale-105 gap-5 justify-center p-3 font-bold  shadow-md text-purple-500 hover:bg-purple-500 hover:text-white transition-all  rounded-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>

        <p>Add</p>
      </button>

      <NewItemMenu setMenu={setMenu} menu={menu}></NewItemMenu>
    </div>
  );
};

export default AddItemButton;
