import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { folderData, folderSchema } from "../types";
import { useCreateFolder } from "../api/FolderApi";
import { useParams } from "react-router-dom";
import { UseToastContext } from "../context/ToastContext";

type ModalProps = {
  folderModal: boolean;
  setFolderModal: (state: boolean) => void;
};

const CreateFolder: React.FC<ModalProps> = ({
  folderModal,
  setFolderModal,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<folderData>({
    resolver: zodResolver(folderSchema),
  });
  const { createFolderMutation } = useCreateFolder();
  const { folderId } = useParams();

  const { setToast } = UseToastContext();

  const submit = (data: folderData) => {
    setToast({ type: "SUCCESS", message: `Folder Created successfuly!` });
    createFolderMutation({ data, folderId });
    reset();
    setFolderModal(false);
  };

  return (
    folderModal && (
      <div className="z-50 bg-gray-500/30 fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center ">
        <form
          onSubmit={handleSubmit(submit)}
          className="bg-white rounded-xl  text-gray-500 p-5 shadow-xl"
        >
          <h2 className="text-2xl font-bold text-gray-500">New Folder</h2>
          <label className="flex flex-col my-7  w-[20vw]">
            <input
              {...register("name")}
              placeholder="New Folder"
              className="focus:outline-none bg-slate-200 text-gray-500 rounded-md p-3 text-lg "
            ></input>
            {errors.name?.message && (
              <span className="m-2 text-red-500">{errors.name.message}</span>
            )}
          </label>

          <div className="flex gap-5 justify-end text-base">
            <button
              type="reset"
              onClick={() => setFolderModal(false)}
              className="border-2 border-gray-200  text-gray-500 rounded-lg p-1"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="border-2 border-purple-500    p-1 bg-purple-500 text-white transition-all hover:bg-white hover:text-purple-500  rounded-lg"
            >
              Create Folder
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default CreateFolder;
