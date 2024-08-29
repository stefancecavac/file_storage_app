import { useFilterContext } from "../context/FIlterContext";

const ShowTypeComponent = () => {
  const { setShowType, showType } = useFilterContext();

  return (
    <div className="flex items-center gap-2 h-fit w-fit overflow-hidden ">
      <label htmlFor="typeFilter" className="text-gray-500">
        Type Filter
      </label>
      <select
        name="typeFilter"
        id="typeFilter"
        className="text-purple-500 font-semibold  rounded-lg border  p-1.5 border-gray-300    focus:outline-none"
        onChange={(e) => setShowType(e.target.value)}
        value={showType}
      >
        <option value={"all"}>All</option>
        <option value={"files"}>Files</option>
        <option value={"folders"}>Folders</option>
      </select>
    </div>
  );
};

export default ShowTypeComponent;
