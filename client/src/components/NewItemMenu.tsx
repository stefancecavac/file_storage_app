import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import UploadFile from "./UploadFIle";
import CreateFolder from "./CreateFolder";

type MenuProp = {
  menu: boolean;
  setMenu: (value: boolean) => void;
};

const NewItemMenu: React.FC<MenuProp> = ({ menu, setMenu }) => {
  const [uploadModal, setUploadModal] = useState<boolean>(false);
  const [folderModal, setFolderModal] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const modalButton = document.getElementById("modalOpenButton");
      if (
        !modalButton?.contains(e.target as Node) &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        setMenu(false);
      }
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler, true);
    };
  }, []);
  return (
    <AnimatePresence>
      {menu && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50, transition: { duration: 0.1 } }}
          className=" px-7 py-2 flex flex-col gap-2  text-xs   "
          ref={modalRef}
        >
          <button
            onClick={() => setFolderModal((prev) => !prev)}
            className="flex items-center gap-2 transition-all hover:shadow-md border bg-white border-gray-300 p-2   rounded-lg text-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
              />
            </svg>
            <p> New Folder</p>
          </button>
          <button
            onClick={() => setUploadModal((prev) => !prev)}
            className="flex items-center gap-2 border transition-all hover:shadow-md  bg-white border-gray-300 p-2  rounded-lg text-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>

            <p> New File</p>
          </button>
          <CreateFolder
            folderModal={folderModal}
            setFolderModal={setFolderModal}
          ></CreateFolder>
          <UploadFile
            uploadModal={uploadModal}
            setUploadModal={setUploadModal}
          ></UploadFile>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewItemMenu;
