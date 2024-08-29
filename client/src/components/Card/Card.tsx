import { fileData, folderData } from "../../types";
import React from "react";
import { fileTypeIcons } from "../IconTypes";
import CardMenu from "./CardMenu";

type CardProps = {
  type: "folder" | "file";
  item: fileData | folderData;
  gridView: boolean | undefined;
  onMenuToggle: (id: number | undefined) => void;
  menuOpen: boolean;
};
const Card: React.FC<CardProps> = ({
  type,
  item,
  gridView,
  onMenuToggle,
  menuOpen,
}) => {
  const Icon =
    type === "file"
      ? fileTypeIcons[(item as fileData).mimeType] || fileTypeIcons["default"]
      : fileTypeIcons["folder"];

  return (
    <>
      <div
        onClick={() => onMenuToggle(item.id)}
        className={`text-gray-500  p-2 hover:cursor-pointer text-sm  hover:bg-slate-200 transition-all ${
          menuOpen ? "bg-purple-200 " : ""
        } ${
          gridView
            ? "flex   flex-1   bg-slate-100 rounded-xl"
            : "grid grid-cols-4 items-center"
        }  border-b-2 border-slate-200   p-1  `}
      >
        <div
          className={`${
            gridView
              ? "flex flex-col-reverse w-full"
              : "flex gap-2 p-1 col-span-2 w-full "
          } items-center   `}
        >
          <div className={`${gridView ? "size-32 p-5" : "size-6"}`}>
            <Icon />
          </div>

          <p className=" text-gray-500  text-ellipsis  font-bold  ">
            {item.name}
          </p>
        </div>

        {!gridView && (
          <p>
            Created at:{" "}
            {new Date(item.createdAt).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}

        {!gridView && <p>Owner {item?.user?.email}</p>}
      </div>

      {type === "file" ? (
        <CardMenu
          type="file"
          menuOpen={menuOpen}
          item={item}
          onMenuToggle={onMenuToggle}
        ></CardMenu>
      ) : (
        <CardMenu
          type="folder"
          menuOpen={menuOpen}
          item={item}
          onMenuToggle={onMenuToggle}
        ></CardMenu>
      )}
    </>
  );
};

export default Card;
