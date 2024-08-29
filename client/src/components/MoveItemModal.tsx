import React, { useState } from "react";
import { motion } from "framer-motion";
import { fileData, folderData } from "../types";
import { useGetAllFolders, useMoveFolder } from "../api/FolderApi";
import LoaderComponent from "./LoaderComponent";
import { useMoveFile } from "../api/FileApi";

type ModalProps = {
  item: fileData | folderData;
  type: "file" | "folder";
  moveItem: boolean;
  setMoveItem: (value: boolean) => void;
};

const MoveItemModal: React.FC<ModalProps> = ({
  moveItem,
  setMoveItem,
  type,
  item,
}) => {
  const { folders, foldersLoading } = useGetAllFolders("");

  const [selectedFolder, setSelectedFolder] = useState<number | null>(null);

  const handleSelect = (folderId: number) => {
    setSelectedFolder(folderId);
  };

  const { moveFileMutation } = useMoveFile();
  const { moveFolderMutation } = useMoveFolder();

  const handleMoveFile = (
    e: React.MouseEvent<HTMLButtonElement>,
    folderId: number | null,
    itemId: number | undefined
  ) => {
    e.preventDefault();

    if (type === "file" && folderId !== null) {
      moveFileMutation({ fileId: itemId, folderId });
    } else if (type === "folder" && folderId !== null) {
      moveFolderMutation({ folderId: itemId, parentFolderId: folderId });
    }
  };

  return (
    moveItem && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed flex items-center justify-center top-0 right-0 left-0 bottom-0  bg-gray-500/70 z-50"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-lg flex flex-col p-5 w-2/6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-purple-500">
              {type === "file" ? "Move File" : "Move Folder"}
            </h2>
            <svg
              onClick={() => setMoveItem(false)}
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

          <div className="border-2 border-gray-300 rounded-lg p-5 my-5">
            {foldersLoading ? (
              <LoaderComponent />
            ) : (
              folders?.map(
                (folder) =>
                  folder.id !== item.id && (
                    <p
                      onClick={() => handleSelect(folder.id!)}
                      className={`text-gray-500 ${
                        selectedFolder === folder.id
                          ? "bg-purple-500"
                          : "bg-white"
                      }`}
                      key={folder.id}
                    >
                      - {folder.name}
                    </p>
                  )
              )
            )}
          </div>

          {selectedFolder !== null && (
            <button
              onClick={(e) => handleMoveFile(e, selectedFolder, item.id)}
              className="bg-purple-500 border-2 border-purple-500 text-white rounded-lg"
            >
              Move
            </button>
          )}
        </motion.div>
      </motion.div>
    )
  );
};

export default MoveItemModal;
