import { useGetAllFiles } from "../api/FileApi";
import { useGetAllFolders } from "../api/FolderApi";
import FilterComponent from "../components/FilterComponent";
import ItemListComponent from "../components/ItemListComponent";
import useFilterHook from "../hooks/useFilterHook";

const MyFiles = () => {
  const { q } = useFilterHook();
  const { files, filesLoading } = useGetAllFiles(q, "");
  const { folders, foldersLoading } = useGetAllFolders();

  return (
    <>
      <div className=" flex justify-between  ">
        <div className="flex flex-col">
          <h2 className="text-2xl text-purple-500 font-bold ">
            My files and Folders
          </h2>
          <p className="text-gray-500">Your collection of files and folders</p>
        </div>
        <FilterComponent></FilterComponent>
      </div>
      <ItemListComponent
        files={files}
        folders={folders}
        filesLoading={filesLoading}
        foldersLoading={foldersLoading}
        type="folders and files"
        folder={undefined}
        folderLoading={undefined}
      />
    </>
  );
};

export default MyFiles;
