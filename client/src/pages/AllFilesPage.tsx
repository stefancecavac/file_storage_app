import SearchComponent from "../components/SearchComponent";
import FilterComponent from "../components/FilterComponent";
import { useGetAllSearchFolders } from "../api/FolderApi";
import useFilterHook from "../hooks/useFilterHook";

import { useGetAllSearchFiles } from "../api/FileApi";
import ItemListComponent from "../components/ItemListComponent";

const AllFilesPage = () => {
  const { q } = useFilterHook();
  const { folders, foldersLoading } = useGetAllSearchFolders(q);
  const { files, filesLoading } = useGetAllSearchFiles(q, null);

  return (
    <>
      <div className=" flex justify-center  ">
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl text-center text-purple-500 font-bold ">
            Welcome to FileBoy App!
          </h2>
          <p className="text-gray-500 text-center">
            Your collection of files and folders
          </p>
          <SearchComponent></SearchComponent>
        </div>
      </div>
      <FilterComponent></FilterComponent>
      <ItemListComponent
        type="folders and files"
        files={files}
        folders={folders}
        filesLoading={filesLoading}
        foldersLoading={foldersLoading}
        folder={undefined}
        folderLoading={undefined}
      ></ItemListComponent>
    </>
  );
};

export default AllFilesPage;
