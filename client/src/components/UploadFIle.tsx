import React, { useState } from "react";
import { useUploadFiles } from "../api/FileApi";
import { useParams } from "react-router-dom";
import { UseToastContext } from "../context/ToastContext";

type ModalProps = {
  uploadModal: boolean;
  setUploadModal: (state: boolean) => void;
};

const UploadFile: React.FC<ModalProps> = ({ uploadModal, setUploadModal }) => {
  const { folderId } = useParams();

  const [file, setFile] = useState<FileList | null>(null);

  const { mutate, pendingUpload, successUpload, errorUpload, uploadReset } =
    useUploadFiles();

  const handleUpload = (files: FileList | null) => {
    setFile(files);
    uploadReset();
  };

  const { setToast } = UseToastContext();

  const handleFormSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setToast({ type: "SUCCESS", message: "File uploaded successfuly" });
    const formData = new FormData();
    if (file) {
      Array.from(file).forEach((f) => {
        formData.append("file", f);
      });
    }
    formData.append("folderId", folderId as string);
    mutate(formData);
    setFile(null);
  };

  return (
    uploadModal && (
      <div className="bg-gray-500/50 flex justify-center items-center top-0 right-0 bottom-0 left-0 fixed">
        <div className="  bg-white p-2  rounded-2xl w-2/6 ">
          <form encType="multipart/form-data" onSubmit={handleFormSubmission}>
            <div className="p-2 flex flex-col mx-2">
              <h2 className="text-2xl font-bold text-purple-500">
                Upload File
              </h2>
              <p className="text-gray-500">Select a file to upload </p>
            </div>
            <div className="flex items-center justify-center mx-2 ">
              <label className="flex flex-col items-center justify-center w-full  h-[12rem] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-purple-200/50">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                </div>
                <input
                  accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                  onChange={(e) => handleUpload(e.target.files)}
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  multiple
                />
              </label>
            </div>

            <div className="m-2  flex flex-col">
              {file &&
                Array.from(file).map((f, index) => (
                  <div
                    key={index}
                    className="border-2 rounded-lg p-2 my-5 text-sm flex items-center font-semibold justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <svg
                        className="size-7 fill-gray-500"
                        version="1.0"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 64 64"
                        xmlSpace="preserve"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <g>
                            <polygon points="45,0.586 45,14 58.414,14 "></polygon>
                            <path d="M44,16c-0.553,0-1-0.447-1-1V0H7C4.789,0,3,1.789,3,4v56c0,2.211,1.789,4,4,4h48c2.211,0,4-1.789,4-4V16H44 z M14,18h16c0.553,0,1,0.447,1,1s-0.447,1-1,1H14c-0.553,0-1-0.447-1-1S13.447,18,14,18z M48,51H14c-0.553,0-1-0.447-1-1 s0.447-1,1-1h34c0.553,0,1,0.447,1,1S48.553,51,48,51z M48,45H14c-0.553,0-1-0.447-1-1s0.447-1,1-1h34c0.553,0,1,0.447,1,1 S48.553,45,48,45z M48,39H14c-0.553,0-1-0.447-1-1s0.447-1,1-1h34c0.553,0,1,0.447,1,1S48.553,39,48,39z M48,33H14 c-0.553,0-1-0.447-1-1s0.447-1,1-1h34c0.553,0,1,0.447,1,1S48.553,33,48,33z M48,27H14c-0.553,0-1-0.447-1-1s0.447-1,1-1h34 c0.553,0,1,0.447,1,1S48.553,27,48,27z"></path>
                          </g>
                        </g>
                      </svg>
                      <div className="flex flex-col">
                        <p>{f.name}</p>
                        <p className="font-normal">
                          {Math.round(f.size / 1024)} kb
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ">
                      <svg
                        onClick={() =>
                          setFile((prev) =>
                            prev ? new DataTransfer().files : null
                          )
                        }
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
                  </div>
                ))}

              <div className="flex gap-5">
                <button
                  onClick={() => setUploadModal(false)}
                  type="button"
                  className="border-2 border-gray-500  text-gray-500 transition-all hover:bg-white hover:text-purple-500 rounded-lg w-full p-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="border-2 border-purple-500 bg-purple-500 text-white transition-all hover:bg-white hover:text-purple-500 rounded-lg w-full p-1"
                >
                  {pendingUpload ? (
                    <div className="flex justify-center items-center">
                      <svg
                        aria-hidden="true"
                        className="size-6 text-gray-200 animate-spin  fill-purple-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>
                  ) : (
                    " Upload"
                  )}
                </button>
              </div>
            </div>

            {errorUpload && (
              <span className="bg-red-100 text-red-400 border-2 border-red-400 rounded-lg p-2 flex mx-5 mb-5 ">
                {errorUpload.message}
              </span>
            )}

            {successUpload && (
              <span className="bg-green-100 text-green-400 border-2 border-green-400 rounded-lg p-2 flex mx-5 mb-5 ">
                File uploaded successfuly
              </span>
            )}
          </form>
        </div>
      </div>
    )
  );
};

export default UploadFile;
