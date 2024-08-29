import React from "react";
import { fileData, folderData } from "../types";
import { useDeleteFile } from "../api/FileApi";
import { motion } from "framer-motion";
import { useDeleteFolder } from "../api/FolderApi";
import { UseToastContext } from "../context/ToastContext";

type ModalProps = {
  deleteModal: boolean;
  type: "file" | "folder";
  item: fileData | folderData;
  setDeleteModal: (open: boolean) => void;
};

const DeleteModal: React.FC<ModalProps> = ({
  deleteModal,
  setDeleteModal,
  type,
  item,
}) => {
  const { deleteFileMutation } = useDeleteFile();
  const { deleteFolderMutation } = useDeleteFolder();
  const { setToast } = UseToastContext();

  const handleDelete = (id: number | undefined) => {
    setToast({ type: "ERROR", message: "Successfuly deleted" });
    if (type === "file") {
      deleteFileMutation(id);
    } else {
      deleteFolderMutation(id);
    }
  };

  return (
    deleteModal && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed flex items-center justify-center top-0 right-0 left-0 bottom-0  bg-gray-500/70 z-50"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-lg flex flex-col p-5"
        >
          <div className=" flex items-center justify-between">
            <h2 className="text-xl font-bold text-red-500">
              {type === "file" ? "Delete File" : "Delete Folder"}
            </h2>
            <svg
              onClick={() => setDeleteModal(false)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7 hover:cursor-pointer rounded-full hover:bg-gray-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>

          <p className="my-5">
            Are you sure you want to delete this{" "}
            {type === "file" ? "File" : "Folder"}?
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDeleteModal(false)}
              className="border-2 border-gray-200 hover:bg-gray-200 hover:text-gray-600 transition-all rounded-lg w-full p-1"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              type="submit"
              className="border-2 flex px-5  items-center bg-red-500 text-white transition-all border-red-500 hover:bg-white group hover:text-red-500 rounded-lg w-full p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 text-white group-hover:text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
              <p className="w-full break line-clamp-1">
                {type === "file" ? "Delete File" : "Delete Folder"}
              </p>
            </button>
          </div>
        </motion.div>
      </motion.div>
    )
  );
};

export default DeleteModal;
