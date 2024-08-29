import { useGetSingleFolder } from "../api/FolderApi";
import BreadCrumbComponent from "../components/BreadCrumbComponent";
import FilterComponent from "../components/FilterComponent";
import ItemListComponent from "../components/ItemListComponent";

const FolderContent = () => {
  const { folder, isLoading } = useGetSingleFolder();

  return (
    <>
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <BreadCrumbComponent folder={folder} />
          <p className="text-purple-500 font-bold text-4xl">{folder?.name}</p>
        </div>

        <FilterComponent />
      </div>

      <ItemListComponent
        type={"folder"}
        files={undefined}
        folders={undefined}
        folder={folder}
        filesLoading={undefined}
        foldersLoading={undefined}
        folderLoading={isLoading}
      ></ItemListComponent>
    </>
  );
};

export default FolderContent;
