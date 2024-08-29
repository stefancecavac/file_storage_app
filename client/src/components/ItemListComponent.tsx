import { useFilterContext } from "../context/FIlterContext";
import { useMenuToggle } from "../hooks/useMenuToggle";
import { fileData, folderData } from "../types";
import Card from "./Card/Card";
import LoaderComponent from "./LoaderComponent";
import NotFoundComponent from "./NotFoundComponent";

interface ItemListComponentProps {
  type: "folder" | "folders and files";
  files: fileData[] | undefined;
  folders: folderData[] | undefined;
  folder: folderData | undefined;
  filesLoading: boolean | undefined;
  foldersLoading: boolean | undefined;
  folderLoading: boolean | undefined;
}

const ItemListComponent: React.FC<ItemListComponentProps> = ({
  files,
  folders,
  type,
  folder,
  filesLoading,
  foldersLoading,
  folderLoading,
}) => {
  const { gridView, showType } = useFilterContext();
  const { menuToggle, handleMenuToggle } = useMenuToggle();

  if (filesLoading || foldersLoading || folderLoading) {
    return <LoaderComponent />;
  }

  if (files?.length === 0 && folders?.length === 0) {
    return <NotFoundComponent />;
  }

  if (type === "folder") {
    if (folder?.file?.length === 0 && folder.subfolders?.length === 0) {
      return <NotFoundComponent></NotFoundComponent>;
    }
  }

  return (
    <>
      {!gridView && (
        <div className="grid grid-cols-4 text-sm text-gray-500 border-b-2 border-gray-200 m-2 mt-10">
          <p className="col-span-2">Name</p>
          <p>Created at</p>
          <p>Owner</p>
        </div>
      )}

      <div
        className={`${
          gridView ? "grid lg:grid-cols-6 gap-5 mt-10" : "flex flex-col"
        } m-2`}
      >
        {type === "folders and files" &&
          (showType === "all" || showType === "folders") &&
          folders?.map((folder: folderData) => (
            <Card
              type="folder"
              onMenuToggle={() => handleMenuToggle(folder.id!)}
              menuOpen={menuToggle === folder.id}
              gridView={gridView}
              key={folder.id}
              item={folder}
            />
          ))}

        {(showType === "all" || showType === "files") &&
          files?.map((file: fileData) => (
            <Card
              type="file"
              onMenuToggle={() => handleMenuToggle(file.id!)}
              menuOpen={menuToggle === file.id}
              gridView={gridView}
              key={file.id}
              item={file}
            />
          ))}

        {type === "folder" &&
          (showType === "all" || showType === "files") &&
          folder?.file?.map((file: fileData) => (
            <Card
              gridView={gridView}
              menuOpen={file.id === menuToggle}
              onMenuToggle={() => handleMenuToggle(file.id)}
              type="file"
              key={file.id}
              item={file}
            />
          ))}
        {(showType === "all" || showType === "folders") &&
          folder?.subfolders?.map((subFolder: folderData) => (
            <Card
              gridView={gridView}
              menuOpen={subFolder.id === menuToggle}
              onMenuToggle={() => handleMenuToggle(subFolder.id)}
              type="folder"
              key={subFolder.id}
              item={subFolder}
            />
          ))}
      </div>
    </>
  );
};

export default ItemListComponent;
