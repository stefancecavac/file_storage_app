import { useFilterContext } from "../context/FIlterContext";
import { GridIcon, ListIcon } from "./IconTypes";

const GridToggleButton = () => {
  const { gridView, setGridView } = useFilterContext();

  return (
    <label className="flex h-8 w-fit items-center overflow-hidden  text-gray-500 cursor-pointer rounded-lg border border-gray-300">
      <input
        onChange={() => setGridView(!gridView)}
        type="checkbox"
        value=""
        className="sr-only peer"
      />
      <div
        className={`flex w-full gap-2 h-full items-center px-2 transition-all ${
          gridView ? "" : "bg-purple-500 text-white"
        }`}
      >
        <ListIcon></ListIcon>
        List
      </div>

      <div
        className={`flex w-full gap-2 h-full items-center px-2 transition-all ${
          gridView ? "bg-purple-500 text-white" : ""
        }`}
      >
        <GridIcon></GridIcon>
        Grid
      </div>
    </label>
  );
};

export default GridToggleButton;
