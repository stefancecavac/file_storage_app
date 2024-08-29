import React, { useState } from "react";
import { fileData, folderData } from "../../types";
import { motion } from "framer-motion";
import ReactDOM from "react-dom";
import {
  fileTypeIcons,
  MovieItemIcon,
  OpenFolderIcon,
  RecycleBinIcon,
} from "../IconTypes";
import DeleteModal from "../DeleteModal";
import MoveItemModal from "../MoveItemModal";
import { Link } from "react-router-dom";

type menuProps = {
  menuOpen: boolean;
  type: "file" | "folder";
  item: fileData | folderData;
  onMenuToggle: (id: number | undefined) => void;
};

const CardMenu: React.FC<menuProps> = ({
  menuOpen,
  onMenuToggle,
  type,
  item,
}) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [moveItem, setMoveItem] = useState(false);

  const portalElement = document.getElementById("portal");
  const Icon =
    type === "file"
      ? fileTypeIcons[(item as fileData).mimeType] || fileTypeIcons["default"]
      : fileTypeIcons["folder"];

  return (
    menuOpen &&
    portalElement &&
    ReactDOM.createPortal(
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className=" bg-slate-50  p-3 mb-10 flex w-[20rem] h-full   flex-col border-b-2 border-slate-200   "
      >
        <div className="flex justify-between text-gray-500 my-2">
          <p className=" text-gray-400">Item Detail</p>
          <svg
            onClick={() => onMenuToggle(item.id)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-7 hover:cursor-pointer text-gray-300  rounded-full hover:bg-gray-200"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="flex items-center justify-center my-5">
          <div className="size-28">
            <Icon></Icon>
          </div>
        </div>

        <p className="text-lg font-semibold  text-gray-500 my-4">{item.name}</p>

        <div className="text-gray-500 text-sm">
          <p className="text-purple-500 font-semibold">Info:</p>
          <hr className="my-1"></hr>
          <div className="flex flex-col  gap-2 mt-2">
            <div className="flex items-center  justify-between">
              <p>Size:</p>
              <p>{Math.ceil(item?.size / 1024)} Kb</p>
            </div>

            <div className="flex items-center  justify-between">
              <p>Owner:</p>
              <p>{item?.user?.email}</p>
            </div>

            <div className="flex items-center  justify-between">
              <p>Shared With:</p>
              <p>{item?.user?.email}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center mt-auto justify-between mx-2 mb-5 ">
          {type === "folder" && (
            <Link
              className="flex flex-col gap-2 text-purple-500 items-center p-1"
              to={`/folders/${item.id}/${item.name}`}
            >
              <OpenFolderIcon
                size="size-6"
                collor="text-purple-500"
              ></OpenFolderIcon>
              <p className="text-xs">Open Folder</p>
            </Link>
          )}

          <button
            onClick={() => setMoveItem(true)}
            className="flex flex-col items-center    gap-2 text-purple-500    p-1  "
          >
            <MovieItemIcon
              size="size-6"
              collor="fill-purple-500"
            ></MovieItemIcon>
            <p className="text-xs">Move Item</p>
          </button>

          <button
            className="flex flex-col items-center  text-red-500   gap-2   p-1  "
            onClick={() => setDeleteModal(true)}
          >
            <RecycleBinIcon
              collor="text-red-500"
              size="size-6"
            ></RecycleBinIcon>
            <p className="text-xs">Delete Item</p>
          </button>
        </div>
        {type === "file" ? (
          <DeleteModal
            type="file"
            item={item}
            deleteModal={deleteModal}
            setDeleteModal={setDeleteModal}
          ></DeleteModal>
        ) : (
          <DeleteModal
            type="folder"
            item={item}
            deleteModal={deleteModal}
            setDeleteModal={setDeleteModal}
          ></DeleteModal>
        )}

        {type === "file" ? (
          <MoveItemModal
            type="file"
            item={item}
            moveItem={moveItem}
            setMoveItem={setMoveItem}
          ></MoveItemModal>
        ) : (
          <MoveItemModal
            type="folder"
            item={item}
            moveItem={moveItem}
            setMoveItem={setMoveItem}
          ></MoveItemModal>
        )}
      </motion.div>,

      portalElement
    )
  );
};

export default CardMenu;
